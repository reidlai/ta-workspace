# Feature Specification: Standardize Slog Logging

**Feature Branch**: `010-standardize-use-slog`  
**Created**: 2025-12-31  
**Status**: Draft  
**Input**: User description: "standardize to use slog as golang logging framework to integrate with OpenTelemetry, GCP Cloud Logging amd Monitoring, AWS Cloud Watch, FluenD, LogD, etc"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Structured Cloud Logging (Priority: P1)

As a DevOps Engineer, I want application logs to be output in structured JSON format with correlated trace IDs so that I can efficiently query and debug issues in observability tools (GCP, AWS, etc.).

**Why this priority**: Essential for production observability and debugging in distributed systems.

**Independent Test**: Configure the server to run in "production" mode (e.g., via env var) and verify that logs are emitted as single-line JSON objects containing `trace_id` and standard fields (level, msg, time).

**Acceptance Scenarios**:

1. **Given** the application is running with `TA_SERVER_ENV=production`, **When** a request is processed, **Then** all logs MUST be in JSON format.
2. **Given** a request with an existing trace context, **When** the application logs an event, **Then** the log entry MUST include the correct `trace_id` and `span_id`.

---

### User Story 2 - Human-Readable Dev Logging (Priority: P2)

As a Developer, I want logs to be human-readable text when running locally so that I can easily read and understand application behavior during development.

**Why this priority**: Improves developer experience and productivity.

**Independent Test**: Run the server locally (default or `TA_SERVER_DEBUG=true`) and verify logs are colored/text-formatted, not JSON.

**Acceptance Scenarios**:

1. **Given** the application is running locally (default config), **When** startup occurs, **Then** logs MUST be in text format (e.g., `time=... level=INFO msg=...`).

---

### User Story 3 - Unified Component Logging (Priority: P3)

As a Developer, I want a consistent logging interface across all modules (Portfolio, Watchlist) so that I don't have to manage different logger types or proprietary interfaces.

**Why this priority**: Reduces maintenance burden and cognitive load.

**Independent Test**: Verify that `modules/watchlist` and `modules/portfolio` accept `*slog.Logger` (or similar interface) and that their logs respect the global configuration.

**Acceptance Scenarios**:

1. **Given** global logging is set to DEBUG, **When** a service module logs a debug message, **Then** it MUST appear in the output.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST use Go's standard `log/slog` package for all logging.
- **FR-002**: System MUST support configurable log handlers: JSON (for machine consumption) and Text (for humans).
- **FR-003**: System MUST configure log level via `TA_SERVER_LOG_LEVEL` (values: `DEBUG`, `INFO`, `WARN`, `ERROR`, default: `INFO`). The existing `--debug` flag is deprecated.
- **FR-004**: System MUST automatically configure the log handler based on environment variables (e.g., `TA_SERVER_LOG_FORMAT=json|text` or implicit env detection).
- **FR-005**: System MUST include OpenTelemetry trace and span IDs in log records when a trace context is present.
- **FR-006**: All internal modules (Watchlist, Portfolio) MUST be refactored to use `*slog.Logger` instead of `*log.Logger` or custom interfaces.
- **FR-007**: HTTP Middleware MUST inject a request-scoped logger into the context that includes `trace_id`, `span_id`, and other request metadata (method, path).
- **FR-008**: System MUST write all logs to `stdout` (or `stderr` for errors) to allow collection by external agents (12-Factor App compliance). Direct integration with cloud logging SDKs is explicitly out of scope.
- **FR-009**: JSON logs MUST use GCP-compliant keys (`severity`, `logging.googleapis.com/trace`, `logging.googleapis.com/spanId`, `message`) to ensure correct rendering in Google Cloud Logging while maintaining OTel correlation.

## Clarifications

### Session 2025-12-31

- Q: Should we replace the binary `--debug` flag with a standard log-level configuration? -> A: **Full Level Support** (Use `TA_SERVER_LOG_LEVEL` with debug/info/warn/error; deprecate `--debug`).
- Q: How should logs be exported to external systems (CloudWatch, GCP, etc.)? -> A: **Stdout/Stderr** (Write to standard output; rely on external agents like FluentD/OTel Collector to forward logs).
- Q: What JSON schema should be used for cloud compatibility? -> A: **GCP/OTel Hybrid** (Remap keys for GCP compatibility while keeping standard structure).

### Key Entities *(include if feature involves data)*

- **Logger**: A configured `*slog.Logger` instance.
- **LogRecord**: A structured log entry containing time, level, message, and attributes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of application logs are emitted via `slog` (no direct `fmt.Print` or `stdlog` output).
- **SC-002**: Logs ingested by observability tools (simulated or actual) contain valid `trace_id` fields for >99% of traced requests.
- **SC-003**: Switching between JSON and Text logging requires only a configuration change (no code change).

## Assumptions

- We are using Go 1.21 or higher (which includes `log/slog`).
- OpenTelemetry SDK is or will be configured in the application (integration point exists).
- `goa.design/clue` usage for logging can be replaced or adapted.
