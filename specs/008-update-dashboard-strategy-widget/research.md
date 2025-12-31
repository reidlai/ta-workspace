# Research: Update Dashboard Strategy Widget

**Feature**: 008-update-dashboard-strategy-widget  
**Date**: 2025-12-30  
**Phase**: 0 (Outline & Research)

## Purpose

This document captures research findings and architectural decisions for implementing the Dashboard Strategy Widget update, including significant module restructuring to improve code organization and maintainability.

## Research Areas

### 1. ShadCN UI Card Component Integration

**Decision**: Use existing ShadCN Card components from `apps/sv-appshell/src/lib/components/ui/card/`

**Rationale**:
- ShadCN components are already integrated into the project
- Provides consistent design language across the application
- Supports Tailwind CSS container queries (`@container`) out of the box
- Component API matches user-provided example exactly

**Alternatives Considered**:
- Custom card component: Rejected due to duplication of effort and inconsistent styling
- Third-party UI library: Rejected to avoid additional dependencies

**Implementation Notes**:
- Import from `$lib/components/ui/card`
- Use `Card.Root`, `Card.Header`, `Card.Title`, `Card.Description`, `Card.Action`, `Card.Footer`
- Maintain `@container/card` class for responsive typography

---

### 2. Module Architecture: Pages Subfolder Pattern

**Decision**: Organize routable page components in `modules/{module}/svelte/src/pages/`

**Rationale**:
- Clear separation between widgets (dashboard gadgets) and pages (full routes)
- Widgets are reusable components; pages are route-specific
- Improves discoverability: developers know where to find routable components
- Scales better as modules grow (prevents `src/` from becoming cluttered)

**Alternatives Considered**:
- Flat `src/` structure: Rejected due to poor scalability and unclear component purpose
- `routes/` subfolder: Rejected to avoid confusion with SvelteKit's `routes/` convention

**Affected Modules**:
- `modules/portfolio/svelte/src/pages/PortfolioPage.svelte` (new)
- `modules/demo/svelte/src/pages/DemoPage.svelte` (move from `src/`)

**Registration Pattern**:
```typescript
// modules/portfolio/svelte/src/index.ts
import InsightsPage from './pages/InsightsPage.svelte';

const bundle: IModuleBundle = {
  id: 'insights-module',
  routes: [
    { path: '/insights', component: InsightsPage }
  ],
  widgets: [/* existing widgets */]
};
```

---

### 3. Backend Architecture: Module-Specific Goa Design

**Decision**: Move Goa design files to `modules/{module}/go/design/` and services to `modules/{module}/go/pkg/`

**Rationale**:
- **Modularity**: Each module owns its API contract (design) and implementation (service)
- **Encapsulation**: Reduces coupling between modules; easier to extract as microservices later
- **Discoverability**: Developers working on a module find all related code in one place
- **Consistency**: Aligns with polyglot module structure (`svelte/`, `ts/`, `go/`)

**Alternatives Considered**:
- Centralized `apps/ta-server/design/`: Rejected due to tight coupling and poor module boundaries
- Monolithic service layer: Rejected for same reasons

**Affected Modules**:
- `modules/portfolio/go/design/portfolio.go` (move from `apps/ta-server/design/`)
- `modules/portfolio/go/pkg/portfolio_service.go` (move from `modules/portfolio/go/`)
- `modules/watchlist/go/design/{watchlist,exchange}.go` (move from `apps/ta-server/design/`)
- `modules/watchlist/go/pkg/{watchlist,exchange}_service.go` (move from `modules/watchlist/go/`)

**Goa Regeneration**:
After moving design files, run:
```bash
cd apps/ta-server
goa gen github.com/reidlai/ta-workspace/modules/portfolio/go/design
goa gen github.com/reidlai/ta-workspace/modules/watchlist/go/design
```

**Import Path Updates**:
- `apps/ta-server/cmd/api-server.go`: Update service imports to new `pkg/` locations
- `apps/ta-server/internal/server/http.go`: Update endpoint imports

---

### 4. ReactiveX (RxJS) for TypeScript Services

**Decision**: Ensure all `modules/**/ts/src/services/` use RxJS `BehaviorSubject` for state management

**Rationale**:
- **Reactive State**: Automatically propagates API changes to all subscribers (Svelte components)
- **Svelte Compatibility**: `BehaviorSubject` with custom `subscribe()` method works seamlessly with Svelte's `$` auto-subscription
- **Consistency**: All services follow the same pattern (already implemented in `InsightsService` and `WatchlistService`)

**Alternatives Considered**:
- Svelte stores: Rejected to keep services framework-agnostic (enables reuse in React, Vue, etc.)
- Manual state management: Rejected due to boilerplate and error-prone synchronization

**Pattern Verification**:
```typescript
// Existing pattern (already compliant)
export class InsightsService {
  private _insights$ = new BehaviorSubject<Record<string, Insight>>({});
  public readonly insights$ = this._insights$.asObservable();
  
  public subscribe(run: (value: Record<string, Insight>) => void): () => void {
    const subscription = this._insights$.subscribe(run);
    return () => subscription.unsubscribe();
  }
  
  public async refresh(): Promise<void> {
    const data = await fetch('/api/insights');
    this._insights$.next(data);
  }
}
```

**Action**: Audit `WatchlistService` to confirm compliance (likely already correct based on codebase patterns).

---

### 5. Mock Data for Portfolio Valuation

**Decision**: Hardcode mock valuation data in `StrategySummaryWidget` component

**Rationale**:
- Backend does not currently support portfolio valuation API
- Spec explicitly states "mock data for MVP" (FR-003)
- Allows frontend development to proceed independently
- Easy to replace with real API call when backend is ready

**Mock Data Structure**:
```typescript
const mockValuation = {
  balance: "$1,250.00",
  trend: "+12.5%",
  trendDirection: "up" as const
};
```

**Future Migration Path**:
When backend supports `/api/portfolio/valuation`:
1. Add `PortfolioService` in `modules/portfolio/ts/src/services/`
2. Replace mock data with `portfolioService.valuation$` subscription
3. Update `StrategySummaryWidget` to use reactive data

---

## Summary

All research areas have clear decisions with documented rationale. No blocking unknowns remain. The architectural changes improve modularity, maintainability, and scalability while maintaining consistency with existing patterns (ReactiveX for state, ShadCN for UI, Moonrepo for builds).

**Next Phase**: Phase 1 (Design & Contracts) - Generate `data-model.md` and update agent context.
