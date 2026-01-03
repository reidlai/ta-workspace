# Tasks: Update MyTickers Widget

**Feature**: Update MyTickers Widget
**Status**: Pending
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)

## Phase 1: Setup

_Goal: Prepare the environment and verify dependencies._

- [x] T001 Verify ShadCN `Card` components are available in `apps/sv-appshell/src/lib/components/ui/card`.
- [x] T002 Verify `MyTickersWidget.svelte` exists in `modules/watchlist/svelte/src/widgets/`.

## Phase 2: Foundational

_Goal: Implement shared logic and basic refactoring prerequisites._

- [x] T003 Implement `getExchange(symbol)` helper function in `modules/watchlist/svelte/src/widgets/MyTickersWidget.svelte` (or a utility file if preferred) using the **Static Mapping** strategy (e.g. key map of common symbols to ISO exchange names).
- [x] T004 Create a derived store or reactive declaration for `exchangeCounts` in the widget using `getExchange`.

## Phase 3: View Watchlist Summary (P1)

_Story: As a dashboard user, I want to see the total count and exchange breakdown in a clean summary card._
_Test: Verify card renders with "5 Tickers" and "• 2 Exchanges" subtext._

- [x] T005 [US1] Refactor `MyTickersWidget.svelte` root element to use `Card.Root`, `Card.Header`, `Card.Title`, and `Card.Description` from ShadCN.
- [x] T006 [US1] Remove all "Add Ticker" inputs, buttons, and associated script logic (handlers, imports).
- [x] T007 [US1] Implement `Card.Title` to display "My Tickers".
- [x] T008 [US1] Implement `Card.Description` to display the ticker count (e.g., "5 Tickers") and the Exchange Count (e.g., "• 2 Exchanges") derived from T004.
- [x] T016 [P] [US1] Create unit tests for MyTickersWidget in `modules/watchlist/svelte/src/widgets/MyTickersWidget.test.ts` (verifying rendering, counts, and exchange logic).

## Phase 4: View Watched Tickers List (P2)

_Story: As a user, I want to see the read-only list of tickers._
_Test: Verify list appears and is scrollable._

- [x] T009 [US2] Implement `Card.Content` to display the list of tickers.
- [x] T010 [US2] Ensure the list container has `max-h-[value]` and `overflow-y-auto` (or similar) to support scrolling for long lists.
- [x] T011 [US2] Remove the "Remove" (trash icon) button from the individual ticker items.
- [x] T012 [US2] Verify the "on_hand" status icon (briefcase/eye) is preserved for read-only status indication.

## Phase 5: Polish & Cleanup

- [x] T013 [Polish] Verify visually that the widget matches ShadCN aesthetics (padding, borders, shadows).
- [x] T014 [Polish] Verify empty state behavior (0 count, helpful message in content).
- [x] T015 [Polish] Run `npx publint` or `svelte-check` (if configured) to ensure no type errors in the modified component.

## Dependencies

- [US1] depends on [Phase 1] & [Phase 2]
- [US2] depends on [US1] (logically follows the card structure setup)

## Implementation Strategy

1.  **MVP**: Tasks T001-T008 (Summary Card + Exchange Count).
2.  **Complete**: Tasks T009-T012 (List View).
