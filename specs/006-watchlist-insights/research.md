# Research: Watchlist & Strategy Insights

**Status**: Complete
**Method**: Clarification & Architectural Standards

## Decision 1: Backend Architecture

**Context**: We need a backend to persist watchlist data and serve AI insights.
**Decision**: Create a new Go application `apps/taassistant-api` using the Goa (v3) framework.
**Rationale**:

- **User Request**: Explicitly requested Go + Goa.
- **Type Safety**: Goa generates both server and client code, ensuring contract alignment.
- **Performance**: Go is ideal for high-concurrency API handling.
  **Alternatives**:
- _Node.js/Next.js API_: Simpler to keep in one language, but rejected due to user preference/performance goals.

## Decision 2: Connectivity Strategy

**Context**: Connecting SvelteKit Frontend to Go Backend during development.
**Decision**: Use Vite Proxy (`server.proxy`).
**Rationale**:

- **Simplicity**: Frontend makes relative calls to `/api/...`, avoiding CORS (Cross-Origin Resource Sharing) complexities during local dev.
- **Standard**: Standard pattern for Vite-based monorepos.

## Decision 3: Authentication (MVP)

**Context**: We need to associate data with a user, but a full Auth system is out of scope for now.
**Decision**: Stubbed Authentication via `X-User-ID` header.
**Rationale**:

- **Velocity**: allows building the "real" data architecture (User-scoped DB queries) without building Login UI/OIDC integration yet.
- **Future-proof**: Easy to swap the header for a JWT Bearer token later.

## Decision 4: Data Persistence

**Context**: Storing User Watchlists.
**Decision**: In-Memory (Map) for MVP, structured for easy swap to SQL/NoSQL.
**Rationale**:

- **Focus**: Allows focusing on API/Frontend wiring first.
- **Persistence**: "In-Memory" was discussed as Option A (fastest), but user selected "Backend (Go)" which implies persistence. _Correction_: The user confirmed "B" (Backend), so we will implement a file-based or simple in-memory store _in the backend_ to start, or a simple SQLite if needed. Detailed implementation Left to the coding phase, but Interface will be repository pattern.
