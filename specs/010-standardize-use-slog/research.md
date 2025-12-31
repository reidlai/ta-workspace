# Phase 0 Research: Slog Standardization

**Date**: 2025-12-31
**Feature**: Standardize Slog Logging

## Decisions

### 1. `goa.design/clue` Migration
**Decision**: Replace `goa.design/clue/log` middleware and usage with a custom **Slog Middleware** and standard `log/slog` usage.
**Rationale**: 
- `clue/log` has its own API. The goal is to standardize on `slog`.
- Writing a custom middleware allows us full control over `trace_id` injection from OpenTelemetry, complying strictly with FR-007.
- We can easily implement optional "buffering" if needed later (though not strictly required spec).

### 2. GCP & OTel Compatible Slog Handler
**Decision**: Implement a custom `slog.Handler` (or use `ReplaceAttr`) that:
- Remaps standard keys to GCP keys (`level` -> `severity`, `msg` -> `message`).
- Injects `logging.googleapis.com/trace` and `logging.googleapis.com/spanId` from the context (via OTel).
**Rationale**: GCP requires specific keys to correctly visualize logs and trace correlations.

### 3. Trace Context Extraction
**Decision**: Use `go.opentelemetry.io/otel/trace` to extract IDs.
**Snippet**:
```go
span := trace.SpanFromContext(ctx)
if span.SpanContext().IsValid() {
    traceID = span.SpanContext().TraceID().String()
    spanID = span.SpanContext().SpanID().String()
}
```

## Unknowns Resolved

- **Clue Support**: We will bypass Clue's logging to achieve pure Slog standardization.
- **GCP Handler**: Defined requirements for key remapping.
- **Trace Extraction**: Confirmed via `trace.SpanFromContext`.
