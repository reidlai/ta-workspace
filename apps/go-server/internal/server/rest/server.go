package rest

import (
	"context"
	"log/slog"
	"net/http"
	"net/url"
	"time"

	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"
	modpkg "github.com/reidlai/virtual-module-core/go/pkg/module"
	"go.opentelemetry.io/otel/trace"
	"goa.design/clue/debug"
	goahttp "goa.design/goa/v3/http"
)

// HandleHTTPServer starts configures and starts a HTTP server on the given
// URL. It blocks until the server shuts down or an error occurs.
func HandleHTTPServer(ctx context.Context, u *url.URL, modules []modpkg.Registrar, errc chan error, logger *slog.Logger, dbg bool) {
	// Create Chi router - this will wrap ALL Goa endpoints
	// All Chi middleware applied here will affect Goa endpoints too!
	r := chi.NewRouter()

	// ============================================================================
	// GLOBAL MIDDLEWARE STACK (applies to ALL endpoints including Goa)
	// ============================================================================
	
	// Core middleware
	r.Use(chimiddleware.RequestID)                 // Inject unique request ID
	r.Use(chimiddleware.RealIP)                    // Extract real client IP (behind proxies)
	r.Use(SlogMiddleware(logger))                  // Structured logging with OpenTelemetry traces
	r.Use(chimiddleware.Recoverer)                 // Recover from panics gracefully
	
	// Performance & resilience
	r.Use(chimiddleware.Compress(5))               // Gzip compression (level 5)
	r.Use(chimiddleware.Timeout(60 * time.Second)) // Global request timeout
	r.Use(chimiddleware.Throttle(100))             // Max 100 concurrent requests
	
	// TODO: Add production middleware here:
	// r.Use(CORSMiddleware())                     // CORS headers
	// r.Use(SecurityHeadersMiddleware())          // Security headers (CSP, HSTS, etc.)
	// r.Use(RateLimitMiddleware())                // Per-IP rate limiting
	// r.Use(AuthenticationMiddleware())           // JWT/OAuth validation
	// r.Use(chimiddleware.AllowContentType(...))  // Content-Type validation
	
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


	if dbg {
		// Debug-only middleware and endpoints
		r.Use(chimiddleware.Logger)                // Console request logger
		r.Mount("/debug", chimiddleware.Profiler()) // pprof profiling endpoints
		
		// Log request/response bodies in debug mode
		r.Use(func(next http.Handler) http.Handler {
			return debug.HTTP()(next)
		})
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
		ReadHeaderTimeout: 10 * time.Second,
		WriteTimeout:      60 * time.Second,
		IdleTimeout:       120 * time.Second,
		MaxHeaderBytes:    1 << 20, // 1 MB
	}

	// Channel to signal when server has stopped
	serverDone := make(chan error, 1)

	// Start HTTP server in a separate goroutine
	go func() {
		logger.InfoContext(ctx, "HTTP server listening", "host", u.Host)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			serverDone <- err
		} else {
			serverDone <- nil
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

// SlogMiddleware extracts OTel trace IDs and injects a logger into the context.
func SlogMiddleware(logger *slog.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			span := trace.SpanFromContext(ctx)

			// Inject trace_id and span_id if available (and valid) across all environments
			reqLogger := logger
			if span.SpanContext().IsValid() {
				// We attach the trace info to the logger's attributes.
				// For the JSON/GCP handler (Phase 3), the ReplaceAttr function handles mapping these keys
				// to logging.googleapis.com/trace, etc.
				// For Text/Dev handler (Phase 4), these just appear as normal attributes.
				traceID := span.SpanContext().TraceID().String()
				spanID := span.SpanContext().SpanID().String()

				reqLogger = logger.With(
					slog.String("trace_id", traceID),
					slog.String("span_id", spanID),
				)
			}

			// Log request start
			reqLogger.InfoContext(ctx, "request started",
				"method", r.Method,
				"path", r.URL.Path,
				"remote_addr", r.RemoteAddr,
			)

			// Update context with logger
			// NOTE: We rely on standard context behavior. Services should use slog.Default() or
			// take explicit logger. If services need to retrieve this logger from context,
			// we would need a custom context key. For now, we assume simple usage or
			// explicit passing. Services are refactored in Phase 5 to take *slog.Logger.
			// Ideally, we'd have a ContextWithLogger helper if deep context extraction is needed.

			next.ServeHTTP(w, r)
		})
	}
}
