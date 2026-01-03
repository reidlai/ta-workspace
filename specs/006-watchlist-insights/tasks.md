# Implementation Tasks: Watchlist & Strategy Insights Modules

**Feature Branch**: `006-watchlist-insights`
**Total Tasks**: 12

## Implementation Strategy

- **Phase 1**: Setup (Initialize Backend & Frontend Structures)
- **Phase 2**: Foundational (API Design & Proxy)
- **Phase 3**: Watchlist Module (Full Stack)
- **Phase 4**: Insights Module (Full Stack)
- **Phase 5**: Verification

## Phase 1: Setup

- [x] T001 Initialize Go Backend in apps/taassistant-api (go mod init)
- [x] T002 Create Frontend Module Structure for modules/watchlist/svelte
- [x] T003 Create Frontend Module Structure for modules/portfolio/svelte
- [x] T004 Update App Shell modules.json to include new modules

## Phase 2: Foundational

- [x] T005 Define Goa Design in apps/taassistant-api/design/design.go and Generate Code
- [x] T006 Configure Vite Proxy in apps/sv-appshell/vite.config.ts

## Phase 3: Watchlist Module (P1)

**Goal**: Users can see and manage a list of tickers, persisted to the Go backend.

- [x] T007 [US1] Implement Watchlist API Logic in apps/taassistant-api/watchlist.go (In-memory store)
- [x] T008 [US1] Implement WatchlistService in modules/watchlist/svelte/src/WatchlistService.ts
- [x] T009 [US1] Implement "My Tickers" Widget in modules/watchlist/svelte/src/widgets/MyTickersWidget.svelte

## Phase 4: Insights Module (P2)

**Goal**: Users see AI-generated insights for their tickers.

- [x] T010 [US2] Implement Insights API Logic in apps/taassistant-api/insights.go (Mock AI)
- [x] T011 [US2] Implement InsightsService & Widget in svelte

## Phase 5: Verification & Polish

- [x] T012 Verify full stack integration (Backend running, Frontend displaying widgets)
