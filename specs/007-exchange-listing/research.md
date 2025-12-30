# Research: ISO 10383 MIC Listing

## Decisions

### CSV Encoding Handling
- **Decision**: Use `golang.org/x/text/encoding/charmap` to decode `ISO-8859-1`.
- **Rationale**: The official ISO MIC CSV is encoded in ISO-8859-1. Go's standard `encoding/csv` expects UTF-8. A wrapper reader using `charmap.ISO8859_1.NewDecoder()` will ensure correct parsing.
- **Alternatives**: Manually converting the file to UTF-8 before bundling (rejected to keep the "true source" as close to original as possible).

### Goa Security Implementation
- **Decision**: Define a `JWT` or `APIKey` security scheme in the Goa DSL but leave the implementation empty or as a `Pass-through`.
- **Rationale**: User requested that the *intent* of authentication be captured but the *middleware* implementation is deferred.
- **Alternatives**: Public endpoint (rejected by user in Q7).

### Data Loading Strategy
- **Decision**: Implement a `LoadExchanges()` function in the `watchlist` service that is called once in `NewWatchlist()`.
- **Rationale**: Confirmed "Load Once at Startup" for performance.
- **Alternatives**: Lazy loading on first request (rejected for latency consistency).

## Best Practices

### Goa Service Modularization
- The `exchange` service can be part of the `watchlist` Goa service or a separate one.
- **Decision**: Add it to a new `exchange` Goa service within `design/design.go` and implement it in `modules/watchlist/go/exchange.go`.
- This keeps the "List Exchanges" logic separate from "Manage User Watchlist" while staying within the `watchlist` domain.

### Embedding Data
- Use `//go:embed` to include the CSV file in the binary.
基础
