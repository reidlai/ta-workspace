package server

import (
	"context"
	"fmt"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

	"github.com/jirenius/go-res"
	"github.com/nats-io/nats.go"
	"github.com/reidlai/ta-workspace/apps/go-server/internal/di"
)

// RunRes initializes and starts the RES server (Entrypoint)
func RunRes(ctx context.Context, cfg Config) error {
	// Setup Slog
	logger := InitLogger(cfg)

	srv := NewResServer(cfg, logger)
	return srv.Run(ctx)
}

// ResServer represents the RES protocol server
type ResServer struct {
	Config   Config
	Logger   *slog.Logger
	Service  *res.Service
	Conn     *nats.Conn
	Services *di.Services
}

// NewResServer creates a new ResServer instance
func NewResServer(cfg Config, logger *slog.Logger) *ResServer {
	return &ResServer{
		Config: cfg,
		Logger: logger,
	}
}

// Run starts the RES server
func (s *ResServer) Run(ctx context.Context) error {
	s.Logger.InfoContext(ctx, "Starting RES Server", "nats_url", s.Config.NatsURL)

	if s.Config.NatsURL == "" {
		return fmt.Errorf("nats-url is required")
	}

	// Connect to NATS
	conn, err := nats.Connect(s.Config.NatsURL)
	if err != nil {
		return fmt.Errorf("failed to connect to nats: %w", err)
	}
	s.Conn = conn
	defer s.Conn.Close()

	s.Logger.InfoContext(ctx, "Connected to NATS")

	// Create RES Service
	s.Service = res.NewService("ta")
	s.Service.SetLogger(&ResLogger{s.Logger})

	// Initialize DI services
	s.Services = di.NewServices(s.Logger)

	// Register Handlers
	s.RegisterHandlers()

	// Create error channel for shutdown signals
	errc := make(chan error, 1)
	go func() {
		c := make(chan os.Signal, 1)
		signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
		errc <- fmt.Errorf("%s", <-c)
	}()

	// Serve in a goroutine
	go func() {
		if err := s.Service.Serve(s.Conn); err != nil {
			errc <- err
		}
	}()

	select {
	case err := <-errc:
		s.Logger.InfoContext(ctx, "Shutting down", "error", err)
		return s.Service.Shutdown()
	case <-ctx.Done():
		s.Logger.InfoContext(ctx, "Context cancelled")
		return s.Service.Shutdown()
	}
}
