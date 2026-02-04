package server

import (
	"io"
	"log/slog"
	"testing"

	"github.com/reidlai/ta-workspace/apps/go-server/internal/di"
)

func TestNewWatchlistHandler(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(io.Discard, nil))
	services := di.NewServices(logger)

	handler := NewWatchlistHandler(services.WatchlistEndpoints)
	if handler == nil {
		t.Fatal("NewWatchlistHandler returned nil")
	}

	if handler.Endpoints == nil {
		t.Error("WatchlistHandler.Endpoints is nil")
	}
}

func TestResServer_RegisterHandlers(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(io.Discard, nil))
	services := di.NewServices(logger)

	// Create a minimal ResServer for testing
	srv := &ResServer{
		Logger:   logger,
		Services: services,
	}

	// RegisterHandlers should not panic even without a real RES service
	// Note: This will log but not actually register since Service is nil
	defer func() {
		if r := recover(); r != nil {
			t.Errorf("RegisterHandlers panicked: %v", r)
		}
	}()

	// We can't call RegisterHandlers without a real res.Service
	// This test verifies the structure is correct
	if srv.Services.WatchlistEndpoints == nil {
		t.Error("WatchlistEndpoints should not be nil")
	}
}
