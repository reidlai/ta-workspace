package res

import (
	"context"
	"testing"
	"time"

	"github.com/reidlai/ta-workspace/apps/go-server/internal/server"
	"github.com/stretchr/testify/assert"
)

func TestRunRes_MissingNatsURL(t *testing.T) {
	cfg := server.Config{
		NatsURL:   "",
		LogLevel:  "INFO",
		LogFormat: "text",
	}

	ctx := context.Background()
	err := RunRes(ctx, cfg)
	
	assert.Error(t, err, "Expected error when NatsURL is empty")
	assert.Equal(t, "nats-url is required", err.Error())
}

func TestRunRes_CancelledContext(t *testing.T) {
	cfg := server.Config{
		NatsURL:   "nats://localhost:4222",
		LogLevel:  "DEBUG",
		LogFormat: "json",
		Debug:     true,
	}

	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()

	// This will fail to connect or timeout
	err := RunRes(ctx, cfg)
	assert.NoError(t, err, "expected no error on cancelled context (graceful exit)")
}
