# Implementation Plan: Moon Global Docker Build Task

**Branch**: `013-additional-moon-global` | **Date**: 2026-01-27 | **Spec**: [specs/013-additional-moon-global/spec.md](../spec.md)
**Input**: Feature specification from `specs/013-additional-moon-global/spec.md`

## Summary

The goal is to implement a global Moon task `docker-build` that orchestrates Docker image builds for both `apps/sveltekit-appshell` and `apps/go-server`. This task will integrate pre-build verifications (lint, test, audit), build using Google Distroless base images, tag images with both SHA/latest, and perform Trivy security scans. The logic will be encapsulated in a shared shell script (`scripts/docker-build-verify.sh`) to ensure consistency and maintainability across the monorepo.

## Technical Context

**Language/Version**: Bash (scripting), Docker, Moonrepo (YAML)
**Primary Dependencies**: 
- Moonrepo (Task orchestration)
- Docker (Builds)
- Trivy (Security scanning)
- Google Distroless Images (`gcr.io/distroless/nodejs20-debian12`, `gcr.io/distroless/static-debian12`)
**Storage**: N/A (Docker registry push is out of scope)
**Testing**: Manual verification of task execution, verification of failure on vulnerabilities.
**Target Platform**: GitHub Actions CI & Local Linux Dev Environment
**Project Type**: Monorepo Tooling / DevOps
**Performance Goals**: N/A (Build speed dependent on Docker/Moon caching)
**Constraints**: 
- MUST NOT push to registry (local load only).
- MUST fail on HIGH/CRITICAL vulnerabilities.
- MUST use specified naming convention `ghcr.io/[owner]/[app-name]`.
**Scale/Scope**: affects 2 applications (`go-server`, `sveltekit-appshell`).

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                     | Check                                | Status | Verification                                                     |
| :---------------------------- | :----------------------------------- | :----- | :--------------------------------------------------------------- |
| **1. Reference Architecture** | Aligns with `MONOREPO-REFERENCE.md`? | ✅ PASS | Uses Moonrepo for task orchestration as required.                |
| **2. UI-First Workflow**      | N/A to this DevOps task?             | ✅ PASS | Infrastructure task, no UI components involved.                  |
| **3. Virtual Module Arch**    | Respects module boundaries?          | ✅ PASS | Builds apps independently using their specific contexts.         |
| **4. DevSecOps & Security**   | Enforces 6-stage pipeline?           | ✅ PASS | Explicitly integrates SCA (Trivy), Linting, Testing as pre-reqs. |
| **5. Monorepo & Toolchain**   | Uses Moonrepo exclusively?           | ✅ PASS | Defines `docker-build` in `moon.yml` / `.moon/tasks.yml`.        |
| **6. Testing Strategy**       | N/A to infra script?                 | ✅ PASS | Verification via successful run and failure scenarios.           |
| **7. Branching & Release**    | N/A                                  | ✅ PASS | Uses feature branch workflow.                                    |
| **8. AI Agent Guardrails**    | Validates locally?                   | ✅ PASS | Plan includes verifying `moon run :docker-build` locally.        |

## Project Structure

### Documentation (this feature)

```text
specs/013-additional-moon-global/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (N/A for OPS)
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A for OPS)
└── checklists/          # Validation checklists
    ├── requirements.md
    └── devops.md
```

### Source Code (repository root)

```text
.moon/
├── tasks.yml            # Global task definition (docker-build)

scripts/
├── docker-build-verify.sh  # New shared script logic

apps/
├── go-server/
│   ├── Dockerfile
│   └── moon.yml         # Local task inheritance
├── sveltekit-appshell/
    ├── Dockerfile
    └── moon.yml         # Local task inheritance
```

**Structure Decision**: A shared script `scripts/docker-build-verify.sh` will handle the complex logic (build -> tag -> scan -> verify), while `.moon/tasks.yml` will define the `docker-build` task that invokes this script. This avoids duplicating complex shell logic in YAML files.


## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
