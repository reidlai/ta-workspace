package rest

import (
	"context"
	"log/slog"
	"net/http"
	"net/url"
	"time"

	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/reidlai/ta-workspace/apps/go-server/internal/server"
	modpkg "github.com/reidlai/virtual-module-core/go/pkg/module"
	"goa.design/clue/debug"
	goahttp "goa.design/goa/v3/http"
)

// HandleHTTPServer starts configures and starts a HTTP server on the given
// configuration. It blocks until the server shuts down or an error occurs.
func HandleHTTPServer(ctx context.Context, cfg server.Config, u *url.URL, modules []modpkg.Registrar, errc chan error, logger *slog.Logger) {
	// Create Chi router - this will wrap ALL Goa endpoints
	// All Chi middleware applied here will affect Goa endpoints too!
	r := chi.NewRouter()

	// ============================================================================
	// GLOBAL MIDDLEWARE STACK (applies to ALL endpoints including Goa)
	// ============================================================================

	// Core middleware
	r.Use(chimiddleware.RequestID) // Inject unique request ID
	r.Use(chimiddleware.RealIP)    // Extract real client IP (behind proxies)
	r.Use(SlogMiddleware(logger))  // Structured logging with OpenTelemetry traces
	r.Use(chimiddleware.Recoverer) // Recover from panics gracefully
	r.Use(CORSMiddleware())        // Enable CORS for cross-origin requests

	// Performance & resilience
	r.Use(chimiddleware.Compress(5))               // Gzip compression (level 5)
	r.Use(chimiddleware.Timeout(60 * time.Second)) // Global request timeout
	r.Use(chimiddleware.Throttle(100))             // Max 100 concurrent requests

	// Debug-only middleware (MUST be before any routes)
	if cfg.Debug {
		r.Use(chimiddleware.Logger) // Console request logger
		r.Use(func(next http.Handler) http.Handler {
			return debug.HTTP()(next)
		})
	}

	// ============================================================================
	// PUBLIC ENDPOINTS (no authentication required)
	// ============================================================================

	// Health check endpoint for Docker/Kubernetes
	// Docker HEALTHCHECK: curl -f http://localhost:8080/health || exit 1
	// Kubernetes livenessProbe/readinessProbe: httpGet path=/health port=8080
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"status":"healthy","service":"go-server"}`))
	})

	if cfg.Debug {
		r.Mount("/debug", chimiddleware.Profiler()) // pprof profiling endpoints
	}

	// ============================================================================
	// GOA MODULE REGISTRATION
	// ============================================================================
	// All Goa endpoints will inherit the middleware stack defined above!

	var (
		dec = goahttp.RequestDecoder
		enc = goahttp.ResponseEncoder
	)

	// Goa's NewMuxer() creates a Chi router internally!
	// Goa is built on top of Chi, so this is fully compatible
	goaMux := goahttp.NewMuxer()
	hasGoaModules := false
	eh := errorHandler(ctx, logger)

	for _, mod := range modules {
		if httpReg, ok := mod.(modpkg.HTTPRegistrar); ok {
			hasGoaModules = true
			logger.InfoContext(ctx, "Registering Goa module", "module", mod.Name())
			mounts := httpReg.RegisterHTTP(goaMux, dec, enc, eh)

			for _, m := range mounts {
				logger.InfoContext(ctx, "Goa endpoint mounted",
					"module", mod.Name(),
					"method", m.Method,
					"verb", m.Verb,
					"pattern", m.Pattern)
			}
		}
	}

	// Mount Goa's Chi router under our main Chi router
	// Since both are Chi routers, this is a seamless integration!
	if hasGoaModules {
		r.Mount("/", goaMux)
	}

	// ============================================================================
	// PROTECTED ROUTES (example of route-specific middleware)
	// ============================================================================
	// You can also create route groups with specific middleware:
	// r.Group(func(r chi.Router) {
	//     r.Use(RequireAuthMiddleware())  // Only for this group
	//     r.Mount("/api/admin", adminGoaMux)
	// })

	// Start HTTP server using default configuration
	srv := &http.Server{
		Addr:              u.Host,
		Handler:           r,
		ReadHeaderTimeout: cfg.ReadHeaderTimeout,
		WriteTimeout:      cfg.WriteTimeout,
		IdleTimeout:       cfg.IdleTimeout,
		MaxHeaderBytes:    cfg.MaxHeaderBytes,
	}

	// Channel to signal when server has stopped
	serverDone := make(chan error, 1)

	// Start HTTP server in a separate goroutine
	go func() {
		if cfg.Secure {
			logger.InfoContext(ctx, "HTTPS server listening", "host", u.Host, "cert", cfg.TLSCert)
			if err := srv.ListenAndServeTLS(cfg.TLSCert, cfg.TLSKey); err != nil && err != http.ErrServerClosed {
				serverDone <- err
			} else {
				serverDone <- nil
			}
		} else {
			logger.InfoContext(ctx, "HTTP server listening", "host", u.Host)
			if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
				serverDone <- err
			} else {
				serverDone <- nil
			}
		}
	}()

	// Wait for shutdown signal or server error
	select {
	case <-ctx.Done():
		logger.InfoContext(ctx, "shutting down HTTP server", "host", u.Host)

		// Shutdown gracefully with a 30s timeout
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		if err := srv.Shutdown(shutdownCtx); err != nil {
			logger.ErrorContext(ctx, "failed to shutdown", "error", err)
		}

		// Wait for server to finish
		<-serverDone
	case err := <-serverDone:
		if err != nil {
			errc <- err
		}
	}
}

// errorHandler returns a function that writes and logs the given error.
// The function also writes and logs the error unique ID so that it's possible
// to correlate.
func errorHandler(logCtx context.Context, logger *slog.Logger) func(context.Context, http.ResponseWriter, error) {
	return func(ctx context.Context, w http.ResponseWriter, err error) {
		logger.ErrorContext(ctx, "HTTP Error", "error", err)
	}
}
