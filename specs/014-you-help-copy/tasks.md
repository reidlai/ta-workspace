---
description: "Task list for ResServer implementation in apps/go-server"
---

# Tasks: ResServer Implementation

**Input**: Design documents from `/specs/014-you-help-copy/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Go Server**: `apps/go-server/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Rename `apps/rest-server` directory to `apps/go-server`
- [x] T002 Update `moon.yml` in `apps/go-server/moon.yml` to reflect new project name
- [x] T003 Update `go.mod` module name in `apps/go-server/go.mod`
- [x] T004 Update `go.work` in repo root to reference `apps/go-server`
- [x] T005 [P] Update `Dockerfile` to reference `apps/go-server` paths
- [x] T006 Add `github.com/jirenius/go-res` and `github.com/nats-io/nats.go` dependencies to `apps/go-server/go.mod`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Implement `ResServer` struct and initialization logic in `apps/go-server/internal/server/run_res.go`
- [x] T008 [P] Refactor `apps/go-server/cmd/root.go` to support multiple subcommands
- [x] T009 Create `res-server` subcommand in `apps/go-server/cmd/res-server.go`
- [x] T010 [P] Implement middleware structure in `apps/go-server/internal/server/middleware.go`
- [x] T011 [P] Update `apps/go-server/internal/server/config.go` to include `NatsURL`
- [x] T012 Update `docker-compose.yml` to include NATS JetStream service

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Realtime Service Initialization (Priority: P1) 🎯 MVP

**Goal**: Start the `res-server` using the unified `go-server` CLI so that it connects to NATS and exposes the registered virtual modules via the RES protocol.

**Independent Test**:
1. Start NATS server.
2. Run `apps/go-server start-res-server`.
3. Verify `res-server` connects successfully and logs "Connected to NATS".

### Implementation for User Story 1

- [x] T013 [US1] Implement `RunResServer` function in `apps/go-server/internal/server/run_res.go` to connect to NATS
- [x] T014 [US1] Integrate `internal/di` container into `RunResServer` in `apps/go-server/internal/server/run_res.go`
- [x] T015 [US1] Implement RES service registration logic in `apps/go-server/internal/server/res.go`
- [x] T016 [US1] Wire `res-server` subcommand to call `RunResServer` in `apps/go-server/cmd/res-server.go`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Watchlist Resource Exposure (Priority: P2)

**Goal**: Access Watchlist data via RES protocol so that I can receive realtime updates and have my session identified to roll forward data changes.

**Independent Test**:
1. Request `get.watchlist.<id>`.
2. Verify `res-server` responds with watchlist data.
3. Validate session identification.

### Implementation for User Story 2

- [x] T017 [US2] Implement `WatchlistHandler` for RES in `apps/go-server/internal/server/res.go`
- [x] T018 [US2] Register `watchlist` resource handlers in `apps/go-server/internal/server/res.go` using DI service
- [x] T019 [US2] Implement session extraction middleware in `apps/go-server/internal/server/middleware.go`
- [x] T020 [US2] Apply session middleware to RES handlers in `apps/go-server/internal/server/run_res.go`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T021 [P] Verify `quickstart.md` instructions against implementation
- [x] T022 [P] Ensure structured logging is consistent across REST and RES in `apps/go-server`
- [x] T023 Remove any legacy `apps/rest-server` referneces in documentation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch generic tasks
Task: "Implement middleware structure in apps/go-server/internal/server/middleware.go"
Task: "Update apps/go-server/internal/server/config.go to include NatsURL"

# Launch logic tasks
Task: "Implement ResServer struct in apps/go-server/internal/server/run_res.go"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Each story adds value without breaking previous stories
