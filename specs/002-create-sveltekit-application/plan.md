# Implementation Plan: Create SvelteKit App Shell

**Branch**: `002-create-sveltekit-application` | **Date**: 2025-12-26 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a SvelteKit application (`apps/sv-appshell`) managed by Moonrepo. The app acts as a lightweight App Shell using a custom Dependency Injection (DI) system to load "Feature Bundles" (routes, state, services) defined via TypeScript interfaces in `packages/shared/typescripts`. Modules are loaded via configuration (JSON) and injected with environment config. The shell supports dynamic runtime routing and hybrid layouts.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20 (Moonrepo toolchain)
**Primary Dependencies**: SvelteKit 2.x, Vite
**Storage**: N/A (Frontend App Shell)
**Testing**: Vitest (Unit), Playwright (E2E) - *Need to confirm specific test runner preference if not standard SvelteKit defaults*
**Target Platform**: Web (Containerized Node.js / Static Adapter - TBD based on "web part" clarification)
**Project Type**: Web Application
**Performance Goals**: Fast LCP (<1.5s), Low TBT. "Minimum dependencies" implies focus on bundle size.
**Constraints**: Custom DI (No reflection/decorators libraries), "Micro-frontend" style vertical slices.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **[FAIL] Authorized Tech Stack (Frontend)**: Constitution mandates **Next.js**. User explicitly requested **SvelteKit**.
  - *ACTION*: Proceeding with SvelteKit as per explicit user instruction. This requires a **Waiver**.
- **[PASS] Workspace Authority**: Will use `moonrepo`.
- **[PASS] Containers**: Will include Dockerfile using distroless base (Rule 3).
- **[PASS] Testing**: Will include BDD Feature file (Rule 8).

## Project Structure

### Documentation (this feature)

```text
specs/002-create-sveltekit-application/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output

docs/
└── appshell-architecture.md # [NEW] Concept documentation
```

### Source Code (repository root)

```text
apps/
└── sv-appshell/              # [NEW] SvelteKit Application
    ├── moon.yml
    ├── package.json
    ├── svelte.config.js
    ├── vite.config.ts
    ├── Dockerfile
    └── src/
        ├── app.d.ts
        ├── app.html
        ├── routes/
        │   └── [...rest]/
        │       └── +page.svelte  # Consumers core router
        ├── lib/
        │   └── components/       # (Optional) Shared shell UI components (Nav, Footer)
        └── services/             # App-level services

packages/
└── shared/
    ├── typescripts/          # [NEW] Shared Interfaces
    │   ├── package.json
    │   └── src/index.ts
    └── core/                 # [NEW] Shared Implementation
        ├── package.json
        └── src/
            ├── di/           # Custom DI Container
            ├── registry/     # Module Registry
            └── router/       # Router Service

packages/
└── features/
    └── demo-feature/         # [NEW] MVP Feature for verification
        ├── package.json
        └── src/
            ├── index.ts      # Exports IFeatureBundle
            └── routes.ts     # IParamsRoute
```

**Structure Decision**: Logic moved to `packages/shared/core`. Features moved to `packages/features/*`. App shell remains thin.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| SvelteKit usage | Explicit User Request | Constitution mandates Next.js, but user explicitly asked for SvelteKit. |
| Custom DI Container | "Minimum dependencies" | Using generic DI libs adds bloat. |
| Shared Packages | User feedback | Enforces modularity; apps depend on packages. |

## Proposed Changes

### Configuration
#### [MODIFY] [.moon/workspace.yml](file:///C:/Users/reidl/GitLocal/appshell-workspace/.moon/workspace.yml)
- Update `projects` to include `apps/sv-appshell`, `packages/shared/*`, and `packages/features/*`.

### Application Layer
#### [NEW] [sv-appshell](file:///C:/Users/reidl/GitLocal/appshell-workspace/apps/sv-appshell/package.json)
- SvelteKit app using `adapter-node`.
- Dependency on `@shared/core`, `@shared/typescripts`, and `@features/demo-feature` (for demo).
- Dynamic route catch-all delegates to `@shared/core/router`.

### Shared Layer
#### [NEW] [packages/shared/typescripts](file:///C:/Users/reidl/GitLocal/appshell-workspace/packages/shared/typescripts/package.json)
- Define interfaces: `IFeatureBundle`, `IContext`, `IAppConfig`, `ModuleInit`.

#### [NEW] [packages/shared/core](file:///C:/Users/reidl/GitLocal/appshell-workspace/packages/shared/core/package.json)
- Implement `DIContainer` (for `IContext`).
- Implement `Registry` (for `IFeatureBundle`).
- Implement `RouterService`.

### Feature Layer
#### [NEW] [packages/features/demo-feature](file:///C:/Users/reidl/GitLocal/appshell-workspace/packages/features/demo-feature/package.json)
- Implementation of `IFeatureBundle` for verification.


## Verification Plan

### Automated Tests
- **Build**: `moon run sv-appshell:build` and `moon run shared-core:build`.
- **Unit**: `moon run shared-core:test` (Verify DI/Registry in isolation).
- **Integration**: `moon run sv-appshell:test`.

### Manual Verification
1.  **Start Dev**: `moon run sv-appshell:dev`.
2.  **Verify Shell**: Open `http://localhost:5173`.
3.  **Verify Router**: Ensure core router handles requests.

