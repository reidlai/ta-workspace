---
description: "Task list for Dashboard Strategy Widget update and Architectural Refactoring"
---

# Tasks: Update Dashboard Portfolio Widget

**Input**: Design documents from `/specs/008-update-dashboard-strategy-widget/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md
**Organization**: Tasks are grouped by phase, prioritizing architectural refactoring (Foundational) before feature implementation.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare project structure for new patterns.

- [x] T001 Create `pages` directory in `modules/portfolio/svelte/src/`
- [x] T002 Create `pages` directory in `modules/demo/svelte/src/`
- [x] T003 Create `design` and `pkg` directories in `modules/portfolio/go/`
- [x] T004 Create `design` and `pkg` directories in `modules/watchlist/go/`

---

## Phase 2: Foundational (Architectural Refactoring)

**Purpose**: Execute mandatory architectural restructuring for `demo`, `watchlist`, and `portfolio` modules.

**⚠️ CRITICAL**: Must complete before feature work to ensure clean dependencies.

### Refactor Demo Module (Frontend)

- [x] T005 [P] Move `apps/sv-appshell/src/routes/demo/+page.svelte` logic or `modules/demo/svelte/src/DemoPage.svelte` (if exists) into `modules/demo/svelte/src/pages/DemoPage.svelte`
- [x] T006 [P] Update `modules/demo/svelte/src/index.ts` to export/register the new page location

### Refactor Watchlist Module (Backend & Frontend)

- [x] T007 [P] Move `apps/ta-server/design/watchlist.go` and `exchange.go` to `modules/watchlist/go/design/`
- [x] T008 [P] Move `modules/watchlist/go/*_service.go` to `modules/watchlist/go/pkg/`
- [x] T009 [P] Verify/Update `modules/watchlist/ts/src/services/WatchlistService.ts` to use RxJS `BehaviorSubject` pattern

### Refactor Portfolio Module (Backend Base & Rename)

- [x] T000 [P] Rename `modules/portfolio-ts` directory to `modules/portfolio` (Skipped: Handled via rename of insights to portfolio)
- [x] T010 [P] Move `apps/ta-server/design/portfolio.go` to `modules/portfolio/go/design/portfolio.go`
- [x] T011 [P] Move `modules/portfolio/go/portfolio_service.go` to `modules/portfolio/go/pkg/portfolio_service.go`

### Server Integration (Goa & Main)

- [x] T012 Run `goa gen` for `modules/portfolio/go/design` and `modules/watchlist/go/design`
- [x] T013 Update `apps/ta-server/cmd/api-server.go` imports to point to new `pkg` locations
- [x] T014 Update `apps/ta-server/internal/server/http.go` imports if necessary

**Checkpoint**: Build `ta-server` and `sv-appshell` to ensure no broken imports.

---

## Phase 3: User Story 1 - View Portfolio Valuation (Priority: P1) 🎯 MVP

**Goal**: Display ShadCN card with mock valuation data on dashboard.

**Independent Test**: Dashboard loads, 2nd gadget shows "$1,250.00" in ShadCN card style.

### Implementation for User Story 1

- [x] T015 [US1] Create mock valuation data structure in `modules/portfolio/svelte/src/widgets/PortfolioSummaryWidget.svelte`
- [x] T016 [US1] Refactor `PortfolioSummaryWidget.svelte` to use ShadCN `Card` components (Card.Root, Card.Header, etc.)
- [x] T017 [US1] Apply Tailwind container queries (`@container`) for responsiveness
- [x] T018 [US1] Verify widget integration in `apps/sv-appshell/src/routes/+page.svelte` (Dashboard)

**Checkpoint**: Widget visible and styled correctly on dashboard.

---

## Phase 4: User Story 2 - Navigate to Portfolio Details (Priority: P1)

**Goal**: Clicking the widget navigates to the Portfolio page.

**Independent Test**: Click widget -> URL changes to `/portfolio` -> Placeholder page shown.

### Implementation for User Story 2

- [x] T019 [US2] Create placeholder `PortfolioPage.svelte` in `modules/portfolio/svelte/src/pages/`
- [x] T020 [US2] Register `/portfolio` route in `modules/portfolio/svelte/src/index.ts`
- [x] T021 [US2] Add click handler to `PortfolioSummaryWidget.svelte` to navigate to `/portfolio`

**Checkpoint**: Full flow from Dashboard to Portfolio page works.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup and verification.

- [x] T022 [P] Verify strict compliance with "No Console Errors" (SC-001)
- [x] T023 [P] Verify navigation performance < 200ms (SC-002)
- [x] T024 [P] Remove any legacy files in `apps/ta-server/design/` if satisfied

## Dependencies & Execution Order

1. **Setup (Phase 1)**: Parallel execution.
2. **Foundational (Phase 2)**: BLOCKS everything. Fix the architecture first.
3. **User Stories (Phase 3 & 4)**: Can proceed sequentially. US1 (Widget) -> US2 (Navigation).

## Parallel Opportunities

- T005, T007, T010 (Refactoring moves) can be done in parallel (careful with git conflicts).
- T015 (Widget UI) can theoretically start while T007-T014 (Backend refactor) is happening, provided the frontend build isn't broken.
