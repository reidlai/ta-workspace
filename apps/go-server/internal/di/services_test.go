package di

import (
	"log/slog"
	"os"
	"testing"
)

func TestNewServices(t *testing.T) {
	// Create a simple logger for testing
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))

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
