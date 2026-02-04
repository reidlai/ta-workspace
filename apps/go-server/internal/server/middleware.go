package server

import (
	"context"
	"log/slog"

	"github.com/jirenius/go-res"
)

// Middleware constants
type contextKey string

const (
	SessionKey contextKey = "session_id"
)

// GetContext creates a context from the RES request, extracting session/token data
func GetContext(r interface{}) context.Context {
	ctx := context.Background()

	// Define temporary interface for Token parsing
	type TokenParser interface {
		ParseToken(interface{})
	}

	// Assert
	if tr, ok := r.(TokenParser); ok {
		var token map[string]interface{}
		tr.ParseToken(&token)
		if token != nil {
			ctx = context.WithValue(ctx, SessionKey, token)
		}
	}

	return ctx
}

// ResMiddleware represents a function that wraps a RES handler (Legacy placeholder)
type ResMiddleware func(next res.Handler) res.Handler

// SessionMiddleware extracts session data (Placeholder for T019)
func SessionMiddleware(logger *slog.Logger) func(res.Request) {
	return func(r res.Request) {
		// No-op for now, using GetContext pattern
	}
}

// ContextWithLogger adds logger to context
func ContextWithLogger(ctx context.Context, logger *slog.Logger) context.Context {
	// context key implementation in Polish phase
	return ctx
}
