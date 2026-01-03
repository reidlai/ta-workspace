# Implementation Plan: Update Dashboard Portfolio Widget

**Branch**: `008-update-dashboard-portfolio-widget` | **Date**: 2025-12-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-update-dashboard-strategy-widget/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Replace the second dashboard gadget with a ShadCN Card-based `PortfolioSummaryWidget` displaying portfolio valuation (mock data) with click navigation to a new `/portfolio` page. This feature includes significant architectural refactoring: moving Svelte page components to `pages/` subfolders, reorganizing Goa backend design and services into module-specific directories (`modules/{module}/go/design` and `modules/{module}/go/pkg`), and ensuring all TypeScript services use ReactiveX (RxJS) for API state management.

## Technical Context

**Language/Version**: TypeScript (ES2022), Golang 1.22+  
**Primary Dependencies**:

- Frontend: SvelteKit 2.x, RxJS 7.x, Tailwind CSS 4.x, ShadCN UI components
- Backend: Goa 3.x, Chi router, Go standard library
  **Storage**: N/A (mock data for MVP)  
  **Testing**: Vitest (unit), Cucumber (BDD), Playwright (E2E)  
  **Target Platform**: Web (SvelteKit SSR disabled), Docker containers (distroless base)
  **Project Type**: Monorepo web application (Frontend: SvelteKit, Backend: Golang API)  
  **Performance Goals**:
- Navigation to `/portfolio` page < 200ms (SC-002)
- Zero console errors on render (SC-001)
  **Constraints**:
- Must use ShadCN Card component with 100% visual fidelity (SC-003)
- Must maintain Tailwind container query responsiveness
- Must comply with architectural restructuring (SC-004)
  **Scale/Scope**: Single-page widget update + architectural refactoring across 2 modules (`portfolio`, `watchlist`) + 1 demo module

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Rule                                | Status      | Notes                                                                  |
| ----------------------------------- | ----------- | ---------------------------------------------------------------------- |
| **Branching** (§1)                  | ✅ PASS     | Feature branch `008-update-dashboard-portfolio-widget` follows pattern |
| **Containers** (§3)                 | ✅ PASS     | Existing Dockerfile uses distroless; no changes required               |
| **Secrets** (§4)                    | ✅ PASS     | No secrets involved (mock data only)                                   |
| **Testing (BDD)** (§6)              | ⚠️ DEFERRED | BDD scenarios to be added in Phase 2 (tasks)                           |
| **DevSecOps Gates** (§7)            | ✅ PASS     | Standard CI/CD applies; no special gates                               |
| **AI Agent Guardrails** (§8)        | ✅ PASS     | Working on issue branch; will generate BDD in Phase 2                  |
| **Directory Structure** (§9)        | ✅ PASS     | All required directories exist                                         |
| **Monorepo (Moonrepo)** (§Monorepo) | ✅ PASS     | Using Moonrepo; task definitions in `moon.yml`                         |
| **Authorized Stack** (§Monorepo)    | ✅ PASS     | SvelteKit (frontend) + Golang (backend) authorized                     |

**Re-evaluation after Phase 1**: Will confirm BDD feature files are created and CI passes locally.

## Project Structure

### Documentation (this feature)

```text
specs/008-update-dashboard-strategy-widget/
├── spec.md              # Feature specification
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (architectural patterns)
├── data-model.md        # Phase 1 output (Valuation entity)
├── quickstart.md        # Phase 1 output (dev setup)
├── contracts/           # Phase 1 output (API contracts if needed)
├── checklists/          # Specification quality checklist
│   └── requirements.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Monorepo structure (existing + new files)

apps/
├── sv-appshell/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── +page.svelte          # [MODIFY] Update second gadget reference
│   │   │   └── [...rest]/+page.svelte # [EXISTING] Dynamic routing
│   │   └── lib/
│   │       └── components/ui/card/   # [EXISTING] ShadCN Card components
│   └── moon.yml
└── ta-server/
    ├── cmd/
    │   └── api-server.go             # [EXISTING] Server entry point
    ├── design/                       # [DELETE] Move to modules
    ├── gen/                          # [REGENERATE] After design moves
    └── moon.yml

modules/
├── portfolio/
│   ├── svelte/
│   │   └── src/
│   │       ├── pages/                # [NEW] Create pages subfolder
│   │       │   └── PortfolioPage.svelte  # [NEW] Placeholder page for /portfolio route
│   │       ├── widgets/
│   │       │   └── PortfolioSummaryWidget.svelte  # [MODIFY] Replace with ShadCN Card
│   │       └── index.ts              # [MODIFY] Register PortfolioPage as route
│   ├── ts/
│   │   └── src/
│   │       └── services/
│   │           └── PortfolioService.ts  # [MODIFY] Ensure RxJS patterns (already compliant)
│   └── go/
│       ├── design/                   # [NEW] Move Goa design here
│       │   └── portfolio.go           # [MOVE] From apps/ta-server/design
│       └── pkg/                      # [NEW] Move service implementation
│           └── portfolio_service.go   # [MOVE] From modules/portfolio/go/
├── watchlist/
│   ├── svelte/
│   │   └── src/
│   │       ├── widgets/
│   │           └── MyTickersWidget.svelte  # [EXISTING] No changes
│   ├── ts/
│   │   └── src/
│   │       └── services/
│   │           └── WatchlistService.ts  # [VERIFY] RxJS compliance
│   └── go/
│       ├── design/                   # [NEW] Move Goa design here
│       │   ├── watchlist.go          # [MOVE] From apps/ta-server/design
│       │   └── exchange.go           # [MOVE] From apps/ta-server/design
│       └── pkg/                      # [NEW] Move service implementation
│           ├── watchlist_service.go  # [MOVE] From modules/watchlist/go/
│           └── exchange_service.go   # [MOVE] From modules/watchlist/go/
└── demo/
    └── svelte/
        └── src/
            ├── pages/                # [NEW] Create pages subfolder
            │   └── DemoPage.svelte   # [MOVE] From src/
            └── widgets/
                └── DemoWidget.svelte # [EXISTING] No changes

features/                             # [NEW] BDD scenarios (Phase 2)
└── dashboard-widget.feature          # [NEW] Cucumber scenarios for widget
```

**Structure Decision**: This is a monorepo web application using Moonrepo. The frontend uses SvelteKit with a modular widget/page architecture, and the backend uses Golang with Goa for API design. The architectural refactoring consolidates module-specific code (Goa design, services) into their respective `modules/{module}/go/` directories, improving modularity and separation of concerns.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

_No violations detected. All constitution rules are satisfied._
