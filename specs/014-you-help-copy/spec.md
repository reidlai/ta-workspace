# Feature Specification: ResServer Implementation

**Feature Branch**: `014-you-help-copy`
**Created**: 2026-02-04
**Status**: Draft
**Input**: User description: "Can you help me to copy apps/rest-server to apps/res-server which is based on resgate.io technical stack but stick with SOLID principle and Dependency Injection pattern like apps/rest-server to inject virtual modules architecture like those found in demo, portfolio, watchlist in modules/"

## Clarifications

### Session 2026-02-04
- Q: How should session data be handled? → A: The `res-server` app shell must identify the user session ID to allow the client to roll forward data changes.
- Q: How should authentication and session management be handled? → A: The system must assume authentication is handled upstream (e.g., via Authentik/Gateway) but support injected middleware to validate sessions and extracting credentials to support offline data roll-forward.
- Q: Architecture pivot? → A: Rename `apps/rest-server` to `apps/go-server` and implement `res-server` as a subcommand (`server res-server start`) to reuse existing infrastructure.
- Q: Infrastructure updates? → A: Update `docker-compose.yml` to include NATS JetStream configuration alongside Resgate to support the new `res-server` architecture.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Realtime Service Initialization (Priority: P1)

As a developer, I want to start the `res-server` using the unified `go-server` CLI so that it connects to NATS and exposes the registered virtual modules via the RES protocol.

**Why this priority**: this is the foundation of the feature.

**Independent Test**:
1. Start NATS server.
2. Run `apps/go-server start-res-server` (or similar subcommand).
3. Verify `res-server` connects successfully and logs "Connected to NATS".
4. Verify it registers resources (e.g. sends `system.reset` or similar RES protocol messages).

**Acceptance Scenarios**:

1. **Given** a running NATS server, **When** `apps/go-server` is started with the RES subcommand, **Then** it maintains a persistent connection to NATS.
2. **Given** configured virtual modules (Watchlist, Portfolio), **When** `res-server` starts, **Then** it initializes them via Dependency Injection using the shared `go-server` di container.

---

### User Story 2 - Watchlist Resource Exposure (Priority: P2)

As a client (via Resgate), I want to access Watchlist data via RES protocol so that I can receive realtime updates and have my session identified to roll forward data changes.

**Why this priority**: proves the integration of specific modules and ensures session-aware data handling.

**Independent Test**:
1. Use `res-cli` or `nats-cli` to request `get.watchlist.<id>`.
2. Verify `res-server` responds with the watchlist data.
3. Validate that the system identifies the user session ID during the request.

**Acceptance Scenarios**:

1. **Given** `res-server` is running, **When** a `get` request is sent for a watchlist resource, **Then** the server handles it using the injected Watchlist module.
2. **Given** a client connected with a valid session, **When** accessing resources, **Then** the `res-server` MUST identify the user session ID to enable consistent data views.
3. **Given** an authentication provider (e.g. Authentik), **When** a user connects, **Then** injected middleware MUST validate the token and establish the session context for offline roll-forward support.

---

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The system MUST rename `apps/rest-server` to `apps/go-server` to reflect its multi-protocol nature.
- **FR-002**: The system MUST implement the RES protocol to allow communication with Resgate.io within `apps/go-server`.
- **FR-003**: The system MUST connect to a NATS server using configuration consistent with the environment.
- **FR-004**: The system MUST use Dependency Injection (DI) to inject virtual modules (e.g., Watchlist, Portfolio) into the server, reusing the existing `internal/di` structure.
- **FR-005**: The system MUST expose the capabilities of the injected modules as RES resources.
- **FR-006**: The system MUST implement a new subcommand (e.g., `res-server`) in the CLI to start the RES protocol listener.
- **FR-007**: The system MUST utilize structured logging to ensure observability.
- **FR-008**: The system MUST identify user session IDs from RES protocol requests to support client state consistency (rolling forward changes).
- **FR-009**: The system MUST support injectable middleware to handle authentication context (e.g. from Authentik/OAuth) and enable offline data roll-forward capabilities.
- **FR-010**: The system MUST update the local development environment (`docker-compose.yml`) to include a NATS server configured with JetStream enabled to support the architecture.

### Key Entities

- **ResServer**: The application entry point.
- **ResService**: The NATS/RES protocol handler (replacing HTTP Server).
- **Virtual Modules**: Existing modules (Watchlist, Portfolio) to be adapted/exposed.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: `apps/res-server` builds successfully without errors.
- **SC-002**: `apps/res-server` structure matches `apps/rest-server` (cmd, internal, etc.).
- **SC-003**: Application successfully connects to NATS on startup.
- **SC-004**: Dependency Injection is used to load at least one virtual module (Watchlist) into the RES handler.
