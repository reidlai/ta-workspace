package res

import (
	"context"
	"fmt"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

	"github.com/reidlai/ta-workspace/apps/go-server/internal/di"
	"github.com/reidlai/ta-workspace/apps/go-server/internal/server"
)

// RunRes initializes and starts the RES server (Entrypoint)
func RunRes(ctx context.Context, cfg server.Config) error {
	// Setup Slog
	logger := server.InitLogger(cfg)
	slog.SetDefault(logger)

	logger.InfoContext(ctx, "Logger initialized",
		"level", cfg.LogLevel,
		"format", cfg.LogFormat,
	)

	if cfg.NatsURL == "" {
		return fmt.Errorf("nats-url is required")
	}

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

	// Start RES server (blocks until shutdown)
	go HandleResServer(ctx, cfg.NatsURL, services.Modules, errc, logger)

	// Wait for signal or context cancellation
	select {
	case <-ctx.Done():
		logger.InfoContext(ctx, "context cancelled")
	case err := <-errc:
		logger.InfoContext(ctx, "exiting", "signal", err)
	}

	// Send cancellation signal and wait for HandleResServer to return
	cancel()
	
	logger.InfoContext(ctx, "exited")
	return nil
}
