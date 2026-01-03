# Moonrepo Module Workflow Tooling

This CLI tool automates the lifecycle of feature modules in the Moonrepo workspace, ensuring consistent configuration across Node.js (Svelte/TS) and Go stacks.

## Commands

### `add-module`

Adds a new feature module from a git repository.

```bash
moon run :add-module -- --repo <git-url> --name <feature-name>
```

- Clones the repository as a git submodule.
- Updates `modules.json` (for SvelteKit registry).
- Updates `pnpm-workspace.yaml`.
- Updates `go.work` (if Go stack detected).
- Handles rollback on failure.

### `delete-module`

Deletes an existing module and cleans up configurations.

```bash
moon run :delete-module -- --name <feature-name> [--force]
```

- Removes git submodule.
- Cleans up `modules.json`, `pnpm-workspace.yaml`, and `go.work`.

### `rename-module`

Renames a module and refactors internal references.

```bash
moon run :rename-module -- --old <old-name> --new <new-name>
```

- Moves git submodule directory.
- Updates all configuration files.
- Refactors internal imports and content (simple string replacement of module name).

## Development

Run `pnpm build` to compile the TypeScript code.
The CLI entrypoint is `src/bin/module-workflow.ts`.
