package server

import (
	"context"
	"fmt"
	"log/slog"
	"net"
	"net/url"
	"os"
	"os/signal"
	"sync"
	"syscall"

	"github.com/reidlai/ta-workspace/apps/ta-server/internal/di"
)

// Run initializes and starts the API server.
func Run(ctx context.Context, cfg Config) error {
	// Setup Slog
	var level slog.Level
	switch cfg.LogLevel {
	case "DEBUG":
		level = slog.LevelDebug
	case "WARN":
		level = slog.LevelWarn
	case "ERROR":
		level = slog.LevelError
	default:
		level = slog.LevelInfo
	}

	if cfg.Debug {
		level = slog.LevelDebug
	}

	var handler slog.Handler
	opts := &slog.HandlerOptions{
		Level: level,
		ReplaceAttr: func(groups []string, a slog.Attr) slog.Attr {
			// GCP Mapping
			if a.Key == slog.LevelKey {
				a.Key = "severity"
			}
			if a.Key == slog.MessageKey {
				a.Key = "message"
			}
			if a.Key == "trace_id" {
				a.Key = "logging.googleapis.com/trace"
			}
			if a.Key == "span_id" {
				a.Key = "logging.googleapis.com/spanId"
			}
			return a
		},
	}

	if cfg.LogFormat == "json" {
		handler = slog.NewJSONHandler(os.Stdout, opts)
	} else {
		handler = slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: level})
	}

	logger := slog.New(handler)
	slog.SetDefault(logger)

	logger.InfoContext(ctx, "Logger initialized",
		"level", level.String(),
		"format", cfg.LogFormat,
	)

	// Initialize services via DI container
	services := di.NewServices(logger)
	watchlistEndpoints := services.WatchlistEndpoints
	portfolioEndpoints := services.PortfolioEndpoints

	// Create channel for signal handling
	errc := make(chan error)

	// Setup interrupt handler
	go func() {
		c := make(chan os.Signal, 1)
		signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
		errc <- fmt.Errorf("%s", <-c)
	}()

	var wg sync.WaitGroup
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

	// Start HTTP server
	HandleHTTPServer(ctx, u, watchlistEndpoints, portfolioEndpoints, &wg, errc, logger, cfg.Debug)

	// Wait for signal
	logger.InfoContext(ctx, "exiting", "signal", <-errc)

	// Send cancellation signal
	cancel()

	wg.Wait()
	logger.InfoContext(ctx, "exited")
	return nil
}
