package cmd

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

	// Internal Modules
	portfolio "github.com/reidlai/ta-workspace/modules/portfolio/go/pkg"
	watchlist "github.com/reidlai/ta-workspace/modules/watchlist/go/pkg"

	// Generated Interfaces
	portfolioGen "github.com/reidlai/ta-workspace/modules/portfolio/go/gen/portfolio"
	watchlistGen "github.com/reidlai/ta-workspace/modules/watchlist/go/gen/watchlist"

	// Internal Server
	"github.com/reidlai/ta-workspace/apps/ta-server/internal/server"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"goa.design/clue/debug"
)

var apiServerCmd = &cobra.Command{
	Use:   "api-server",
	Short: "Start the REST API server",
	Long:  "Start the Technical Analysis Assistant REST API server (Goa)",
	RunE:  runAPIServer,
}

func init() {
	// Server flags
	apiServerCmd.Flags().String("host", "localhost", "Server host")
	apiServerCmd.Flags().Int("port", 8080, "HTTP port")
	apiServerCmd.Flags().Bool("debug", false, "Enable debug logging (DEPRECATED: use --log-level=DEBUG)")
	apiServerCmd.Flags().String("log-level", "INFO", "Log level: DEBUG, INFO, WARN, ERROR")
	apiServerCmd.Flags().String("log-format", "json", "Log format: json, text")
	apiServerCmd.Flags().Bool("secure", false, "Use HTTPS scheme")

	// Bind flags to Viper
	viper.BindPFlag("api-server.host", apiServerCmd.Flags().Lookup("host"))
	viper.BindPFlag("api-server.port", apiServerCmd.Flags().Lookup("port"))
	viper.BindPFlag("api-server.debug", apiServerCmd.Flags().Lookup("debug"))
	viper.BindPFlag("api-server.log-level", apiServerCmd.Flags().Lookup("log-level"))
	viper.BindPFlag("api-server.log-format", apiServerCmd.Flags().Lookup("log-format"))
	viper.BindPFlag("api-server.secure", apiServerCmd.Flags().Lookup("secure"))

	// Environment variable binding
	viper.SetEnvPrefix("TA_SERVER")
	viper.AutomaticEnv()
}

func runAPIServer(cmd *cobra.Command, args []string) error {
	host := viper.GetString("api-server.host")
	port := viper.GetInt("api-server.port")
	dbg := viper.GetBool("api-server.debug")
	logLevel := viper.GetString("api-server.log-level")
	logFormat := viper.GetString("api-server.log-format")
	secure := viper.GetBool("api-server.secure")

	// Setup Slog
	var level slog.Level
	switch logLevel {
	case "DEBUG":
		level = slog.LevelDebug
	case "WARN":
		level = slog.LevelWarn
	case "ERROR":
		level = slog.LevelError
	default:
		level = slog.LevelInfo
	}

	if dbg {
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

	if logFormat == "json" {
		handler = slog.NewJSONHandler(os.Stdout, opts)
	} else {
		handler = slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: level})
	}

	logger := slog.New(handler)
	slog.SetDefault(logger)

	logger.InfoContext(context.Background(), "Logger initialized",
		"level", level.String(),
		"format", logFormat,
	)

	var (
		watchlistSvc watchlistGen.Service
		portfolioSvc portfolioGen.Service
	)
	{
		watchlistSvc = watchlist.NewWatchlist(logger)
		portfolioSvc = portfolio.NewPortfolio(logger)
	}

	var (
		watchlistEndpoints *watchlistGen.Endpoints
		portfolioEndpoints *portfolioGen.Endpoints
	)
	{
		watchlistEndpoints = watchlistGen.NewEndpoints(watchlistSvc)
		watchlistEndpoints.Use(debug.LogPayloads())
		portfolioEndpoints = portfolioGen.NewEndpoints(portfolioSvc)
		portfolioEndpoints.Use(debug.LogPayloads())
	}

	// Create channel for signal handling
	errc := make(chan error)

	// Setup interrupt handler
	go func() {
		c := make(chan os.Signal, 1)
		signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
		errc <- fmt.Errorf("%s", <-c)
	}()

	var wg sync.WaitGroup
	ctx, cancel := context.WithCancel(context.Background())

	// Build URL
	scheme := "http"
	if secure {
		scheme = "https"
	}
	addr := fmt.Sprintf("%s://%s", scheme, net.JoinHostPort(host, fmt.Sprintf("%d", port)))
	u, err := url.Parse(addr)
	if err != nil {
		return fmt.Errorf("invalid URL %s: %w", addr, err)
	}

	// Start HTTP server
	server.HandleHTTPServer(ctx, u, watchlistEndpoints, portfolioEndpoints, &wg, errc, logger, dbg)

	// Wait for signal
	logger.InfoContext(ctx, "exiting", "signal", <-errc)

	// Send cancellation signal
	cancel()

	wg.Wait()
	logger.InfoContext(ctx, "exited")
	return nil
}
