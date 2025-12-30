# Quickstart: Watchlist & Insights

## Usage

### 1. Running the Stack

You need both the Frontend and the Backend running.

**Backend (Go)**
```bash
# Terminal 1
go run ./apps/taassistant-api/cmd/taassistant-api
# Listens on :8000 (default)
```

**Frontend (App Shell)**
```bash
# Terminal 2
moon run sv-appshell:dev
# Listens on :5173
# Proxies /api/* -> localhost:8000
```

### 2. Using the API (Curl)

```bash
# Add to Watchlist
curl -X POST http://localhost:5173/api/watchlist \
  -H "X-User-ID: demo-user" \
  -d '{"symbol": "TSLA", "on_hand": true}'

# Get Insights
curl http://localhost:5173/api/insights \
  -H "X-User-ID: demo-user"
```

### 3. Adding the Widget

The widgets are auto-registered by the modules. Ensure `modules.json` is updated:

```json
{
  "id": "watchlist-module",
  "src": "watchlist",
  "enabled": true
},
{
  "id": "insights-module",
  "src": "insights",
  "enabled": true
}
```
