# Research: Moon Global Docker Build Task

**Status**: Completed
**Date**: 2026-01-27

## Decision Log

### 1. Build Verification Approach

- **Decision**: Use a shared Bash script (`scripts/docker-build-verify.sh`) invoked by Moon.
- **Rationale**: 
    - Complex logic (conditional checks, image naming, Trivy parsing) is hard to maintain in YAML inline commands.
    - Ensures identical verification logic for both Go and Node apps.
    - Easier to test the script independently of Moon.
- **Alternatives Considered**:
    - *Inline Moon commands*: Too messy and duplicate logic.
    - *Makefiles*: Adds another tool to the toolchain (Constitution violation: "Moonrepo is the exclusive task runner").
    - *Docker Compose*: Good for orchestration but less integrated with Moon's caching and dependency graph.

### 2. Trivy Configuration

- **Decision**: Run Trivy in `image` mode with `--exit-code 1 --severity HIGH,CRITICAL`.
- **Rationale**: Matches requirements explicitly. Blocks the Moon task if vulnerabilities exceed threshold.
- **Command Pattern**: `trivy image --exit-code 1 --severity HIGH,CRITICAL --no-progress $IMAGE_NAME`

### 3. Docker Tagging Strategy

- **Decision**: Tags: `latest` and `sha-${BITBUCKET_COMMIT:0:7}` (or equivalent git rev-parse short).
- **Rationale**: 
    - `latest` allows easy local testing (`docker run ...`).
    - `sha-...` provides traceability to the exact codebase version.
    - Prepending `sha-` is a common convention to avoid confusion with semantic versions.

### 4. Moon Task Scope

- **Decision**: Define `docker-build` in `.moon/tasks.yml` with `deps` on `build`, `test`, `lint`.
- **Rationale**: 
    - Ensures the artifact being containerized is valid code.
    - Leverages Moon's caching: if tests pass, they won't re-run redundantly.

## Unknowns Resolution

| Unknown                    | Resolution                                                                         | Source                   |
| :------------------------- | :--------------------------------------------------------------------------------- | :----------------------- |
| Trivy local availability   | Assumed available or installed via CI setup. Spec allows "System MUST provide...". | Spec FR-006              |
| Google Distroless for Go   | `gcr.io/distroless/static-debian12`                                                | Official Distroless docs |
| Google Distroless for Node | `gcr.io/distroless/nodejs20-debian12`                                              | Official Distroless docs |
