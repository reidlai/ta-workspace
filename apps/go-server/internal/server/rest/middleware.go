package rest

import (
	"log/slog"
	"net/http"
	"strings"

	"go.opentelemetry.io/otel/trace"
)

// CORSMiddleware adds CORS headers for cross-origin requests
// Uncomment in http.go to enable: r.Use(CORSMiddleware())
func CORSMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// TODO: Configure allowed origins based on environment
			origin := r.Header.Get("Origin")
			if origin == "" {
				origin = "*"
			}
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-User-ID")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.Header().Set("Access-Control-Max-Age", "86400")

			// Handle preflight requests
			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}

// SecurityHeadersMiddleware adds security headers to all responses
// Uncomment in http.go to enable: r.Use(SecurityHeadersMiddleware())
func SecurityHeadersMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Prevent clickjacking
			w.Header().Set("X-Frame-Options", "DENY")

			// Prevent MIME sniffing
			w.Header().Set("X-Content-Type-Options", "nosniff")

			// Enable XSS protection
			w.Header().Set("X-XSS-Protection", "1; mode=block")

			// Enforce HTTPS (uncomment in production with HTTPS)
			// w.Header().Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")

			// Content Security Policy (customize for your app)
			// w.Header().Set("Content-Security-Policy", "default-src 'self'")

			// Referrer policy
			w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")

			// Permissions policy
			w.Header().Set("Permissions-Policy", "geolocation=(), microphone=(), camera=()")

			next.ServeHTTP(w, r)
		})
	}
}

// AuthenticationMiddleware validates JWT tokens
// This is a placeholder - implement with your auth provider (Firebase, Auth0, etc.)
// Uncomment in http.go to enable: r.Use(AuthenticationMiddleware())
func AuthenticationMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Extract token from Authorization header
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				http.Error(w, "Missing authorization header", http.StatusUnauthorized)
				return
			}

			// Expected format: "Bearer <token>"
			parts := strings.SplitN(authHeader, " ", 2)
			if len(parts) != 2 || parts[0] != "Bearer" {
				http.Error(w, "Invalid authorization header format", http.StatusUnauthorized)
				return
			}

			token := parts[1]

			// TODO: Validate token with your auth provider
			// Example with Firebase:
			// firebaseToken, err := firebaseAuth.VerifyIDToken(r.Context(), token)
			// if err != nil {
			//     http.Error(w, "Invalid token", http.StatusUnauthorized)
			//     return
			// }

			// TODO: Add user info to context
			// ctx := context.WithValue(r.Context(), "user_id", firebaseToken.UID)
			// r = r.WithContext(ctx)

			_ = token // Placeholder to avoid unused variable error

			next.ServeHTTP(w, r)
		})
	}
}

// RateLimitMiddleware implements per-IP rate limiting
// This is a placeholder - use a proper rate limiter like golang.org/x/time/rate
// Uncomment in http.go to enable: r.Use(RateLimitMiddleware())
func RateLimitMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// TODO: Implement rate limiting
			// Example with redis-based rate limiter:
			// ip := r.RemoteAddr
			// allowed, err := rateLimiter.Allow(ip)
			// if err != nil || !allowed {
			//     http.Error(w, "Rate limit exceeded", http.StatusTooManyRequests)
			//     return
			// }

			next.ServeHTTP(w, r)
		})
	}
}

// RequireAuthMiddleware is a stricter version that requires authentication
// Use this for protected route groups
func RequireAuthMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// TODO: Check if user is authenticated (from context)
			// userID := r.Context().Value("user_id")
			// if userID == nil {
			//     http.Error(w, "Authentication required", http.StatusUnauthorized)
			//     return
			// }

			next.ServeHTTP(w, r)
		})
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
