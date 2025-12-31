---
description: "Task list for Standardize Slog Logging feature"
---

# Tasks: Standardize Slog Logging

**Input**: Design documents from `/specs/010-standardize-use-slog/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, quickstart.md

**Tests**: Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Server**: `apps/ta-server/`
- **Modules**: `modules/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify `goa.design/clue` version and `slog` compatibility in `apps/ta-server/go.mod`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Implement `Middleware` in `apps/ta-server/internal/server/http.go` to extract OTel trace IDs and inject `slog` logger into context
- [x] T003 [P] Define `TA_SERVER_LOG_LEVEL` and `TA_SERVER_LOG_FORMAT` constants/variables in `apps/ta-server/cmd/api-server.go`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Structured Cloud Logging (Priority: P1) 🎯 MVP

**Goal**: Production logs are emitted as single-line JSON with OTel trace IDs for GCP observability.

**Independent Test**: Run with `TA_SERVER_LOG_FORMAT=json` and verify `severity`, `message`, `logging.googleapis.com/trace` keys in output.

### Implementation for User Story 1

- [x] T004 [US1] Implement JSON Handler with `ReplaceAttr` for GCP key mapping (`severity`, `trace`) in `apps/ta-server/cmd/api-server.go`
- [x] T005 [US1] Configure `api-server.go` to use JSON handler when `TA_SERVER_LOG_FORMAT=json`
- [x] T006 [US1] Validate OTel trace injection in JSON output using manual request

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Human-Readable Dev Logging (Priority: P2)

**Goal**: Development logs are human-readable text for better DX.

**Independent Test**: Run with `TA_SERVER_LOG_FORMAT=text` and verify non-JSON, readable output.

### Implementation for User Story 2

- [x] T007 [US2] Implement Text Handler configuration in `apps/ta-server/cmd/api-server.go`
- [x] T008 [US2] Configure `api-server.go` to use Text handler when `TA_SERVER_LOG_FORMAT=text` (or default local env)
- [x] T009 [US2] Update `apps/ta-server/moon.yml` to set default dev environment variables

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Unified Component Logging (Priority: P3)

**Goal**: All internal modules use the standard `slog` interface.

**Independent Test**: Verify `modules/watchlist` and `modules/portfolio` log output appears in the configured format.

### Implementation for User Story 3

- [x] T010 [P] [US3] Refactor `modules/watchlist/go/pkg/watchlist_service.go` to accept `*slog.Logger` and use `slog`
- [x] T011 [P] [US3] Refactor `modules/portfolio/go/pkg/portfolio_service.go` to accept `*slog.Logger` and use `slog`
- [x] T012 [US3] Update service initialization in `apps/ta-server/cmd/api-server.go` to pass the global `slog.Logger`
- [x] T013 [US3] Remove `goa.design/clue/log` imports and usage from all modified files

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T014 Run `go test ./...` in `apps/ta-server` to ensure no regressions
- [x] T015 Verify `quickstart.md` examples against implementation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all user stories

### User Story Dependencies

- **User Story 1 (P1)**: Independent after Phase 2
- **User Story 2 (P2)**: Independent after Phase 2
- **User Story 3 (P3)**: Independent after Phase 2, but requires T012 update to link everything together
