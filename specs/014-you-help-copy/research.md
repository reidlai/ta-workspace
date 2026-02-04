# Research: ResServer Implementation

**Branch**: `014-you-help-copy`
**Date**: 2026-02-04

## Decisions

### RES Protocol Library
**Decision**: Use `github.com/jirenius/go-res`.
**Rationale**: It is the official Go library for Resgate.io services, providing native support for the RES protocol, model/collection handling, and NATS integration.
**Alternatives Considered**: Accessing NATS directly via `nats.go`. Rejected because implementing the full RES protocol specification manually is error-prone and redundant.

### Architecture Strategy
**Decision**: Rename `apps/rest-server` to `apps/go-server` and add RES capability as a subcommand.
**Rationale**: Reduces code duplication by sharing Dependency Injection (`di`), Configuration, and Domain Logic. Simplifies the workspace by having a single "backend application shell" that speaks multiple protocols (REST, RES).
**Alternatives Considered**: Separate `apps/res-server`. Rejected by user (and agreed) to promote reuse and simplicity.

### Dependency Injection
**Decision**: Reuse `apps/go-server/internal/di`.
**Rationale**: The existing container already initializes `Watchlist` and `Portfolio`. We just need to wire these initialized services into the `ResService` (RES handler) just like they are wired into `oa3.Server` (REST handler).

### Middleware for Session/Auth
**Decision**: Implement custom middleware in `internal/server/middleware.go` that inspects RES requests.
**Rationale**: `go-res` supports access control handlers (`Access`). We can use a middleware-like pattern or a centralized Access handler to validate tokens (JWT from upstream) and extract session IDs. This supports the "offline roll-forward" requirement by establishing a consistent session context.
**Alternatives Considered**: Rely solely on Resgate's built-in auth. Rejected because the requirement explicitly mentions "upstream authentication (e.g. Authentik)" and internal session ID extraction for roll-forward.

### Logging
**Decision**: Use `log/slog` (Stdlib).
**Rationale**: Consistent with `rest-server` (recently migrated to `slog`).
**Alternatives Considered**: `zap` or `logrus`. Rejected for consistency and stdlib preference.
