# Implementation Plan: ShadCN UI Dashboard Integration

**Branch**: `003-shadcn-ui-integration` | **Date**: 2025-12-27 | **Spec**: [spec.md](file:///c:/Users/reidl/GitLocal/appshell-workspace/specs/003-shadcn-ui-integration/spec.md)
**Input**: Feature specification from `/specs/003-shadcn-ui-integration/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This feature integrates ShadCN UI as the core UI framework for the SvelteKit application (`apps/sv-appshell`), introducing a dashboard-based architecture where gadgets from feature modules (`packages/ts/svelte/features/*`) are composed using Atomic Design principles. The dashboard serves as the main entry point, displaying module-provided organisms built from ShadCN UI primitives (Card, Button, MenuItem, etc.). Modules can export gadgets, routes, services, and handlers, with centralized theme configuration and shared state management via SvelteKit stores.

## Technical Context

**Language/Version**: TypeScript 5.x with SvelteKit 2.x  
**Primary Dependencies**: ShadCN UI for Svelte, SvelteKit, existing `@ts/registry` module system  
**Storage**: Configuration-based (modules.json), no persistent storage required  
**Testing**: Cucumber (BDD) for integration/acceptance testing, Vitest for unit tests  
**Target Platform**: Web browser (SvelteKit SSR + client-side hydration)  
**Project Type**: Monorepo web application (SvelteKit shell + feature modules)  
**Performance Goals**: Dashboard loads in <1s, state updates reflect in <100ms, support 10+ modules  
**Constraints**: Must work with existing module loading system, centralized theming, graceful module failure handling  
**Scale/Scope**: 1 dashboard page, N gadgets (1 per enabled module), gadget click handlers, state integration layer

## Constitution Check

> [!NOTE]
> **CONSTITUTIONAL CONFLICT RESOLVED**

### Framework Choice Resolution

| Constitution Requirement | Current Feature | Status |
|--------------------------|----------------|--------|
| **Frontend Layer**: Next.js is the mandated framework | Feature targets **SvelteKit** (`apps/sv-appshell`) for modular application shell | ✅ **COMPLIANT** |

**Resolution**: Constitution updated (2025-12-27) to add SvelteKit exception for modular application shells that implement plugin/module architecture.

**Amendment**: See `.specify/memory/amendments/2025-12-27-sveltekit-exception.md`

**Rationale**: SvelteKit is authorized for `apps/sv-appshell` as it serves as a host for dynamically loaded feature modules. New standalone web applications must still use Next.js unless approved via waiver.

---

### Other Constitution Requirements

| Requirement | Compliance | Notes |
|-------------|------------|-------|
| Moonrepo build system | ✅ Yes | Using `moon.yml` configurations |
| BDD Testing (Cucumber) | ✅ Yes | Will create Gherkin feature files |
| Docker with distroless images | ✅ Yes | Sv-appshell already containerized |
| Branch naming (`###-feature-name`) | ✅ Yes | Using `003-shadcn-ui-integration` |
| No secrets in repo | ✅ Yes | N/A for this feature |
| SCA/SAST gates | ✅ Yes | CI pipelines apply |

**Gate Status**: ✅ **PASSED** - All constitution requirements met

## Project Structure

### Documentation (this feature)

```text
specs/003-shadcn-ui-integration/
├── plan.md              # This file
├── research.md          # Phase 0: ShadCN UI for Svelte integration patterns
├── data-model.md        # Phase 1: Gadget, Module, Theme entities
├── quickstart.md        # Phase 1: Developer guide for creating gadgets
├── contracts/           # Phase 1: Module export contracts (TypeScript interfaces)
└── tasks.md             # Phase 2: Task breakdown (via /speckit.tasks)
```

### Source Code (repository root)

```text
apps/sv-appshell/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.svelte          # Main dashboard container
│   │   │   │   ├── GadgetGrid.svelte         # Layout manager for gadgets
│   │   │   │   └── GadgetErrorBoundary.svelte # Error handling wrapper
│   │   │   └── ui/                            # ShadCN UI components
│   │   │       ├── card.svelte
│   │   │       ├── button.svelte
│   │   │       └── [other primitives]
│   │   ├── stores/
│   │   │   ├── theme.ts                       # Centralized theme store
│   │   │   └── moduleState.ts                 # Shared module state
│   │   └── config/
│   │       └── shadcn.config.ts               # ShadCN UI theme configuration
│   ├── routes/
│   │   ├── +layout.svelte                     # Already exists (module loading)
│   │   ├── +layout.ts                         # Already exists (registry init)
│   │   ├── +page.svelte                       # UPDATE: Dashboard instead of placeholder
│   │   └── [...rest]/+page.svelte             # Already exists (module routing)
│   └── static/
│       └── modules.json                        # Already exists (module config)

packages/ts/
├── types/
│   └── src/
│       ├── gadget.ts                           # NEW: IGadget interface
│       ├── theme.ts                            # NEW: IThemeConfig interface
│       └── [existing types]
├── registry/
│   └── src/
│       ├── GadgetRegistry.ts                   # NEW: Gadget registration
│       └── [existing registry code]
└── svelte/features/
    └── demo/
        └── src/
            ├── DemoPage.svelte                 # Already exists
            ├── DemoGadget.svelte               # NEW: Dashboard gadget
            └── index.ts                        # UPDATE: Export gadget

features/
└── shadcn-dashboard/                           # NEW: BDD feature files
    ├── dashboard-load.feature
    ├── gadget-navigation.feature
    ├── module-state.feature
    └── module-failure.feature

tests/integration/
└── shadcn-dashboard/                           # NEW: Integration tests
    └── dashboard.spec.ts
```

**Structure Decision**: This is a **monorepo web application** with the SvelteKit shell in `apps/sv-appshell` and feature modules in `packages/ts/svelte/features/*`. The structure extends the existing architecture with dashboard components, ShadCN UI primitives, and gadget support.

## Complexity Tracking

> No violations requiring justification. All constitution requirements are met.

## Next Steps

1. ✅ **Constitution compliance verified**
2. Execute Phase 0 research (generate research.md)
3. Execute Phase 1 design (data-model.md, contracts/, quickstart.md)
4. Run `/speckit.tasks` to generate task breakdown
