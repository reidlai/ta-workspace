# Implementation Plan: ISO 10383 MIC Exchange Listing

**Branch**: `007-exchange-listing` | **Date**: 2025-12-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-exchange-listing/spec.md`

## Summary

Implement a new Goa-based microservice within `modules/watchlist/go` to serve the ISO 10383 Market Identifier Code (MIC) list. The data will be bundled as a CSV in the binary, parsed at startup into memory, and exposed via an authenticated API endpoint (auth logic deferred). This enables consistent exchange selection in the Watchlist UI.

## Technical Context

**Language/Version**: Go 1.23  
**Primary Dependencies**: Goa v3, `golang.org/x/text` (for ISO-8859-1 encoding)  
**Storage**: In-memory (RAM-based cache loaded at startup)  
**Testing**: Go unit tests with mocked CSV sources  
**Target Platform**: Linux (Distroless Container)  
**Project Type**: Monorepo Go Module (Goa service)  
**Performance Goals**: <100ms API response time (data is in RAM)  
**Constraints**: Bundled CSV must be <1MB, Startup "Fail Fast" if CSV is invalid  
**Scale/Scope**: ~1,500 Operating MICs, <200KB memory footprint

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] **Monorepo Authority**: Using Moonrepo for build and task management.
- [x] **Tech Stack**: Using Authorized Golang for backend.
- [x] **Containerization**: Using multi-stage distroless (defined at app-level).
- [x] **SOLID/12-Factor**: Using Goa to enforce clean interface boundaries.
- [x] **Branching**: Operating on `007-exchange-listing`.
- [x] **Security**: Authenticated intent captured in Goa design.

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
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
