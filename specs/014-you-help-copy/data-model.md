# Data Model: ResServer

**Branch**: `014-you-help-copy`

## Entities

### GoServer (`apps/go-server`)
The unified application shell.

**Fields**:
- `Host` (string): Bind address.
- `Port` (int): HTTP Port (for API-Server).
- `NatsURL` (string): NATS connection string (for Res-Server).
- `Logger` (*slog.Logger): Shared logger.

### ResService (`ResService`)
Sub-component responsible for the RES protocol gateway.

**Fields**:
- `Connection` (*nats.Conn): NATS connection.
- `Service` (*res.Service): RES protocol handler.
- `Modules` (Virtual Modules): Reference to injected modules.

### SessionContext (`SessionContext`)
Represents the authenticated user session derived from upstream headers/tokens.

**Fields**:
- `SessionID` (string): Unique session identifier (from Token/RES).
- `UserID` (string): User identifier.
- `Roles` ([]string): User permissions.
- `LastActive` (timestamp): For roll-forward logic.

## Relationships

- `ResServer` HAS-A `ResService` (1:1)
- `ResService` INJECTS `WatchlistModule` (1:1)
- `ResService` INJECTS `PortfolioModule` (1:1)
- `ResService` CREATES `SessionContext` per Request (1:N)

## State Transitions

1. **Startup**: `init` -> `Connect(NATS)` -> `RegisterHandlers` -> `Serve`
2. **Request**: `Access` (Middleware) -> `Authorize` -> `Handler` -> `Response`
