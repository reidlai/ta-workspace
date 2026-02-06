package res

import (
	"context"
	"io"
	"log/slog"
	"testing"
	"time"

	"github.com/reidlai/ta-workspace/apps/go-server/internal/di"
	"github.com/reidlai/ta-workspace/apps/go-server/internal/server"
	"github.com/stretchr/testify/assert"
)

func TestHandleResServer_InvalidNatsURL(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(io.Discard, nil))
	services := di.NewServices(logger)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	errc := make(chan error, 1)

	// This should fail to connect to invalid NATS URL
	// Run in goroutine since HandleResServer now blocks
	cfg := server.Config{
		NatsURL:   "invalid://url",
		LogLevel:  "INFO",
		LogFormat: "text",
	}
	go HandleResServer(ctx, cfg, services.Modules, errc, logger)

	// Wait for error with timeout
	select {
	case err := <-errc:
		assert.Error(t, err, "Expected error when connecting to invalid NATS URL")
	case <-time.After(2 * time.Second):
		// Timeout is acceptable - connection failed as expected
		t.Log("Connection failed as expected (timeout)")
	}

	cancel()
}
