---
description: "Task list for initializing Moonrepo"
---

# Tasks: Initialize Project with Moonrepo

**Input**: Design documents from `/specs/001-initialize-current-project/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are inherent to the infrastructure (validating the config works).
**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Moonrepo configuration directory at `.moon/`
- [x] T002 Create empty project directories `apps/` and `packages/`
- [x] T003 [P] Create `.gitignore` with Moonrepo defaults

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Setup `toolchain.yml` with Node.js v20 and pnpm in `.moon/toolchain.yml`
- [x] T005 Setup `workspace.yml` identifying `apps` and `packages` as projects in `.moon/workspace.yml`
- [x] T006 [P] Define `package.json` at root to manage workspace dependencies

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Monorepo Workspace Initialization (Priority: P1) 🎯 MVP

**Goal**: Initialize the project codebase as a managed monorepo so that I can efficiently manage multiple applications and packages with consistent tooling.

**Independent Test**: Can be fully tested by verifying the workspace configuration validation passes successfully.

### Implementation for User Story 1

- [x] T007 [US1] Run `moon init` (simulated via manual config or re-validation of previous steps)
- [x] T008 [US1] Run `moon doctor` to validate configuration integrity
- [x] T009 [US1] Update `package.json` with scripts for `moon` commands

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Project Discovery (Priority: P1)

**Goal**: Automatically discover my applications and packages so that I don't have to manually register every new component.

**Independent Test**: Create dummy projects in `apps/` and `packages/` and verify they are listed by the tool.

### Implementation for User Story 2

- [x] T010 [P] [US2] Create dummy app in `apps/demo-app/moon.yml` to verify discovery
- [x] T011 [P] [US2] Create dummy package in `packages/demo-pkg/moon.yml` to verify discovery
- [x] T012 [US2] Run `moon sync` to verify project graph generation
- [x] T013 [US2] Clean up dummy projects (optional/verification step)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Task Infrastructure (Priority: P2)

**Goal**: A unified way to define and run tasks across projects so that build and test processes are consistent.

**Independent Test**: Define a trivial "echo" task and execute it.

### Implementation for User Story 3

- [x] T014 [US3] Define global `build` task in `.moon/tasks.yml`
- [x] T015 [US3] Define global `test` task in `.moon/tasks.yml`
- [x] T016 [US3] Define global `lint` task in `.moon/tasks.yml`
- [x] T017 [US3] Validate task execution via `moon run :build` (dry run or on dummy project)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T018 Document Moonrepo usage in `README.md`
- [x] T019 [P] Update `quickstart.md` with verification steps performed
- [x] T020 Security check on toolchain download URLs (implicit in moon)
- [x] T021 Create `docs/ARCHITECTURE.md`
- [x] T022 Link Architecture doc in `README.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User story 1 is effectively covered by Foundational + Setup but validated explicitly
  - User stories 2 & 3 can proceed in parallel after Foundation
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Independent of US1 verification
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Independent of US1/US2

### Parallel Opportunities

- T003 (.gitignore) can run parallel to T001/T002
- T010 (dummy app) and T011 (dummy package) can run parallel
- T014, T015, T016 (global tasks) can run parallel
- Documentation tasks can run parallel to implementation

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1 (Validate with `moon doctor`)
4. **STOP and VALIDATE**: Test workspace is valid
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → MVP
3. Add User Story 2 → Test project discovery
4. Add User Story 3 → Test global task execution
