package res

import (
	"context"
	"fmt"
	"log/slog"

	"github.com/jirenius/go-res"
	"github.com/nats-io/nats.go"
	"github.com/reidlai/ta-workspace/apps/go-server/internal/server"
	modpkg "github.com/reidlai/virtual-module-core/go/pkg/module"
)

// HandleResServer starts, configures and starts a RES server on the given configuration.
// It blocks until the server shuts down or an error occurs.
func HandleResServer(ctx context.Context, cfg server.Config, modules []modpkg.Registrar, errc chan error, logger *slog.Logger) {
	// Setup NATS options
	var opts []nats.Option
	if cfg.Secure {
		opts = append(opts, nats.Secure())
		if cfg.TLSCert != "" && cfg.TLSKey != "" {
			opts = append(opts, nats.ClientCert(cfg.TLSCert, cfg.TLSKey))
		}
	}

	// Connect to NATS
	conn, err := nats.Connect(cfg.NatsURL, opts...)
	if err != nil {
		errc <- fmt.Errorf("failed to connect to nats: %w", err)
		return
	}
	defer conn.Close()

	logger.InfoContext(ctx, "Connected to NATS",
		"url", cfg.NatsURL,
		"secure", cfg.Secure,
		"has_cert", cfg.TLSCert != "",
	)

	// Create RES Service
	resSvc := res.NewService("technical-analysis")
	resSvc.SetLogger(&server.ResLogger{Logger: logger})

	// Register RES modules (optional - only if module implements RESRegistrar)
	for _, mod := range modules {
		if resReg, ok := mod.(modpkg.RESRegistrar); ok {
			logger.InfoContext(ctx, "Registering RES module", "module", mod.Name())
			resReg.RegisterRES(resSvc)
		}
	}

	// Channel to signal when serving is done
	serveDone := make(chan error, 1)

	// Start serving
	go func() {
		logger.InfoContext(ctx, "RES server listening", "service", "technical-analysis")

		if err := resSvc.Serve(conn); err != nil {
			logger.ErrorContext(ctx, "RES server error", "error", err)
			serveDone <- err
		} else {
			serveDone <- nil
		}
	}()

	// Wait for shutdown signal or serve error
	select {
	case <-ctx.Done():
		logger.InfoContext(ctx, "Shutting down RES server")
		if err := resSvc.Shutdown(); err != nil {
			logger.ErrorContext(ctx, "Error shutting down RES server", "error", err)
		}
		// Wait for serve to finish
		<-serveDone
	case err := <-serveDone:
		if err != nil {
			errc <- err
		}
	}
}
