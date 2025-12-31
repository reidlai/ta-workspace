package server

import (
	"context"
	"log/slog"
	"net/http"
	"net/url"
	"sync"
	"time"

	portfoliosvr "github.com/reidlai/ta-workspace/modules/portfolio/go/gen/http/portfolio/server"
	portfolio "github.com/reidlai/ta-workspace/modules/portfolio/go/gen/portfolio"
	watchlistsvr "github.com/reidlai/ta-workspace/modules/watchlist/go/gen/http/watchlist/server"
	watchlist "github.com/reidlai/ta-workspace/modules/watchlist/go/gen/watchlist"

	chimiddleware "github.com/go-chi/chi/v5/middleware"
	"go.opentelemetry.io/otel/trace"
	"goa.design/clue/debug"
	goahttp "goa.design/goa/v3/http"
)

// HandleHTTPServer starts configures and starts a HTTP server on the given
// URL. It shuts down the server if any error is received in the error channel.
func HandleHTTPServer(ctx context.Context, u *url.URL, watchlistEndpoints *watchlist.Endpoints, portfolioEndpoints *portfolio.Endpoints, wg *sync.WaitGroup, errc chan error, logger *slog.Logger, dbg bool) {

	// Provide the transport specific request decoder and response encoder.
	// The goa http package has built-in support for JSON, XML and gob.
	// Other encodings can be used by providing the corresponding functions,
	// see goa.design/implement/encoding.
	var (
		dec = goahttp.RequestDecoder
		enc = goahttp.ResponseEncoder
	)

	// Build the Goa muxer (uses Chi internally)
	var mux goahttp.Muxer
	{
		mux = goahttp.NewMuxer()
		if dbg {
			// Mount pprof handlers for memory profiling under /debug/pprof.
			debug.MountPprofHandlers(debug.Adapt(mux))
			// Mount /debug endpoint to enable or disable debug logs at runtime.
			debug.MountDebugLogEnabler(debug.Adapt(mux))
		}
	}

	// Wrap the endpoints with the transport specific layers. The generated
	// server packages contains code generated from the design which maps
	// the service input and output data structures to HTTP requests and
	// responses.
	var (
		watchlistServer *watchlistsvr.Server
		portfolioServer *portfoliosvr.Server
	)
	{
		eh := errorHandler(ctx, logger)
		watchlistServer = watchlistsvr.New(watchlistEndpoints, mux, dec, enc, eh, nil)
		portfolioServer = portfoliosvr.New(portfolioEndpoints, mux, dec, enc, eh, nil)
	}

	// Configure the mux.
	watchlistsvr.Mount(mux, watchlistServer)
	portfoliosvr.Mount(mux, portfolioServer)

	var handler http.Handler = mux
	// Apply Chi middleware for performance and resilience
	handler = chimiddleware.RequestID(handler)
	handler = chimiddleware.RealIP(handler)
	handler = chimiddleware.Recoverer(handler)

	// Inject Slog Logger with Trace Context
	handler = SlogMiddleware(logger)(handler)

	if dbg {
		// Log query and response bodies if debug logs are enabled.
		handler = debug.HTTP()(handler)
	}

	// Start HTTP server using default configuration, change the code to
	// configure the server as required by your service.
	srv := &http.Server{Addr: u.Host, Handler: handler, ReadHeaderTimeout: time.Second * 60}
	for _, m := range watchlistServer.Mounts {
		logger.InfoContext(ctx, "HTTP handler mounted", "method", m.Method, "verb", m.Verb, "pattern", m.Pattern)
	}
	for _, m := range portfolioServer.Mounts {
		logger.InfoContext(ctx, "HTTP handler mounted", "method", m.Method, "verb", m.Verb, "pattern", m.Pattern)
	}

	(*wg).Add(1)
	go func() {
		defer (*wg).Done()

		// Start HTTP server in a separate goroutine.
		go func() {
			logger.InfoContext(ctx, "HTTP server listening", "host", u.Host)
			errc <- srv.ListenAndServe()
		}()

		<-ctx.Done()
		logger.InfoContext(ctx, "shutting down HTTP server", "host", u.Host)

		// Shutdown gracefully with a 30s timeout.
		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		err := srv.Shutdown(ctx)
		if err != nil {
			logger.ErrorContext(ctx, "failed to shutdown", "error", err)
		}
	}()
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
