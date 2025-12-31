# Quickstart: Slog Logging

## How to Log

We use Go standard `log/slog` for all logging.

### 1. In Request Handlers (HTTP)

Always use the logger from the `context.Context` to ensure **Trace IDs** are included.

```go
// GOOD: Uses context logger (trace_id injected)
slog.InfoContext(ctx, "processing order", "order_id", 123)

// BAD: Uses global logger (no trace_id)
slog.Info("processing order") 
```

### 2. In Services

Inject `*slog.Logger` in your constructor.

```go
type Service struct {
    logger *slog.Logger
}

func NewService(logger *slog.Logger) *Service {
    return &Service{logger: logger}
}

func (s *Service) DoSomething(ctx context.Context) {
    // Prefer Context logging if available
    slog.InfoContext(ctx, "operation started")
    
    // Fallback to struct logger if no context (e.g. background worker)
    s.logger.Info("background job running")
}
```

## Configuration

Control logging via environment variables:

| Variable | Values | Default | Description |
|----------|--------|---------|-------------|
| `TA_SERVER_LOG_LEVEL` | `DEBUG`, `INFO`, `WARN`, `ERROR` | `INFO` | Minimum log severity. |
| `TA_SERVER_LOG_FORMAT`| `json`, `text` | *(Auto)* | `json` in Production key/val, `text` in Dev. |

### Development Example

```bash
# Human-readable text logs
TA_SERVER_LOG_FORMAT=text TA_SERVER_LOG_LEVEL=DEBUG go run . api-server
```

### Production Example

```bash
# GCP-compatible JSON logs
TA_SERVER_LOG_FORMAT=json TA_SERVER_LOG_LEVEL=INFO go run . api-server
```
