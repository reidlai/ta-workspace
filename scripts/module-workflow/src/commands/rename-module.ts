
import { Command } from 'commander';
import path from 'path';
import fs from 'fs-extra';
import { GitOps } from '../core/git-ops.js';
import { ConfigUpdater } from '../core/config-updaters.js';
import { findStacks } from '../core/utils.js';
import { RollbackStack } from '../core/rollback.js';

export function registerRenameModuleCommand(program: Command, workspaceRoot: string) {
    program
        .command('rename-module')
        .description('Rename a module and refactor internal references')
        .requiredOption('--old <name>', 'Current module name')
        .requiredOption('--new <name>', 'New module name')
        .action(async (options) => {
            // Handle options property appropriately
            const { old: oldName, new: newName } = options;
            const oldDir = `modules/${oldName}`;
            const newDir = `modules/${newName}`;
            const absOldDir = path.join(workspaceRoot, oldDir);
            const absNewDir = path.join(workspaceRoot, newDir);

            const gitOps = new GitOps(workspaceRoot);
            const configUpdater = new ConfigUpdater(workspaceRoot);
            const rollback = new RollbackStack();

            console.log(`Renaming module '${oldName}' to '${newName}'...`);

            if (!await fs.pathExists(absOldDir)) {
                console.error(`Module '${oldName}' does not exist.`);
                process.exit(1);
            }
            if (await fs.pathExists(absNewDir)) {
                console.error(`Module '${newName}' already exists.`);
                process.exit(1);
            }

            try {
                // 1. Git Move
                console.log('Moving submodule...');
                await gitOps.moveDirectory(oldDir, newDir);
                rollback.add(async () => {
                    console.log('Rolling back move...');
                    await gitOps.moveDirectory(newDir, oldDir)
                });

                // 2. Config Updates
                const stacks = await findStacks(absNewDir); // Check stacks in new location

                // modules.json
                if (stacks.hasSvelte) {
                    console.log('Updating modules.json...');
                    await configUpdater.renameModuleInRegistry(oldName, newName);
                    rollback.add(async () => await configUpdater.renameModuleInRegistry(newName, oldName));
                }

                // pnpm-workspace.yaml
                if (stacks.hasTs) {
                    console.log('Updating pnpm-workspace.yaml (ts)...');
                    await configUpdater.removePackageFromWorkspace(`modules/${oldName}/ts`);
                    await configUpdater.addPackageToWorkspace(`modules/${newName}/ts`);
                    rollback.add(async () => {
                        await configUpdater.removePackageFromWorkspace(`modules/${newName}/ts`);
                        await configUpdater.addPackageToWorkspace(`modules/${oldName}/ts`);
                    });
                }
                if (stacks.hasSvelte) {
                    console.log('Updating pnpm-workspace.yaml (svelte)...');
                    await configUpdater.removePackageFromWorkspace(`modules/${oldName}/svelte`);
                    await configUpdater.addPackageToWorkspace(`modules/${newName}/svelte`);
                    rollback.add(async () => {
                        await configUpdater.removePackageFromWorkspace(`modules/${newName}/svelte`);
                        await configUpdater.addPackageToWorkspace(`modules/${oldName}/svelte`);
                    });
                }
                if (stacks.hasGo) {
                    console.log('Updating go.work...');
                    await configUpdater.removeProjectFromGoWork(`modules/${oldName}/go`);
                    await configUpdater.addProjectToGoWork(`modules/${newName}/go`);
                    rollback.add(async () => {
                        await configUpdater.removeProjectFromGoWork(`modules/${newName}/go`);
                        await configUpdater.addProjectToGoWork(`modules/${oldName}/go`);
                    });
                }

                // 3. Internal Refactoring
                console.log('Refactoring internal files...');
                await refactorModule(absNewDir, oldName, newName);
                // Rollback for refactoring is hard, skipping for now.

                console.log(`Module renamed successfully from '${oldName}' to '${newName}'.`);

            } catch (error) {
                console.error('Failed to rename module:', error);
                console.log('Initiating rollback...');
                await rollback.execute();
                process.exit(1);
            }
        });
}

async function refactorModule(dir: string, oldName: string, newName: string) {
    const files = await fs.readdir(dir);
    for (const file of files) {
        if (file === '.git' || file === 'node_modules' || file === 'dist' || file === 'coverage') continue;
        const fullPath = path.join(dir, file);
        const stat = await fs.stat(fullPath);

        if (stat.isDirectory()) {
            await refactorModule(fullPath, oldName, newName);
        } else {
            try {
                // Skip binary files by extension heuristic or try catch
                const ext = path.extname(file).toLowerCase();
                if (['.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf', '.exe', '.bin'].includes(ext)) continue;

                const content = await fs.readFile(fullPath, 'utf8');

                // Naive replace
                if (content.includes(oldName)) {
                    const newContent = content.replaceAll(oldName, newName);
                    await fs.writeFile(fullPath, newContent);
                }
            } catch (e) {
                // ignore
            }
        }
    }
}
