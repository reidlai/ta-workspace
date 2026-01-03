# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This feature standardizes application logging across `ta-server` and its modules by migrating from `log` and `goa.design/clue/log` to Go 1.21+ `log/slog`. It implements structured JSON logging for production (GCP-compliant) and human-readable text logging for development. It also ensures OpenTelemetry trace context is injected into logs for full observability.

## Technical Context

**Language/Version**: Go 1.24.0 (as per `apps/ta-server/go.mod`)
**Primary Dependencies**:

- `log/slog` (Standard Library)
- `goa.design/clue` (v0.20.0 - need to verify slog compatibility)
- `go.opentelemetry.io/otel` (v1.38.0 - for trace context)
  **Storage**: N/A
  **Testing**: `go test` (Unit), Manual verification of log output
  **Target Platform**: Linux (Docker/Distroless) via Moonrepo
  **Project Type**: Backend Service (`apps/ta-server`) + Modules (`modules/watchlist`, `modules/portfolio`)
  **Performance Goals**: Minimal allocation overhead for logging (slog is performant by design).
  **Constraints**:
- 12-Factor App (Stdout/Stderr only)
- Phase out `--debug` flag in favor of `TA_SERVER_LOG_LEVEL`
  **Scale/Scope**: Refactor touches `cmd/api-server.go`, `internal/server/http.go`, and service constructors in `modules/*/go`.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **12-Factor**: Compliant. Logs written to stdout/stderr.
- **Dependencies**: Using standard library `slog` reduces 3rd party dependency risk. `clue` and `otel` are existing.
- **Environment Parity**: Configurable via `TA_SERVER_LOG_FORMAT` and `TA_SERVER_LOG_LEVEL`.
- **Governance**: Moonrepo is used for tasks (updated `moon.yml` may be needed).
- **Security**: No sensitive data in logs (enforced by code review, existing policy).

**Result**: PASS

## Phase 0: Research

- [ ] **Research `goa.design/clue` Slog Support**: Determine if `clue` v0.20.0 natively supports `slog` or if we need to replace its middleware with a custom one. <!-- id: 0 -->
- [ ] **Research GCP Slog Handler**: Design the `slog.HandlerOptions{ReplaceAttr: ...}` function to map `trace_id` -> `logging.googleapis.com/trace` and standard keys to GCP keys. <!-- id: 1 -->
- [ ] **Research OTel Extraction**: Identify the exact function calls to extract TraceID/SpanID from `context.Context` in the used OTel version. <!-- id: 2 -->

## Project Structure

### Documentation (this feature)

```text
specs/010-standardize-use-slog/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # N/A (No new data entities)
├── quickstart.md        # Updated logging guide
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
apps/ta-server/
├── cmd/
│   └── api-server.go    # Main entrypoint (logger setup)
├── internal/
│   └── server/          # HTTP middleware (logger injection)
└── go.mod

modules/
├── watchlist/go/
│   └── pkg/             # Service implementation (usage)
└── portfolio/go/
    └── pkg/             # Service implementation (usage)
```

**Structure Decision**: Refactoring existing files in-place. No new services or modules.

## Proposed Changes

### Configuration & Entrypoint

#### [MODIFY] [apps/ta-server/cmd/api-server.go](file:///c:/Users/reidl/GitLocal/ta-workspace/apps/ta-server/cmd/api-server.go)

- Initialize `slog.Logger` based on `TA_SERVER_LOG_LEVEL` (debug/info/warn/error) and `TA_SERVER_LOG_FORMAT` (text/json).
- Remove `goa.design/clue/log` setup.
- Inject `slog.Logger` into `watchlist.NewWatchlist` and `portfolio.NewPortfolio`.

### Core Middleware

#### [MODIFY] [apps/ta-server/internal/server/http.go](file:///c:/Users/reidl/GitLocal/ta-workspace/apps/ta-server/internal/server/http.go)

- Create new Slog middleware.
- Extract `trace_id` and `span_id` using `go.opentelemetry.io/otel/trace`.
- Inject request-scoped `slog.Logger` (with trace attributes) into `context`.
- Log request start/completion using standard `slog`.

### Modules (Watchlist & Portfolio)

#### [MODIFY] [modules/watchlist/go/pkg/watchlist_service.go](file:///c:/Users/reidl/GitLocal/ta-workspace/modules/watchlist/go/pkg/watchlist_service.go)

- Change constructor to accept `*slog.Logger`.
- Replace `log.Printf` with `slog.InfoContext(ctx, ...)` or `s.logger.Info(...)`.

#### [MODIFY] [modules/portfolio/go/pkg/portfolio_service.go](file:///c:/Users/reidl/GitLocal/ta-workspace/modules/portfolio/go/pkg/portfolio_service.go)

- Change constructor to accept `*slog.Logger`.
- Replace `log.Printf` with `slog.InfoContext(ctx, ...)` or `s.logger.Info(...)`.

## Verification Plan

### Automated Tests

- `go test ./...`: Verify no build breakages.
- Unit tests for new Slog Middleware (mocking context extraction).

### Manual Verification

1. **Dev Mode**:
   - Run `TA_SERVER_LOG_FORMAT=text go run . api-server`
   - Verify: Logs are human-readable, colorized (if supported), no JSON.
2. **Prod Mode**:
   - Run `TA_SERVER_LOG_FORMAT=json TA_SERVER_LOG_LEVEL=INFO go run . api-server`
   - Verify: Logs are single-line JSON. Keys include `severity`, `message`, `time`.
3. **Trace Correlation**:
   - Send HTTP request.
   - Verify: Log entry contains `logging.googleapis.com/trace`.
