package rest

import (
	"net/http"
	"strings"
)

// CORSMiddleware adds CORS headers for cross-origin requests
// Uncomment in http.go to enable: r.Use(CORSMiddleware())
func CORSMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// TODO: Configure allowed origins based on environment
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
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
