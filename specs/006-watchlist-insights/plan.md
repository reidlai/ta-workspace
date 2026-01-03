# Implementation Plan: Watchlist & Strategy Insights Modules

**Branch**: `006-watchlist-insights`
**Spec**: [spec.md](./spec.md)

## Summary

Implement two new core modules: `watchlist` (stock tracking) and `insights` (AI recommendations). Both will export widgets for the App Shell dashboard.

## Technical Context

- **Language**: TypeScript 5.x, Svelte 5.
- **Backend**: Go 1.21+ with Goa Design (v3).
- **Architecture**:
  - `modules/watchlist/svelte`: Providers `WatchlistService` (REST Client) and "My Tickers" widget.
  - `modules/portfolio/svelte`: Provides `PortfolioService` (REST Client) and "Portfolio" widget.
  - `apps/taassistant-api`: Polyglot backend service.
- **Dependencies**: `@core/types`, `@core/registry`.

## Constitution Check

- [x] **Branching**: `006-watchlist-insights`
- [x] **Architecture**: Follows `modules/<domain>/<lang>` pattern + `apps/`.

## Project Structure

### New Modules

1. **Watchlist Module** (`modules/watchlist/svelte`)
   - `src/index.ts`: Module entry point (init, registration).
   - `src/WatchlistService.ts`: REST client for `taassistant-api`.
   - `src/widgets/MyTickersWidget.svelte`: UI component.

2. **Portfolio Module** (`modules/portfolio/svelte`)
   - `src/index.ts`: Module entry point (init, registration).
   - `src/PortfolioService.ts`: REST client for `taassistant-api`.
   - `src/widgets/PortfolioWidget.svelte`: UI component.

### New Application

3. **Backend API** (`apps/taassistant-api`)
   - `design/design.go`: Goa DSL defining API and Types.
   - `gen/`: Generated code (Goa).
   - `cmd/taassistant-api/`: Main entry point.

### Changes

- **App Configuration**: Update `apps/sv-appshell/static/modules.json` to include new modules.
- **Vite Config**: Update `apps/sv-appshell/vite.config.ts` to proxy `/api` to Backend (Port 8000/8080).

## Verification Plan

1. **Build**: `moon run watchlist-svelte:build`, `moon run insights-svelte:build`.
2. **Backend**: `go run ./apps/taassistant-api/cmd/taassistant-api`.
3. **Integration**: Run App Shell, verify widgets load and fetch data from API.
4. **Behavior**: Add dummy ticker in code/console, verify Insight widget reflects it.
