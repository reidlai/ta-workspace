# Quickstart: Module Workflow Commands

## Prerequisites

- Active `moon` environment
- Git authenticated (SSH recommended) for private repos

## Commands

### Add a New Module

Clone a remote repository as a new feature module.

```bash
# Syntax
moon run :add-module -- --repo <url> --name <feature-name>

# Example
moon run :add-module -- --repo https://github.com/reidlai/watchlist-module --name watchlist
```

**What it does:**

1. Git clones into `modules/watchlist`
2. Detects stacks (`go`, `ts`, `svelte`)
3. Updates `modules.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `go.work`
4. Ready to `moon run ...`

### Rename a Module

Rename an existing local module and refactor config.

```bash
# Syntax
moon run :rename-module -- --old <old-name> --new <new-name>

# Example
moon run :rename-module -- --old insights --new portfolio
```

**What it does:**

1. Renames directory `modules/insights` -> `modules/portfolio`
2. Updates all config references
3. Refactors internal package imports within the module

### Delete a Module

Remove a module and clean up.

```bash
# Syntax
moon run :delete-module -- --name <name>

# Example
moon run :delete-module -- --name demo
```

**What it does:**

1. Removes `modules/demo` directory
2. Deletes submodule entry from `.git/config`
3. Scrubs all references from workspace config files
