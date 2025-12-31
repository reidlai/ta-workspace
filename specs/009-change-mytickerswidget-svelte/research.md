# Research: MyTickersWidget Update

**Status**: Complete
**Spec**: `specs/009-change-mytickerswidget-svelte/spec.md`

## Unknowns & Decisions

### 1. ShadCN Card Structure

- **Unknown**: How to structure the ShadCN Card for this specific widget?
- **Decision**: Use standard composition:
  - `Card.Root` as container
  - `Card.Header` -> `Card.Title` ("My Tickers"), `Card.Description` (Count + Exchanges)
  - `Card.Content` -> Scrollable list of tickers
- **Rationale**: Follows standard library patterns found in `apps/sv-appshell/src/lib/components/ui/card`.
- **Alternatives**: Custom div implementation (Rejected: Violates requirement to use ShadCN).

### 2. Read-Only State Management

- **Unknown**: How to handle the strictly read-only requirement?
- **Decision**: Simply remove the import/usage of `addTicker` and `removeTicker` methods from the component script, and delete the HTML input elements.
- **Rationale**: Easiest and most secure way to enforce read-only.
- **Alternatives**: Hide buttons via CSS (Rejected: Insecure/hacky).

### 3. Exchange Count Implementation (Option A)

- **Unknown**: How to show "Exchange Count" without backend data?
- **Decision**: Implement a **Static Mapping** helper function in the widget (`getExchange(symbol)`) that maps common symbols to their ISO 10383 Exchange names (e.g., "NASDAQ", "NYSE").
- **Rationale**: User selected "Static Map" strategy (Option A). This allows accurate counting for known symbols based on the ISO standard (Feature 007) without requiring a backend schema migration for this specific task.
- **Alternatives**: Backend schema change (Rejected: Out of scope).

## Summary

No major technical unknowns. The path is a straightforward refactor of an existing Svelte component with a mock helper for exchanges.
