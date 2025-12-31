package cmd

import (
	"context"
	"fmt"
	stdlog "log"
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
	"goa.design/clue/log"
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
	apiServerCmd.Flags().Bool("debug", false, "Enable debug logging")
	apiServerCmd.Flags().Bool("secure", false, "Use HTTPS scheme")

	// Bind flags to Viper
	viper.BindPFlag("api-server.host", apiServerCmd.Flags().Lookup("host"))
	viper.BindPFlag("api-server.port", apiServerCmd.Flags().Lookup("port"))
	viper.BindPFlag("api-server.debug", apiServerCmd.Flags().Lookup("debug"))
	viper.BindPFlag("api-server.secure", apiServerCmd.Flags().Lookup("secure"))

	// Environment variable binding
	viper.SetEnvPrefix("TA_SERVER")
	viper.AutomaticEnv()
}

func runAPIServer(cmd *cobra.Command, args []string) error {
	host := viper.GetString("api-server.host")
	port := viper.GetInt("api-server.port")
	dbg := viper.GetBool("api-server.debug")
	secure := viper.GetBool("api-server.secure")

	// Setup logger
	format := log.FormatJSON
	if log.IsTerminal() {
		format = log.FormatTerminal
	}
	ctx := log.Context(context.Background(), log.WithFormat(format))
	if dbg {
		ctx = log.Context(ctx, log.WithDebug())
		log.Debugf(ctx, "debug logs enabled")
	}
	log.Print(ctx, log.KV{K: "host", V: host}, log.KV{K: "port", V: port})

	// Initialize the services
	// SOLID: Single Responsibility Principle (SRP)
	// This main function acts as the "Composition Root". Its sole responsibility is "wiring" dependencies.
	// It constructs the object graph (Services -> Endpoints -> Server) but contains no business or transport logic.
	var (
		watchlistSvc watchlistGen.Service
		portfolioSvc portfolioGen.Service
	)
	{
		stdLogger := stdlog.New(os.Stderr, "[ta-server] ", stdlog.LstdFlags)
		// Services are instantiated here as pure dependencies, unaware of HTTP/Chi.
		watchlistSvc = watchlist.NewWatchlist(stdLogger)
		portfolioSvc = portfolio.NewPortfolio(stdLogger)
	}

	// Wrap the services in endpoints
	// SOLID: Dependency Inversion Principle (DIP) & Interface Segregation Principle (ISP)
	// The generated Endpoints rely on the service interfaces (e.g. watchlistGen.Service), not concrete types.
	// This allows us to inject any implementation (real, mock, decorator) that satisfies the interface.
	var (
		watchlistEndpoints *watchlistGen.Endpoints
		portfolioEndpoints *portfolioGen.Endpoints
	)
	{
		watchlistEndpoints = watchlistGen.NewEndpoints(watchlistSvc)
		watchlistEndpoints.Use(debug.LogPayloads())
		watchlistEndpoints.Use(log.Endpoint)
		portfolioEndpoints = portfolioGen.NewEndpoints(portfolioSvc)
		portfolioEndpoints.Use(debug.LogPayloads())
		portfolioEndpoints.Use(log.Endpoint)
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
	ctx, cancel := context.WithCancel(ctx)

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
	// SOLID: Open/Closed Principle (OCP)
	// The internal/server/http.go implementation uses a Chi router (mux) that allows
	// multiple independent modules to be "mounted". We can extend the system with a new module
	// just by passing a new endpoint set here, without rewriting the core transport logic handling.
	server.HandleHTTPServer(ctx, u, watchlistEndpoints, portfolioEndpoints, &wg, errc, dbg)

	// Wait for signal
	log.Printf(ctx, "exiting (%v)", <-errc)

	// Send cancellation signal
	cancel()

	wg.Wait()
	log.Printf(ctx, "exited")
	return nil
}
