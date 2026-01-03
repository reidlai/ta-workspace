# Data Model: Update Dashboard Strategy Widget

**Feature**: 008-update-dashboard-strategy-widget  
**Date**: 2025-12-30  
**Phase**: 1 (Design & Contracts)

## Entities

### Valuation Data (Mock)

**Purpose**: Represents portfolio valuation information displayed in the dashboard widget.

**Attributes**:

- `balance` (string): Formatted currency value (e.g., "$1,250.00")
- `trend` (string): Percentage change indicator (e.g., "+12.5%")
- `trendDirection` ("up" | "down" | "neutral"): Visual indicator for trend direction

**Lifecycle**: Static mock data (hardcoded in component)

**Validation Rules**:

- `balance`: Must be formatted as currency with dollar sign and two decimal places
- `trend`: Must include sign (+/-) and percentage symbol
- `trendDirection`: Must be one of three enum values

**Relationships**: None (standalone entity for MVP)

**State Transitions**: None (read-only for MVP)

**Future Migration**:
When backend implements `/api/portfolio/valuation`:

```typescript
interface PortfolioValuation {
  balance: number; // Raw numeric value
  currency: string; // ISO currency code (e.g., "USD")
  trend: number; // Decimal percentage (e.g., 0.125 for 12.5%)
  trendPeriod: string; // Time period (e.g., "1d", "1w", "1m")
  lastUpdated: string; // ISO 8601 timestamp
}
```

## Notes

This is a minimal data model for MVP. The mock data approach allows frontend development to proceed independently while the backend portfolio valuation API is designed and implemented in a future feature.
