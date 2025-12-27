---
description: "Implementation tasks for SvelteKit App Shell with custom DI"
---

# Tasks: Create SvelteKit App Shell

**Input**: Feature specification from `spec.md`, Implementation Plan from `plan.md`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Tests are included where applicable (build verification, unit tests) as per plan.

**Organization**: Tasks are grouped by logical phase and user story priority.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Configuration & Workspace)

**Purpose**: Update workspace configuration to recognize the new application.

- [x] T001 Update `moon.yml` or `workspace.yml` to include `apps/sv-appshell` in projects list

## Phase 2: Foundational (Shared Interfaces & Core Structure)

**Purpose**: Establish the shared contracts and directory structure before app implementation.

**⚠️ CRITICAL**: Must be complete before App Shell implementation.

- [x] T002 Create shared typescript package structure in `packages/shared/typescripts/package.json`
- [x] T003 Define `IFeatureBundle` interface in `packages/shared/typescripts/src/index.ts` (routes, state, services)
- [x] T004 [P] Define `IContext` interface in `packages/shared/typescripts/src/index.ts` (getService, config)
- [x] T005 [P] Define `IAppConfig` interface in `packages/shared/typescripts/src/index.ts`
- [x] T006 [P] Define `ModuleInit` type in `packages/shared/typescripts/src/index.ts`
- [x] T007 Create shared core package structure in `packages/shared/core/package.json`
- [x] T008 [P] Implement DI Container in `packages/shared/core/src/di/Container.ts`
- [x] T009 [P] Implement Registry in `packages/shared/core/src/registry/Registry.ts`
- [x] T010 [P] Implement Router Service in `packages/shared/core/src/router/Router.ts`
- [x] T011 Build shared packages via `moon run shared-typescripts:build` and `moon run shared-core:build`

**Checkpoint**: Shared interfaces and core logic are published/available.

## Phase 3: User Story 1 - App Shell Initialization (Priority: P1) 🎯 MVP

**Goal**: Initialize the SvelteKit app and ensure it runs via Moonrepo.

**Independent Test**: `moon run sv-appshell:dev` works.

### Implementation for User Story 1

- [x] T012 [US1] Initialize SvelteKit app in `apps/sv-appshell` using `create-svelte` (skeleton project)
- [x] T013 [US1] Install `adapter-node` and configure `apps/sv-appshell/svelte.config.js`
- [x] T014 [US1] Create `apps/sv-appshell/Dockerfile` per Constitution
- [x] T015 [US1] Create `apps/sv-appshell/moon.yml` with tasks for dev, build, test, lint
- [x] T016 [US1] Add dependencies on `@shared/typescripts` and `@shared/core` in `apps/sv-appshell/package.json`
- [x] T017 [US1] Verify build with `moon run sv-appshell:build`

**Checkpoint**: Basic SvelteKit app is running and managed by Moonrepo.

## Phase 4: User Story 2 - Module Injection & DI (Priority: P1)

**Goal**: Implement the custom DI container, Registry, and Dynamic Router.

**Independent Test**: Mock module injection works.

### Implementation for User Story 2

- [x] T018 [US2] Implement Dynamic Router catch-all in `apps/sv-appshell/src/routes/[...rest]/+page.svelte` (delegating to `@shared/core`)
- [x] T019 [US2] Create example `modules.json` in `apps/sv-appshell/static/modules.json`
- [x] T020 [US2] Implement App Initialization logic in `apps/sv-appshell/src/routes/+layout.ts` to boot Registry
- [x] T021 [US2] Create demo feature package in `packages/features/demo-feature/package.json`
- [x] T022 [US2] Implement `IFeatureBundle` in `packages/features/demo-feature/src/index.ts`
- [x] T023 [US2] Build demo feature `moon run feature-demo:build`
- [x] T024 [US2] Register demo feature in `modules.json` and verify routing

**Checkpoint**: App Shell can load an external module and route to it.

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup and final verification.

- [x] T025 [P] Run `moon run sv-appshell:lint` and fix violations
- [x] T026 Create `docs/appshell-architecture.md` detailing DI, Registry, and Module concepts
- [x] T027 Update `README.md` and `quickstart.md` with links to architecture docs and run instructions
- [x] T028 Verify Docker image build `docker build .`

## Dependencies & Execution Order

1. **Phase 1 & 2** (Shared Types) must happen first.
2. **Phase 3** (App Init) depends on Phase 1.
3. **Phase 4** (DI Implementation) depends on Phase 2 (Types) and Phase 3 (App existence).

## Parallel Opportunities

- T003, T004, T005, T006 (Interface definitions) can be done in parallel / single file edit.
- T013 (DI), T014 (Registry) can be implemented in parallel once types exist.
