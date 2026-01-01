
import { Command } from 'commander';
import path from 'path';
import fs from 'fs-extra';
import { GitOps } from '../core/git-ops.js';
import { ConfigUpdater } from '../core/config-updaters.js';
// import { findStacks } from '../core/utils.js'; // Not needed for delete, we clean up blinded

export function registerDeleteModuleCommand(program: Command, workspaceRoot: string) {
    program
        .command('delete-module')
        .description('Delete a module and clean up references')
        .requiredOption('--name <name>', 'Feature name (e.g., "watchlist")')
        .option('--force', 'Force deletion without confirmation', false)
        .action(async (options) => {
            const { name, force } = options;
            // const targetDir = `modules/${name}`; // Unused

            const gitOps = new GitOps(workspaceRoot);
            const configUpdater = new ConfigUpdater(workspaceRoot);

            console.log(`Deleting module '${name}'...`);

            if (!force) {
                // TODO: Interactive prompt? Commander doesn't built-in prompt. 
                // For MVP assuming force or careful usage. 
                // We can add 'inquirer' later if needed.
                console.log('Use --force to confirm deletion.');
                return;
            }

            try {
                // 1. Config Cleanup
                console.log('Cleaning up configs...');
                await configUpdater.removeModuleFromRegistry(name);
                await configUpdater.removePackageFromWorkspace(`modules/${name}/ts`);
                await configUpdater.removePackageFromWorkspace(`modules/${name}/svelte`);
                await configUpdater.removeProjectFromGoWork(`modules/${name}/go`);

                // 2. Remove Submodule
                console.log('Removing submodule...');
                await gitOps.removeSubmodule(name);

                console.log(`Module '${name}' deleted successfully.`);

            } catch (error) {
                console.error('Failed to delete module:', error);
                process.exit(1);
            }
        });
}
