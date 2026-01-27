# Implementation Tasks: Moon Global Docker Build Task

**Inputs**:
- Spec: [specs/013-additional-moon-global/spec.md](spec.md)
- Plan: [specs/013-additional-moon-global/plan.md](plan.md)
- Research: [specs/013-additional-moon-global/research.md](research.md) (Script logic, Trivy flags)

## Phases

### Phase 1: Setup

1. **Goal**: Ensure clean environment and necessary tool configs.

- [x] T001 Verify `trivy` and `docker` availability locally to confirm prerequisites (Manual)
- [x] T002 Create `scripts/docker-build-verify.sh` with executable permissions (Empty shell or basic shebang)

### Phase 2: Foundational (Shared Logic)

1. **Goal**: Implement the reusable build-verify logic.

- [x] T003 Implement `scripts/docker-build-verify.sh` - Argument parsing (app name, dockerfile path)
- [x] T004 Implement `scripts/docker-build-verify.sh` - Docker build command with Distroless target
- [x] T005 Implement `scripts/docker-build-verify.sh` - Tagging logic (SHA + latest)
- [x] T006 Implement `scripts/docker-build-verify.sh` - Trivy scan logic (HIGH,CRITICAL exit code 1)
- [x] T007 [P] Manual verification of script with a dummy Dockerfile

### Phase 3: User Story 1 - Developer Builds All Docker Images

1. **Goal**: Enable `moon run :docker-build` for all apps.
2. **Independent Test**: Run `moon run :docker-build` and verify images exist and are scanned.

- [x] T008 [US1] Create/Update `apps/go-server/Dockerfile` to use multi-stage build + Distroless runtime
- [x] T009 [US1] Define `docker-build` task in `apps/go-server/moon.yml` invoking the script
- [x] T010 [US1] [P] Verify `apps/sveltekit-appshell/Dockerfile` uses similar Distroless pattern (Update if needed)
- [x] T011 [US1] Define `docker-build` task in `apps/sveltekit-appshell/moon.yml` invoking the script
- [x] T012 [US1] Define global `docker-build` task in `.moon/tasks.yml` (aggregating app tasks)

### Phase 4: Polish & Verification

1. **Goal**: Validating failure modes & documentation.

- [x] T013 Verify failure mode: Force a vulnerability (e.g. use old base image) and confirm task fails
- [x] T014 Verify success mode: Run full `moon run :docker-build`
- [x] T015 Verify local-only: Ensure no images pushed to registry

## Dependencies

- Phase 2 (Script) blocks Phase 3 (Integration).
- Dockerfile updates (T008, T010) block their respective Moon task definitions (T009, T011).

## Implementation Strategy

- **Step 1**: Write the shared script. This is the core complexity.
- **Step 2**: Fix Dockerfiles one by one (Go first as it needs new file).
- **Step 3**: Wire into Moon.
