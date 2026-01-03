# Tasks: ShadCN UI Dashboard Integration

**Input**: Design documents from `specs/003-shadcn-ui-integration/`
**Prerequisites**: plan.md, spec.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Install and configure ShadCN UI for Svelte in `apps/sv-appshell`
- [x] T002 Setup ShadCN UI theme configuration in `apps/sv-appshell/src/lib/config/shadcn.config.ts`
- [x] T003 [P] Update `tsconfig.json` in `apps/sv-appshell` to support `@/*` alias for `src/`
- [x] T004 Setup Cucumber (BDD) environment in `apps/sv-appshell` (dependencies, feature path config)
- [x] T005 [P] Setup Vitest for unit testing in `apps/sv-appshell` and `packages/ts/*`

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Define `IGadget`, `IGadgetRegistry`, and `IModuleConfig` interfaces in `packages/ts/types/src/gadget.ts`
- [x] T007 Define `IThemeConfig` and `IModuleState` interfaces in `packages/ts/types/src/theme.ts`
- [x] T008 [P] Implement `ThemeStore` using Svelte stores in `apps/sv-appshell/src/lib/stores/theme.ts`
- [x] T009 [P] Implement `ModuleStateStore` with update atomicity (reactive queue) in `apps/sv-appshell/src/lib/stores/moduleState.ts`
- [x] T010 [P] Implement `GadgetErrorBoundary.svelte` with local error recovery logic in `apps/sv-appshell/src/lib/components/dashboard/GadgetErrorBoundary.svelte`
- [x] T011 [P] Create unit tests for `ModuleStateStore` in `apps/sv-appshell/src/lib/stores/moduleState.spec.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Dashboard with Module-Based Gadgets (Priority: P1) 🎯 MVP

**Goal**: Dashboard displaying gadgets from enabled modules with basic navigation

**Independent Test**: Verify that the dashboard loads at `/` with the Demo gadget and clicking it navigates to `/demo`

### BDD Tests for User Story 1 (Mandatory)

- [x] T012 [P] [US1] Create `features/shadcn-dashboard/dashboard-load.feature` with dashboard loading and navigation scenarios
- [x] T013 [US1] Implement Cucumber step definitions for dashboard loading in `tests/integration/shadcn-dashboard/dashboard-load.steps.ts`

### Implementation for User Story 1

- [x] T014 [P] [US1] Implement `GadgetRegistry` class with dependency-ordered initialization in `packages/ts/registry/src/GadgetRegistry.ts`
- [x] T015 [P] [US1] Create `GadgetGrid.svelte` using ShadCN UI layout primitives in `apps/sv-appshell/src/lib/components/dashboard/GadgetGrid.svelte`
- [x] T016 [US1] Implement `Dashboard.svelte` main container in `apps/sv-appshell/src/lib/components/dashboard/Dashboard.svelte`
- [x] T017 [US1] Update `apps/sv-appshell/src/routes/+page.svelte` to render the `Dashboard` component
- [x] T018 [P] [US1] Create `DemoWidget.svelte` organism in `packages/ts/svelte/features/demo/src/DemoWidget.svelte`
- [x] T019 [US1] Update `packages/ts/svelte/features/demo/src/index.ts` to register and export the `DemoWidget`
- [x] T020 [US1] Update `apps/sv-appshell/src/routes/+layout.ts` to initialize Gadget registration during module loading
- [x] T021 [P] [US1] Create unit tests for `GadgetRegistry` in `packages/ts/registry/src/GadgetRegistry.spec.ts`

**Checkpoint**: User Story 1 functional - Dashboard displays gadgets and enables navigation

---

## Phase 4: User Story 2 - Module State Integration (Priority: P2)

**Goal**: Feature modules can access and modify shared application state reactively

**Independent Test**: Interact with a gadget that updates shared state and verify another component reflects the change

### BDD Tests for User Story 2 (Mandatory)

- [x] T022 [P] [US2] Create `features/shadcn-dashboard/module-state.feature` for reactive state synchronization
- [x] T023 [US2] Implement Cucumber step definitions for state updates in `tests/integration/shadcn-dashboard/module-state.steps.ts`

### Implementation for User Story 2

- [x] T024 [US2] Extend `GadgetRegistry` to provide shared state and shell configuration (`fr-012`) to modules during `init`
- [x] T025 [US2] Update `DemoWidget.svelte` to display and modify a shared state value from `ModuleStateStore`
- [x] T026 [US2] Add reactive state monitoring to `Dashboard.svelte` for global feedback

**Checkpoint**: User Story 2 functional - Modules correctly synchronize state through the shell

---

## Phase 5: User Story 3 - Module Service Invocation (Priority: P2)

**Goal**: Modules can export and discover services for inter-module communication

**Independent Test**: Call a service exported by the Demo module from the Dashboard component

### BDD Tests for User Story 3 (Mandatory)

- [x] T027 [P] [US3] Create `features/shadcn-dashboard/module-service.feature` for service discovery and invocation
- [x] T028 [US3] Implement Cucumber step definitions for service calls in `tests/integration/shadcn-dashboard/module-service.steps.ts`

### Implementation for User Story 3

- [x] T029 [US3] Implement service discovery method with dependency check in `GadgetRegistry.ts`
- [x] T030 [US3] Update `packages/ts/svelte/features/demo/src/index.ts` to export its `DemoService` via the registry
- [x] T031 [US3] Implement a test service consumer in `apps/sv-appshell/src/lib/components/dashboard/Dashboard.svelte` to invoke `DemoService`

**Checkpoint**: User Story 3 functional - Service discovery and invocation working across module boundaries

---

## Phase 6: User Story 4 - Custom User Journeys (Priority: P3) & Edge Cases

**Goal**: Modules control internal routing and handle advanced edge cases

**Independent Test**: Navigate through a multi-step flow and verify handler error recovery

- [x] T032 [US4] Update `apps/sv-appshell/src/routes/[...rest]/+page.svelte` to support nested module routing
- [x] T033 [US4] Implement a multi-step "User Journey" mock in `packages/ts/svelte/features/demo/src/DemoPage.svelte`
- [x] T034 [P] [US4] Ensure browser history works correctly for internal module navigation
- [x] T035 [US4] Implement "last-writer-wins" reactive queue test case in `ModuleStateStore`
- [x] T036 [US4] Add "handler error recovery" test scenario to `GadgetErrorBoundary.svelte`

**Checkpoint**: All user stories and refined edge cases complete

---

## Phase N: Polish & Cross-Cutting Concerns

- [x] T037 [P] Complete developer documentation in `specs/003-shadcn-ui-integration/quickstart.md`
- [x] T038 Add centralized ShadCN UI themer component for runtime theme switching
- [x] T039 Optimize component loading performance using Svelte dynamic imports
- [x] T040 [P] Ensure accessibility (A11y) compliance for all ShadCN organisms

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Start immediately (BDD/Vitest env)
- **Foundational (Phase 2)**: Depends on T001-T005 completion
- **User Story Phases (3-6)**: Depend on Phase 2 completion
- **BDD Before Implementation**: Feature files (T012, T022, T027) MUST be created before implementation starts for their respective stories.

### Parallel Opportunities

- T003, T004, T005 setting up basic env variables/configs
- T012, T015, T018 within US1 can run in parallel
- Unit tests (T011, T021) can be developed alongside the logic they test.
