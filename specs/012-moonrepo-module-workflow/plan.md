# Implementation Plan: Moonrepo Module Workflow

**Branch**: `012-moonrepo-module-workflow` | **Date**: 2026-01-01 | **Spec**: [spec.md](file:///c:/Users/reidl/GitLocal/ta-workspace/specs/012-moonrepo-module-workflow/spec.md)
**Input**: Feature specification from `specs/012-moonrepo-module-workflow/spec.md`

## Summary

Implement `moon add-module`, `moon rename-module`, and `moon delete-module` commands as a Node.js/TypeScript CLI tool. These commands automate virtual module management (git submodules, config updates, file generation) across the frontend (SvelteKit) and backend (Go) stacks, enforcing handling of edge cases like private repos and partial stacks.

## Technical Context

**Language/Version**: Node.js v20 (Toolchain pinned)
**Primary Dependencies**: `commander` (CLI), `execa` (Process), `yaml` (Config), `fs-extra` (Files)
**Storage**: N/A (updates git modules and config files)
**Testing**: `vitest` for unit tests of the CLI logic (mocked fs/git)
**Target Platform**: Local Development Environment (Cross-platform)
**Project Type**: CLI Tooling
**Performance Goals**: <5s execution time for config updates (git clone speed depends on network)
**Constraints**: Must operate without storing secrets (git passthrough). Must rollback on failure.
**Scale/Scope**: Manages ~10-50 modules within the monorepo.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Branching**: Feature branch `012-moonrepo-module-workflow` used.
- [x] **Environments**: Local dev tool, no deployment to prod envs.
- [x] **Containers**: N/A (Tool runs on host).
- [x] **Secrets**: No secrets stored/handled (Rule 4).
- [x] **Dependencies**: Standard open source (MIT/Apache) deps.
- [x] **Testing**: Unit tests will be included (Rule 6).
- [x] **Agent Guardrails**: Agent will write tests and implementation.

## Project Structure

### Documentation (this feature)

```text
specs/012-moonrepo-module-workflow/
├── plan.md              # This file
├── research.md          # Technical decisions
├── data-model.md        # Module directory structure definition
├── quickstart.md        # Usage guide
└── tasks.md             # Execution steps
```

### Source Code

```text
modules/
└── tooling/
    └── ts/
        ├── src/
        │   ├── bin/
        │   │   └── module-workflow.ts # CLI entrypoint
        │   ├── commands/
        │   │   ├── add-module.ts
        │   │   ├── rename-module.ts
        │   │   └── delete-module.ts
        │   ├── core/
        │   │   ├── config-updaters.ts # Logic for modifying modules.json, pnpm-workspace, etc.
        │   │   ├── git-ops.ts         # Wrapper for git submodule operations
        │   │   └── rollback.ts        # Undo logic
        │   └── types.ts
        ├── tests/
        │   └── unit/                  # Mocked tests for logic
        ├── package.json
        └── tsconfig.json
```

**Structure Decision**: Create a new `modules/tooling/ts` package to house shared CLI/dev-scripts, keeping the root clean and leveraging the workspace structure.
