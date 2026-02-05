package rest

import (
	"context"
	"fmt"
	"log/slog"
	"net"
	"net/url"
	"os"
	"os/signal"
	"syscall"

	"github.com/reidlai/ta-workspace/apps/go-server/internal/di"
	"github.com/reidlai/ta-workspace/apps/go-server/internal/server"
)

// Run initializes and starts the API server.
func Run(ctx context.Context, cfg server.Config) error {
	// Setup Slog
	logger := server.InitLogger(cfg)
	slog.SetDefault(logger)

	logger.InfoContext(ctx, "Logger initialized",
		"level", cfg.LogLevel,
		"format", cfg.LogFormat,
	)

	// Initialize services via DI container
	services := di.NewServices(logger)

	// Create channel for signal handling
	errc := make(chan error)

	// Setup interrupt handler
	go func() {
		c := make(chan os.Signal, 1)
		signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
		errc <- fmt.Errorf("%s", <-c)
	}()

	// Use the provided context, but also ensure cancellation capability
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	// Build URL
	scheme := "http"
	if cfg.Secure {
		scheme = "https"
	}
	addr := fmt.Sprintf("%s://%s", scheme, net.JoinHostPort(cfg.Host, fmt.Sprintf("%d", cfg.Port)))
	u, err := url.Parse(addr)
	if err != nil {
		return fmt.Errorf("invalid URL %s: %w", addr, err)
	}

	// Start HTTP server (blocks until shutdown)
	go HandleHTTPServer(ctx, u, services.Modules, errc, logger, cfg.Debug)

	// Wait for signal or context cancellation
	select {
	case <-ctx.Done():
		logger.InfoContext(ctx, "context cancelled")
	case err := <-errc:
		logger.InfoContext(ctx, "exiting", "signal", err)
	}

	// Send cancellation signal and wait for HandleHTTPServer to return
	cancel()
	
	logger.InfoContext(ctx, "exited")
	return nil
}
