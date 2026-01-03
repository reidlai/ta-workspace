# Tasks: ISO 10383 MIC Exchange Listing

**Feature**: ISO 10383 MIC Exchange Listing
**Status**: Pending
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)

## Phase 1: Setup

_Goal: Prepare the environment and dependencies for data handling._

- [x] T001 Install `golang.org/x/text` dependency for ISO-8859-1 decoding.
- [x] T002 Create data directory and internal package structure in `modules/watchlist/go/`.
- [x] T003 Download the official `ISO10383_MIC.csv` file to `modules/watchlist/go/data/` for embedding.

## Phase 2: Foundational

_Goal: Implement core data structures and loading logic (blocking prerequisites)._

- [x] T004 Define `Exchange` struct and global storage in `modules/watchlist/go/exchange_model.go`.
- [x] T005 Implement `LoadExchanges` function with CSV parsing (ISO-8859-1 -> UTF-8), filtering (OPRT+ACTIVE), and sorting in `modules/watchlist/go/exchange_loader.go`.
- [x] T006 Add `Exchange.Display_Name` formatting logic (`Acronym - Name (Country)`) in the loader.
- [x] T007 Add "Fail Fast" logic to `LoadExchanges` to panic or return fatal error on parse failure.
- [x] T008 [P] Create unit tests for `LoadExchanges` using a mock embedded CSV in `modules/watchlist/go/exchange_loader_test.go`.
- [x] T009 Integrate `LoadExchanges` into `NewWatchlist` service factory in `modules/watchlist/go/service.go`.

## Phase 3: List All Active Operating Exchanges (P1)

_Story: As a system, I want to expose the loaded exchange list so the UI can populate the select box._
_Test: Call `GET /exchanges` and verify sorted JSON output._

- [x] T010 [US1] Define `Exchange` result type in `apps/ta-server/design/types.go` (or `design.go`).
- [x] T011 [US1] Define `exchange` service and `list` method in `apps/ta-server/design/design.go` with deferred security.
- [x] T012 [US1] Run `moon run ta-server:gen` to generate Goa scaffolding.
- [x] T013 [US1] Implement `exchange` service interface in `modules/watchlist/go/exchange_service.go` returning the in-memory list.
- [x] T014 [US1] Wire up `exchange` service in `apps/ta-server/cmd/api-server.go`.
- [x] T015 [US1] Build and verify the API endpoint returns the full list.

## Phase 4: Search and Filter Exchanges (P2)

_Story: As a developer, I want to filter the exchange list by name or country._
_Test: Call `GET /exchanges?q=US` and verify only US exchanges are returned._

- [x] T016 [US2] Update `list` method design in `apps/ta-server/design/design.go` to add optional `query` parameter.
- [x] T017 [US2] Run `moon run ta-server:gen` to regenerate Goa code.
- [x] T018 [US2] Implement case-insensitive partial search logic in `modules/watchlist/go/exchange_service.go`.
- [x] T019 [US2] [P] Add unit tests for search filtering in `modules/watchlist/go/exchange_service_test.go`.

## Phase 5: Polish & Cleanup

- [x] T020 [Polish] Run `moon run ta-server:lint` (if it exists) or `go vet ./...`.
- [x] T021 [Polish] Verify "Fail Fast" behavior by temporarily renaming the CSV file and running the server (manual step).

## Dependencies

- [US1] depends on [Phase 2]
- [US2] depends on [US1]

## Implementation Strategy

1.  **MVP**: Complete Phase 1, Phase 2, and Phase 3 to get the full list serving.
2.  **Iterate**: Add search functionality in Phase 4.
