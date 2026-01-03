# Feature Specification: Watchlist & Strategy Insights Modules

**Feature Branch**: `006-watchlist-insights`
**Created**: 2025-12-29
**Status**: Draft
**Input**: User request for "Watchlist & Holding Module" and "Strategy Insight Module".

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Watchlist & Holdings (Priority: P1)

As a User, I want to see a simple list of my favorite stock tickers ("My Tickers") with an indicator of whether I hold them ("On Hand"), so that I can track my portfolio status at a glance.

**Acceptance Scenarios**:

1. **Given** the app is loaded, **When** I view the dashboard, **Then** I see the "My Tickers" widget.
2. **Given** I have tickers in my registry, **When** I look at the widget, **Then** I see the ticker symbol and a visual badge/icon if `onHand` is true.
3. **Given** I have no tickers, **When** I view the widget, **Then** I see an empty state or "No tickers watched".

### User Story 2 - Strategy Insights (Priority: P2)

As a User, I want to see high-level, actionable advice ("Today's Strategy Summary") for my favorite stocks upon login, so that I can make quick decisions without analyzing raw data.

**Acceptance Scenarios**:

1. **Given** I have favorite stocks, **When** I view the dashboard, **Then** I see the "Today's Strategy Summary" widget.
2. **Given** the widget loads, **When** it iterates my stocks, **Then** it displays a one-sentence recommendation (e.g., "AAPL: Strong Bullish") derived from the analysis agent.

## Clarifications

### Session 2025-12-29

- Q: Persistence Strategy → A: **Backend (Go/Goa)** - Data persists to a new Go application `apps/ta-server` designed with Goa (OpenAPI).
- Q: Auth Strategy → A: **Stubbed (Header)** - Client sends `X-User-ID` header. API uses this for context but performs no validation yet.
- Q: Connectivity → A: **Vite Proxy** - Frontend uses relative `/api` paths; Vite proxies to Backend during dev.

---

## Requirements _(mandatory)_

### Functional Requirements

#### Module 1: Watchlist & Holding (`modules/watchlist`)

- **FR-001**: MUST implement `WatchlistService` to manage a list of tickers + `onHand` (boolean) status.
- **FR-002**: MUST register a "My Tickers" widget.
- **FR-003**: "My Tickers" widget COMPACT size.
- **FR-004**: "My Tickers" widget MUST visual distinguish "On Hand" vs "Watched".
- **FR-005**: MUST persist watchlist data via REST API to `taassistant-api` (Go backend).

#### Module 2: Portfolio (`modules/portfolio`)

- **FR-006**: MUST implement `PortfolioService` (or similar) to provide portfolio recommendations.
- **FR-007**: MUST register "Today's Strategy Summary" widget.
- **FR-008**: "Today's Strategy Summary" widget MEDIUM/LARGE size.
- **FR-009**: Widget MUST appear prominently on "dashboard" location (registered with `location: 'dashboard'`).
- **FR-010**: Recommendations MUST be text-based one-sentence summaries retrieved from `ta-server`.

#### Application: Technical Analysis API (`apps/ta-server`)

- **FR-011**: MUST be a Go application using Goa design framework.
- **FR-012**: MUST expose endpoints for Watchlist management (CRUD).
- **FR-013**: MUST expose endpoints for Strategy Insights (Read-only).
- **FR-014**: MUST accept `X-User-ID` header to scope operations (Stubbed Auth).

#### App Shell Integration (`apps/sv-appshell`)

- **FR-015**: MUST configure Vite Proxy to forward `/api` requests to `ta-server` (Default port 8080).

### Key Entities

- **TickerItem**: `{ symbol: string, onHand: boolean }`
- **Recommendation**: `{ symbol: string, sentiment: 'Bullish'|'Bearish'|'Neutral', action: string }`

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Both widgets appear on the dashboard when modules are enabled.
- **SC-002**: `WatchlistService` state is persistent during session (in-memory is acceptable for MVP).
- **SC-003**: Insights widget correctly correlates with Watchlist items (only shows insights for watched stocks).
