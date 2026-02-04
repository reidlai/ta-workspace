package di

import (
	"io"
	"log/slog"
	"testing"
)

func TestNewServices(t *testing.T) {
	// Create a simple logger for testing (no I/O)
	logger := slog.New(slog.NewTextHandler(io.Discard, nil))

	services := NewServices(logger)

	if services == nil {
		t.Fatal("NewServices returned nil")
	}

	if services.WatchlistEndpoints == nil {
		t.Error("WatchlistEndpoints is nil")
	}

	if services.PortfolioEndpoints == nil {
		t.Error("PortfolioEndpoints is nil")
	}
}
