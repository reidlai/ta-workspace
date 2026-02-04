# RES Protocol Contract: Watchlist

## Resources

### `inventory.watchlist.<id>` (Model)

**Access**:
- `role:user`: Can view if `owner_id` matches.

**Properties**:
- `id` (string): Watchlist ID.
- `name` (string): Display name.
- `tickers` (ref collection): Reference to ticker collection.

### `inventory.watchlist.<id>.tickers` (Collection)

**Access**:
- `role:user`: Can view if `owner_id` matches.

**Items**:
- Reference to `inventory.ticker.<symbol>`

## Methods

### `call.inventory.watchlist.create`
**Params**:
- `name` (string)
- `initial_tickers` ([]string)

**Response**:
- Resource Reference (`inventory.watchlist.<new_id>`)

### `call.inventory.watchlist.<id>.add_ticker`
**Params**:
- `symbol` (string)

**Response**:
- `success` (bool)
