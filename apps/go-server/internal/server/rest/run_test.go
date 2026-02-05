package rest

import (
	"context"
	"testing"
	"time"

	"github.com/reidlai/ta-workspace/apps/go-server/internal/server"
	"github.com/stretchr/testify/assert"
)

func TestRun_CancelledContext(t *testing.T) {
	cfg := server.Config{
		Host:      "localhost",
		Port:      0, // Random port
		LogLevel:  "INFO",
		LogFormat: "text",
	}

	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()

	// This should initialize then exit when context is cancelled
	err := Run(ctx, cfg)
	assert.NoError(t, err, "expected no error on cancelled context")
}
