# Feature Specification: Moon Global Docker Build Task

**Feature Branch**: `013-additional-moon-global`
**Created**: 2026-01-27
**Status**: Draft
**Input**: User description: "Need additional moon global task which call both projects tasks docker-build in both apps/sveltekit-appshell and apps/go-server. The project tasks docker-build targets to build docker image for each app-shell fully integate with pre-commit framework (stickwith with same tasks specified in .github/workflows/ci.yaml), build binary and deployed into Google distroless docker image, then scan by trivy to guarantee no vulnerabilites in docker image"

## Clarifications

### Session 2026-01-27

- Q: What severity level of vulnerabilities should fail the build? → A: **HIGH and CRITICAL** only.
- Q: How should the Docker images be tagged? → A: Tag with **both** the abbreviated Git SHA and `latest`.
- Q: Should the task push images to a registry? → A: **No**, local build and scan only (pushing is a separate CI step).
- Q: What image naming convention should be used? → A: **`ghcr.io/[owner]/[app-name]`** (e.g., `ghcr.io/reidlai/sveltekit-appshell`).
- Q: Where should the build/scan logic reside? → A: **Shared Shell Script** called by Moon tasks.



## User Scenarios & Testing _(mandatory)_

### User Story 1 - Developer Builds All Docker Images (Priority: P1)

As a developer or CI process, I want to run a single command to build and verify Docker images for all applications, so that I can ensure consistency and security before deployment.

**Why this priority**: Use of a consistent, single command reduces manual errors and ensures all checks (lint, test, security) are applied uniformly across services.

**Independent Test**: Can be tested by running the global moon task and verifying that Docker images are created for both `sveltekit-appshell` and `go-server`, and that the build fails if code quality checks fail.

**Acceptance Scenarios**:

1. **Given** a clean workspace, **When** I run the global `docker-build` task, **Then** it triggers linting, testing, and security checks for both apps.
2. **Given** all checks pass, **When** the task proceeds, **Then** it builds Docker images using Google distroless base images.
3. **Given** images are built, **When** the task concludes, **Then** it runs Trivy to scan the images for vulnerabilities and reports results.
4. **Given** a vulnerability or lint error exists, **When** I run the global `docker-build` task, **Then** the process aborts and reports the failure.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST provide a global moon task named `docker-build` that orchestrates the build process for `apps/sveltekit-appshell` and `apps/go-server`.
- **FR-002**: The `docker-build` process for `sveltekit-appshell` MUST integrate the following pre-build verifications (matching CI):
    - Linting (Prettier, ESLint/Svelte check)
    - Unit Tests
    - Audit (pnpm audit)
- **FR-003**: The `docker-build` process for `go-server` MUST integrate the following pre-build verifications (matching CI):
    - Static Analysis (govulncheck)
    - Linting & Formatting (gofmt, golangci-lint)
    - Quality Vetting (go vet)
    - Unit Tests
    - Security Scanning (gosec, semgrep)
- **FR-004**: The system MUST define a valid Dockerfile for `apps/go-server` that uses a multi-stage build with a Google distroless runtime image.
- **FR-005**: Both application Docker builds MUST use Google distroless images (e.g., `gcr.io/distroless/nodejs20-debian12`, `gcr.io/distroless/static-debian12`) for production runtime.
- **FR-006**: The `docker-build` task MUST execute a Trivy image scan on the newly built images immediately after the build completes. The build MUST fail if any **HIGH** or **CRITICAL** severity vulnerabilities are detected.
- **FR-007**: The generic logic for `docker-build` should be defined in a way that minimizes duplication between projects (e.g., via global tasks config or shared scripts where appropriate).
- **FR-008**: Docker images MUST be tagged with two tags: the abbreviated Git commit SHA (7 chars) and `latest`.
- **FR-009**: The `docker-build` task MUST NOT push images to any registry; it creates them in the local Docker daemon only.
- **FR-010**: Docker images MUST be named using the `ghcr.io/[owner]/[app-name]` convention (e.g., derived from the usage of GitHub Container Registry).
- **FR-011**: The implementation MUST encapsulate the build-tag-scan logic in a reusable shell script (e.g., `scripts/docker-build-verify.sh`) to ensure consistency and simplify Moon task definitions.





### Key Entities

- **Docker Image**: The final artifact produced for each application.
- **Moon Task**: The unit of execution managing the dependencies (lint -> test -> build -> scan).

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: A single console command builds safe, verified Docker images for all apps.
- **SC-002**: 100% of built images are scanned by Trivy before being considered "success".
- **SC-003**: Runtime images contain only the application binary/assets and minimal runtime dependencies (distroless), minimizing attack surface.
