# Implementation Plan: Module Architecture Refactor

**Branch**: `004-refactor-featurebundle-modulebundle` | **Date**: 2025-12-29 | **Spec**: [specs/004-refactor-featurebundle-modulebundle/spec.md](./spec.md)
**Input**: Feature specification from `specs/004-refactor-featurebundle-modulebundle/spec.md`

## Summary

Refactor the module system to replace `IFeatureBundle` with `IModuleBundle`. The new architecture allows modules to export an optional list of `widgets` (for dynamic embedding) and/or an optional list of `handlers` (for command-style or navigation interactions). This supports the transition to a more dynamic, flexible App Shell.

## Technical Context

**Language/Version**: TypeScript 5.0+ (as per existing `modules/core/ts`)
**Primary Dependencies**: SvelteKit (Frontend), Moonrepo (Build System)
**Storage**: N/A (Client-side architecture change)
**Testing**: Vitest (Unit)
**Target Platform**: Web (Modern Browsers)
**Project Type**: Monorepo with SvelteKit Apps and TS Modules
**Performance Goals**: Zero runtime overhead for module loading (static import or optimized dynamic import)
**Constraints**: Must maintain backward compatibility or strictly refactor all consumers in `apps/sv-appshell`.
**Scale/Scope**: Affects core type definitions and all feature modules (currently `demo/svelte`).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **1. Branching**: Working on issue branch `004-refactor-featurebundle-modulebundle`.
- [x] **2. Environments**: configuration logic remains unchanged (12-Factor).
- [x] **5. Dependencies**: No new external dependencies introduced.
- [x] **6. Testing**: Verification plan includes updating unit tests for the new interface.
- [x] **8. AI Agent**: Agent operating on local branch only.
- [x] **10. Engineering Principles**: Adheres to SOLID (Interface Segregation - decoupling module def from specific features).
- [x] **Architecture**: Uses Moonrepo and SvelteKit/TS as authorized.

## Project Structure

### Documentation (this feature)

```text
specs/004-refactor-featurebundle-modulebundle/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
modules/core/ts/types/
└── src/
    └── index.ts         # [MODIFY] Update interfaces

modules/demo/svelte/
└── src/
    └── index.ts         # [MODIFY] Adapt to IModuleBundle
```

**Structure Decision**: Modifying existing core types and demo module in-place. No new source directories required.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | | |
