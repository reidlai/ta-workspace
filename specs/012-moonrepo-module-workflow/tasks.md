# Tasks: Moonrepo Module Workflow

**Feature**: `012-moonrepo-module-workflow`
**Spec**: [spec.md](file:///c:/Users/reidl/GitLocal/ta-workspace/specs/012-moonrepo-module-workflow/spec.md)

## Status
- [ ] Phase 1: Setup
- [ ] Phase 2: Foundational Logic
- [ ] Phase 3: User Story 1 (Add Module)
- [ ] Phase 4: User Story 2 (Delete Module)
- [ ] Phase 5: User Story 3 (Rename Module)
- [ ] Phase 6: Polish & Documentation

## Phase 1: Setup (Scaffolding)

Goal: Initialize the CLI project structure and install dependencies.

- [ ] T001 Create tooling package structure in `modules/tooling/ts`
- [ ] T002 Initialize `package.json` with dependencies (`commander`, `execa`, `yaml`, `fs-extra`) in `modules/tooling/ts/package.json`
- [ ] T003 Configure `tsconfig.json` for CLI development in `modules/tooling/ts/tsconfig.json`
- [ ] T004 Create CLI entrypoint scaffold at `modules/tooling/ts/src/bin/module-workflow.ts`
- [ ] T005 Register `tooling` package in `pnpm-workspace.yaml` (if not detected) and `moon.yml` tasks

## Phase 2: Foundational Logic (Shared)

Goal: Implement robust config parsing, file manipulation, and git operations used by all commands.

- [ ] T006 Implement `ConfigUpdater` class for safe `modules.json` manipulation in `modules/tooling/ts/src/core/config-updaters.ts`
- [ ] T007 Implement YAML updater logic (`pnpm-workspace`, `moon.yml`) preserving comments in `modules/tooling/ts/src/core/config-updaters.ts`
- [ ] T008 [P] Implement `findStacks` utility to detect go/ts/svelte stacks in `modules/tooling/ts/src/core/utils.ts`
- [ ] T009 Implement `GitOps` class for `git submodule` and `git clone` wrappers including auth passthrough in `modules/tooling/ts/src/core/git-ops.ts`
- [ ] T010 Implement `RollbackStack` class for transaction management in `modules/tooling/ts/src/core/rollback.ts`

## Phase 3: User Story 1 (Add Module)

Goal: Implement `add-module` command with fail-fast validation and stack detection.

- [ ] T011 [P] [US1] Create `AddModuleCommand` class structure and argument parsing in `modules/tooling/ts/src/commands/add-module.ts`
- [ ] T012 [US1] Implement input validation (fail-fast naming check) in `modules/tooling/ts/src/commands/add-module.ts`
- [ ] T013 [US1] Implement git submodule cloning logic with rollback support in `modules/tooling/ts/src/commands/add-module.ts`
- [ ] T014 [US1] Integration: Wire up config updaters (`modules.json`, `pnpm-workspace`, `tsconfig`, `go.work`) in `modules/tooling/ts/src/commands/add-module.ts`
- [ ] T015 [US1] Implement moon.yml auto-detection and update logic (FR-015) in `modules/tooling/ts/src/commands/add-module.ts`
- [ ] T016 [US1] Create manual verification script (or `quickstart` usage example) to verify `add-module` success

## Phase 4: User Story 2 (Delete Module)

Goal: Implement `delete-module` to cleanly remove submodules and config references.

- [ ] T017 [P] [US2] Create `DeleteModuleCommand` scaffold in `modules/tooling/ts/src/commands/delete-module.ts`
- [ ] T018 [US2] Implement submodule de-registration (`.git/config`, `.gitmodules`) in `modules/tooling/ts/src/core/git-ops.ts`
- [ ] T019 [US2] Implement config cleanup logic (reverse of updaters) in `modules/tooling/ts/src/core/config-updaters.ts`
- [ ] T020 [US2] Assemble `delete-module` logic with confirmation prompt in `modules/tooling/ts/src/commands/delete-module.ts`

## Phase 5: User Story 3 (Rename Module)

Goal: Implement `rename-module` with module-scoped refactoring.

- [ ] T021 [P] [US3] Create `RenameModuleCommand` scaffold in `modules/tooling/ts/src/commands/rename-module.ts`
- [ ] T022 [US3] Implement directory moving and git staging logic in `modules/tooling/ts/src/commands/rename-module.ts`
- [ ] T023 [US3] Implement internal module refactoring (imports update within module) in `modules/tooling/ts/src/core/refactor.ts`
- [ ] T024 [US3] Integration: Update all workspace config files (ids, paths) for renamed module in `modules/tooling/ts/src/commands/rename-module.ts`

## Phase 6: Polish & Documentation

Goal: Finalize CLI experience and required documentation.

- [ ] T025 Implement global error handling and colorized output in `modules/tooling/ts/src/bin/module-workflow.ts`
- [ ] T026 Update `README.md` with command usage docs (FR-016)
- [ ] T027 Update `docs/APPSHELL-ARCHITECTURE.md` with new workflow details (FR-016)

## Dependencies

- Phase 2 blocks Phase 3, 4, 5
- Phase 3, 4, 5 are relatively independent but share ConfigUpdater logic (Phase 2)
