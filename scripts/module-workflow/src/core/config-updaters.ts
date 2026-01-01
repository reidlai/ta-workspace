
import fs from 'fs-extra';
import path from 'path';
import { parse, stringify } from 'yaml';

export class ConfigUpdater {
    constructor(private workspaceRoot: string) { }

    /**
     * Updates modules.json to include a new module
     */
    async addModuleToRegistry(moduleName: string): Promise<void> {
        const registryPath = path.join(this.workspaceRoot, 'apps/sv-appshell/static/modules.json');
        if (!await fs.pathExists(registryPath)) {
            throw new Error(`Registry file not found at ${registryPath}`);
        }

        const content = await fs.readJson(registryPath);
        // Add new module if not exists
        content.modules = content.modules || {};
        content.modules[moduleName] = {
            id: moduleName,
            src: `/modules/${moduleName}/svelte`
        };

        await fs.writeJson(registryPath, content, { spaces: 2 });
    }

    /**
     * Updates modules.json to remove a module
     */
    async removeModuleFromRegistry(moduleName: string): Promise<void> {
        const registryPath = path.join(this.workspaceRoot, 'apps/sv-appshell/static/modules.json');
        if (!await fs.pathExists(registryPath)) {
            return;
        }

        const content = await fs.readJson(registryPath);
        if (content.modules && content.modules[moduleName]) {
            delete content.modules[moduleName];
            await fs.writeJson(registryPath, content, { spaces: 2 });
        }
    }

    /**
    * Updates modules.json to rename a module
    */
    async renameModuleInRegistry(oldName: string, newName: string): Promise<void> {
        const registryPath = path.join(this.workspaceRoot, 'apps/sv-appshell/static/modules.json');
        if (!await fs.pathExists(registryPath)) return;

        const content = await fs.readJson(registryPath);
        if (!content.modules) return;

        // Remove old
        if (content.modules[oldName]) {
            delete content.modules[oldName];
        }

        // Add new
        content.modules[newName] = {
            id: newName,
            src: `/modules/${newName}/svelte`
        };

        await fs.writeJson(registryPath, content, { spaces: 2 });
    }

    /**
     * Safe YAML update that attempts to preserve comments is hard with standard parsers.
     * We will use a regex-based approach for appending to lists in simple cases, 
     * or fall back to 'yaml' library if structure is complex.
     * 
     * For pnpm-workspace.yaml, we specifically look for 'packages:' list.
     */
    async addPackageToWorkspace(modulePath: string): Promise<void> {
        const workspacePath = path.join(this.workspaceRoot, 'pnpm-workspace.yaml');
        if (!await fs.pathExists(workspacePath)) return;

        let content = await fs.readFile(workspacePath, 'utf8');

        // Check if already exists
        if (content.includes(`'${modulePath}'`) || content.includes(`"${modulePath}"`)) return;

        // Naive append to packages: list
        // This assumes standard formatting as seen in the file
        // packages:
        //   - 'foo/*'
        if (content.includes('packages:')) {
            const lines = content.split('\n');
            const packagesIndex = lines.findIndex(l => l.trim().startsWith('packages:'));

            // Insert after the last item in the list
            // We scan until we find a line that doesn't start with space/dash or EOF
            let insertIndex = packagesIndex + 1;
            while (insertIndex < lines.length && (lines[insertIndex].trim().startsWith('-') || lines[insertIndex].trim() === '')) {
                insertIndex++;
            }

            lines.splice(insertIndex, 0, `  - '${modulePath}'`);
            await fs.writeFile(workspacePath, lines.join('\n'));
        } else {
            // Fallback or init
            content += `\npackages:\n  - '${modulePath}'\n`;
            await fs.writeFile(workspacePath, content);
        }
    }

    async removePackageFromWorkspace(modulePath: string): Promise<void> {
        const workspacePath = path.join(this.workspaceRoot, 'pnpm-workspace.yaml');
        if (!await fs.pathExists(workspacePath)) return;

        const content = await fs.readFile(workspacePath, 'utf8');
        const lines = content.split('\n');
        const newLines = lines.filter(line => !line.includes(`'${modulePath}'`) && !line.includes(`"${modulePath}"`));

        if (lines.length !== newLines.length) {
            await fs.writeFile(workspacePath, newLines.join('\n'));
        }
    }

    /**
     * Updates go.work to include a new local module
     */
    async addProjectToGoWork(modulePath: string): Promise<void> {
        const goWorkPath = path.join(this.workspaceRoot, 'go.work');
        if (!await fs.pathExists(goWorkPath)) return;

        let content = await fs.readFile(goWorkPath, 'utf8');
        // Check if already exists
        if (content.includes(modulePath)) return;

        // We use the `use (...)` block if present, or `use` directives.
        // Simple heuristic: just append `use ./path` if no block, or insert into block.
        // Actually, `go work use -r .` is the canonical way to update, but we want precise control.
        // Let's just use the `go work use` command! It's safer and handles formatting.

        try {
            // We need to run `go work use ./modules/foo/go`
            // But we can't assume 'go' is in path? User environment usually has it.
            // Using execa here might be better than manual parsing.
            // But this class is ConfigUpdater, maybe it should just edit files?
            // "go work use" modifies the file. Let's try to use fs first for portability/speed 
            // without spawning processes if we can, but `go.work` format is flexible.
            // Let's stick to appending `use ./path` for now, Go handles it.

            // Actually, we can just append a line `use ./path`
            // But path needs to be relative to root.
            const relPath = path.relative(this.workspaceRoot, path.join(this.workspaceRoot, modulePath));
            // Ensure posix separators for Go
            const normalizedPath = './' + relPath.split(path.sep).join('/');

            if (!content.includes(normalizedPath)) {
                // Check if file ends with newline
                const prefix = content.endsWith('\n') ? '' : '\n';
                await fs.appendFile(goWorkPath, `${prefix}use ${normalizedPath}\n`);
            }
        } catch (error) {
            console.error('Failed to update go.work:', error);
        }
    }

    async removeProjectFromGoWork(modulePath: string): Promise<void> {
        const goWorkPath = path.join(this.workspaceRoot, 'go.work');
        if (!await fs.pathExists(goWorkPath)) return;

        const relPath = path.relative(this.workspaceRoot, path.join(this.workspaceRoot, modulePath));
        const normalizedPath = './' + relPath.split(path.sep).join('/');

        const content = await fs.readFile(goWorkPath, 'utf8');
        const lines = content.split('\n');
        // Filter out lines that look like `use ./path` or are inside a use block matching the path
        // This is tricky with blocks.
        // Regex replacement might be better.
        // Match `use \s* "?./path"?` or path inside parens.
        // Simple approach: filter lines containing the path if it's unique enough.

        const newLines = lines.filter(line => !line.includes(normalizedPath));
        if (lines.length !== newLines.length) {
            await fs.writeFile(goWorkPath, newLines.join('\n'));
        }
    }
}
