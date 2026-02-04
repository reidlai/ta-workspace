# Quickstart: specific ResServer

**Branch**: `014-you-help-copy`

## Prerequisites
- Docker & Docker Compose (for NATS JetStream)
- Go 1.24+

## Running the Server
(Assuming `apps/rest-server` has been renamed to `apps/go-server`)

1. **Build**:
   ```bash
   moon run go-server:build
   ```

2. **Start RES Gateway**:
   ```bash
   go run apps/go-server/main.go res-server start --nats-url nats://localhost:4222
   ```

3. **Verify Connection**:
   Check logs for: `INFO "Connected to NATS"`

## Testing Resources

Using `nats-cli`:

1. **Get Watchlist**:
   ```bash
   nats req 'get.inventory.watchlist.default' ''
   ```

2. **Call Method**:
   ```bash
   nats req 'call.inventory.watchlist.create' '{"name": "My List"}'
   ```
