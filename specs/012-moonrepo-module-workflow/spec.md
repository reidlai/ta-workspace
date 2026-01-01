# Feature Specification: Moonrepo Module Workflow Commands

**Feature Branch**: `012-moonrepo-module-workflow`  
**Created**: 2026-01-01  
**Status**: Draft  
**Input**: User description: "moonrepo module workflow commands - add-module, rename-module, delete-module for managing virtual modules with git submodule integration"

## Clarifications

### Session 2026-01-01

- Q: When running `moon add-module --name <feature>`, how should the command handle naming conflicts? → A: Fail-fast - Error immediately if `modules/<name>` dir exists, before any git operations
- Q: When `add-module` successfully clones the git submodule but then encounters a failure in secondary tasks (like `pnpm install` or `go mod tidy`), what should happen? → A: Full rollback - Undo all changes including submodule removal, revert config files
- Q: When renaming a module, how extensively should the command refactor code imports across the monorepo? → A: Module-scoped - Only update imports within the renamed module itself (internal package references)
- Q: Should `add-module` automatically add entries to `pnpm-workspace.yaml` for detected TypeScript/Svelte stacks? → A: Auto-update - Automatically add `modules/<name>/ts` and `modules/<name>/svelte` entries if directories exist
- Q: Should the module workflow commands (add/rename/delete) automatically detect and update `moon.yml` files in module stacks? → A: Auto-detect and update - Scan for `moon.yml` files and update project names/paths

### Session 2026-01-01 (Part 2)

- Q: How should `add-module` handle authentication for private GitHub repositories? → A: Git Passthrough - Rely on the user's existing git environment (SSH/HTTPS) handling the auth challenge interactively
- Q: How should `add-module` behave if the cloned module doesn't contain all expected stack directories (e.g., has `go/` but missing `ts/` or `svelte/`)? → A: Silent skip - Process present stacks normally, ignore missing ones without error
- Q: How strictly should the system validate the `go.mod` path? → A: Flexible - Use whatever module path is defined in `go.mod`, just ensuring it's valid

## User Scenarios & Testing

### User Story 1 - Add Remote Module (Priority: P1)

A developer wants to integrate an existing GitHub repository as a new feature module in the monorepo. They run a single command that clones the repository as a git submodule and automatically configures all necessary workspace files.

**Why this priority**: This is the most common operation—bringing new functionality into the workspace. Without this, developers must manually configure 6+ files, which is error-prone and time-consuming.

**Independent Test**: Can be tested by running `moon add-module <github-url> --name <feature>` and verifying the module is accessible via `import.meta.glob` in the frontend and `go mod tidy` in the backend.

**Acceptance Scenarios**:

1. **Given** a valid GitHub repository URL and feature name, **When** `moon add-module https://github.com/org/repo --name watchlist2`, **Then** the system creates `modules/watchlist2/` with the submodule, updates `modules.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, and `go.work` (if Go module exists).

2. **Given** a feature name that already exists, **When** `moon add-module <url> --name watchlist`, **Then** the command fails with a clear error message indicating the naming conflict.

3. **Given** an invalid GitHub URL, **When** `moon add-module <invalid-url> --name test`, **Then** the command fails with an appropriate error before making any changes.

4. **Given** a successful submodule addition but a failure in secondary tasks (e.g., `pnpm install`), **When** the operation partially fails, **Then** the system rolls back the submodule addition and reports the failure clearly.

---

### User Story 2 - Delete Local Module (Priority: P2)

A developer wants to remove a feature module that is no longer needed. They run a command that removes the git submodule and cleans up all references across workspace configuration files.

**Why this priority**: Cleanup is essential for maintaining a healthy monorepo. Leaving orphaned references causes build failures and confusion.

**Independent Test**: Can be tested by running `moon delete-module watchlist2` and verifying the `modules/watchlist2/` directory is removed and all configuration files no longer reference it.

**Acceptance Scenarios**:

1. **Given** an existing module `modules/demo`, **When** `moon delete-module demo`, **Then** the system:
   - Removes the git submodule entry from `.gitmodules` and `.git/config`
   - Deletes the `modules/demo/` directory
   - Removes entries from `modules.json`
   - Removes entries from `pnpm-workspace.yaml`
   - Removes path aliases from `tsconfig.base.json`
   - Removes `replace` and `require` directives from `go.mod`/`go.work` (if applicable)

2. **Given** a module name that doesn't exist, **When** `moon delete-module nonexistent`, **Then** the command fails with a clear error message.

3. **Given** a module with active imports in other modules, **When** `moon delete-module watchlist`, **Then** the command warns the user about potential breaking changes and requires confirmation (or `--force` flag).

---

### User Story 3 - Rename Local Module (Priority: P3)

A developer wants to rename an existing module (e.g., from `insights` to `portfolio`) while preserving git history. The command renames the directory and updates all workspace configuration files and code imports.

**Why this priority**: Renaming is less frequent but critical when it happens. Manual renaming is extremely error-prone due to the number of files involved.

**Independent Test**: Can be tested by running `moon rename-module insights portfolio` and verifying the module works under its new name with `moon run portfolio:build`.

**Acceptance Scenarios**:

1. **Given** an existing module `modules/insights`, **When** `moon rename-module insights portfolio`, **Then** the system:
   - Renames `modules/insights/` to `modules/portfolio/`
   - Updates `modules.json` (id and src properties)
   - Updates `pnpm-workspace.yaml` paths
   - Updates `tsconfig.base.json` aliases (e.g., `@modules/insights-ts` → `@modules/portfolio-ts`)
   - Updates `go.mod` module paths and `go.work` replace directives
   - Updates code imports within the module itself (e.g., package names in Go files)

2. **Given** a target name that already exists, **When** `moon rename-module insights watchlist`, **Then** the command fails with a conflict error.

3. **Given** references to the old module name in other modules, **When** `moon rename-module insights portfolio`, **Then** the command updates imports in files within `modules/` that reference the renamed module.

---

### Edge Cases

- What happens when the GitHub repository is private and requires authentication?
- How does the system handle modules with only some stacks (e.g., Go only, no TypeScript)?
- What happens when a module's `go.mod` path doesn't follow the expected naming convention?
- How are moon.yml files handled during add/rename/delete operations?
- What happens if `pnpm install` or `go mod tidy` fails after the structural changes are made?

## Requirements

### Functional Requirements

- **FR-001**: System MUST execute `add-module` as a moonrepo task that accepts a GitHub URL and feature name (support standard git URLs including SSH for private repos)
- **FR-002**: System MUST clone remote repositories as git submodules into `modules/<feature>/` (use interactive git passthrough for authentication challenges)
- **FR-003**: System MUST automatically detect which stacks (go/, ts/, svelte/) exist in the added module (silently skip missing stacks without error to support backend-only or frontend-only modules)
- **FR-004**: System MUST update `apps/sv-appshell/static/modules.json` to register new frontend modules
- **FR-005**: System MUST update `pnpm-workspace.yaml` to include new TypeScript/Svelte packages (automatically detect and add entries for `modules/<name>/ts` and `modules/<name>/svelte` if directories exist)
- **FR-006**: System MUST update `tsconfig.base.json` to add path aliases for new TypeScript modules
- **FR-007**: System MUST update `go.work` and `apps/ta-server/go.mod` for new Go modules (read module path directly from new module's `go.mod` without enforcing strict naming conventions)
- **FR-008**: System MUST validate inputs before making any file changes (fail-fast pattern: check module name doesn't conflict with existing `modules/*` directories)
- **FR-009**: System MUST roll back partial changes if any step fails after initial validation (full rollback: remove submodule, revert all config file changes)
- **FR-010**: System MUST support `rename-module` command to rename existing modules with full refactoring
- **FR-011**: System MUST preserve git submodule information during rename operations
- **FR-012**: System MUST update code imports in related files when renaming modules (module-scoped: update internal package references within the module's own Go/TypeScript/Svelte files)
- **FR-013**: System MUST support `delete-module` command to remove modules and clean up references
- **FR-014**: System MUST remove git submodule entries (`.gitmodules`, `.git/config`) during deletion
- **FR-015**: System MUST automatically detect and update `moon.yml` files when adding or renaming modules (update project names and paths in detected stack directories)
- **FR-016**: Developer MUST update `README.md` and `docs/APPSHELL-ARCHITECTURE.md` to document the usage and architectural role of the new moonrepo workflow commands

### Key Entities

- **Module**: A feature package under `modules/<name>/` containing one or more stacks (go/, ts/, svelte/)
- **Stack**: A technology-specific implementation within a module (Go, TypeScript, Svelte)
- **Configuration File**: Workspace files that reference modules (modules.json, pnpm-workspace.yaml, tsconfig.base.json, go.mod, go.work, moon.yml)

## Success Criteria

### Measurable Outcomes

- **SC-001**: Developers can add a new module in under 60 seconds (vs. 10+ minutes manually)
- **SC-002**: Zero configuration files are left in an inconsistent state after any command (all-or-nothing transactions)
- **SC-003**: 100% of integration tests pass after running any module workflow command
- **SC-004**: Rename operations preserve full git history for the renamed module
- **SC-005**: Delete operations leave no orphaned references that cause build failures
