package di

import (
	"io"
	"log/slog"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewServices(t *testing.T) {
	// Create a simple logger for testing (no I/O)
	logger := slog.New(slog.NewTextHandler(io.Discard, nil))

	services := NewServices(logger)

	require.NotNil(t, services, "NewServices should not return nil")
	assert.NotEmpty(t, services.Modules, "No modules registered")

	// Verify we have the expected modules
	moduleNames := make([]string, len(services.Modules))
	for i, mod := range services.Modules {
		moduleNames[i] = mod.Name()
	}

	assert.Contains(t, moduleNames, "watchlist")
	assert.Contains(t, moduleNames, "portfolio")
}
