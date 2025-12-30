# Data Model: Watchlist & Insights

## Key Entities

### TickerItem
Represents a user's tracked stock.

```json
{
  "symbol": "AAPL",
  "on_hand": true,
  "created_at": "2023-10-27T10:00:00Z"
}
```

### Insight
Represents a generated analysis summary for a ticker.

```json
{
  "symbol": "AAPL",
  "sentiment": "bullish",   // enum: bullish, bearish, neutral
  "summary": "Strong momentum above 200 SMA.",
  "action": "hold"
}
```

## API Contracts (Goa Design Draft)

The Application `taassistant` will expose two Services.

### Service: Watchlist

Base Path: `/watchlist`

| Method | Path | Description | Payload | Response |
|--------|------|-------------|---------|----------|
| GET | `/` | List all tickers for user | (Header: X-User-ID) | `TickerItem[]` |
| POST | `/` | Add ticker | `{ symbol: string, on_hand: boolean }` | `TickerItem` |
| DELETE | `/{symbol}` | Remove ticker | - | 204 No Content |

### Service: Insights

Base Path: `/insights`

| Method | Path | Description | Payload | Response |
|--------|------|-------------|---------|----------|
| GET | `/` | Get insights for current watchlist | (Header: X-User-ID) | `Insight[]` |

## Frontend State Model

### WatchlistService (Svelte Store)
- `tickers`: `Writable<TickerItem[]>`
- `loading`: `Writable<boolean>`
- `add(symbol, onHand)`: calls `POST /api/watchlist` -> updates store
- `remove(symbol)`: calls `DELETE /api/watchlist/{symbol}` -> updates store

### InsightsService (Svelte Store)
- `insights`: `Writable<Record<string, Insight>>` (Map symbol -> insight)
- `refresh()`: calls `GET /api/insights` -> updates store
