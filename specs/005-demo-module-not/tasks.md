# Implementation Tasks: Retrieve Specific Widget

**Feature Branch**: `005-demo-module-not`
**Total Tasks**: 5

## Implementation Strategy

- **Phase 1**: Setup (Validate environment)
- **Phase 2**: User Story 1 (Core Registry Logic)
- **Phase 3**: Verification (Unit Tests)

## Dependencies

- P1 (Setup) -> P2 (US1) -> P3 (Verify)

## Phase 1: Setup

- [ ] T001 Validate Registry package structure in modules/core/ts/registry/

## Phase 2: User Story 1 - Developer Retrieves Specific Widget (P1)

**Goal**: Enable O(1) widget lookup by ID with strict uniqueness enforcement.
**Independent Test**: Unit tests confirm getWidget returns correct object or undefined, and register logs warning on duplicate.

- [ ] T002 [US1] Add widgetMap property and getWidget method to modules/core/ts/registry/Registry.ts
- [ ] T003 [US1] Update register method to enforce uniqueness and populate widgetMap in modules/core/ts/registry/Registry.ts

## Phase 3: Verification & Polish

- [ ] T004 [US1] Create unit tests for getWidget and uniqueness in modules/core/ts/registry/registry.test.ts
- [ ] T005 Verify backward compatibility by running app shell build
