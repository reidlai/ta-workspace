# Implementation Plan: ResServer Implementation

**Branch**: `014-you-help-copy` | **Date**: 2026-02-04 | **Spec**: [specs/014-you-help-copy/spec.md](spec.md)
**Input**: Feature specification from `/specs/014-you-help-copy/spec.md`

## Summary

## Summary

Rename `apps/rest-server` to `apps/go-server` to serve as a unified application shell. Implement the RES protocol gateway as a new subcommand (`server res-server start`) within this shell. Update `docker-compose.yml` to provision NATS JetStream, ensuring a complete local development environment. This enables both REST and RES protocols to coexist, supporting realtime features with `watchlist` and `portfolio` modules while adding middleware for session context.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Go 1.24+  
**Primary Dependencies**: `github.com/jirenius/go-res` (RES Protocol), `nats.go` (NATS Client), `slog` (Stdlib Logging)  
**Storage**: N/A (Relies on existing modules' persistence, typically NATS/Memory for this layer)  
**Testing**: `go test` (Unit/Integration)  
**Target Platform**: Linux Container (Docker)  
**Project Type**: Backend Service (AppShell Gateway)  
**Performance Goals**: Low latency (<5ms for cached resources), High concurrency (NATS handles scale)  
**Constraints**: Must follow `virtual-module-core` architecture, strict DI usage, Offline roll-forward support  
**Scale/Scope**: Single new application (`apps/res-server`), imports 2 existing modules.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **Authority**: [PASS] Aligns with `VIRTUAL-MODULE-ARCHITECTURE.md` (Polyglot, DI).
- **UI-First**: [PASS] N/A (Backend-only gateway implementation; UI exists).
- **Virtual Module**: [PASS] Consumes existing modules without circular deps.
- **DevSecOps**: [PASS] Will follow `moon` tasks and linting/testing standards.
- **Monorepo**: [PASS] Registered in `go.work` and `moon.yml`.
- **Testing**: [PASS] `go test` integration.
- **Branching**: [PASS] Feature branch `014-you-help-copy` usage.
- **AI Agent**: [PASS] I am the agent, following guardrails.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
apps/go-server/ (Renamed from apps/rest-server)
├── cmd/
│   ├── main.go               # Entry point
│   ├── root.go               # Root command
│   ├── api-server.go         # Existing REST command
│   └── res-server.go         # NEW: RES command
├── internal/
│   ├── di/                   # Shared DI container
│   ├── server/
│   │   ├── config.go
│   │   ├── run_api.go        # Renamed run.go -> run_api.go
│   │   ├── run_res.go        # NEW: startup logic for RES
│   │   ├── res.go            # NEW: RES handlers
│   │   └── middleware.go     # NEW: Auth middleware
├── go.mod
└── moon.yml
```

**Structure Decision**: A single "monolith" application shell (`apps/go-server`) that exposes different protocols (REST, RES) via CLI subcommands. This maximizes code reuse (DI, Domain Logic, Config) and simplifies operations.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
