# Data Model: MyTickersWidget

## Entities

### Widget State

View-only representation of the watchlist.

| Field             | Type                  | Description               | Source                     |
| ----------------- | --------------------- | ------------------------- | -------------------------- |
| Field             | Type                  | Description               | Source                     |
| -------           | ------                | -------------             | --------                   |
| `tickers`         | `TickerItem[]`        | List of watched tickers   | `watchlistService`         |
| `count`           | `number`              | Total number of tickers   | Derived (`tickers.length`) |
| `exchange_counts` | `Map<string, number>` | Count per unique exchange | Derived (Static Map)       |

### TickerItem (Existing)

Refers to the existing `TickerItem` interface from `modules/watchlist/ts`.

```typescript
interface TickerItem {
  symbol: string;
  on_hand: boolean;
  // ... potentially other fields
}
```

## Relationships

- `MyTickersWidget` subscribes to `watchlistService` to receive `TickerItem[]`.
- `MyTickersWidget` has 0..\* `TickerItem`s.
