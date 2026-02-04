package server

import (
	"context"
	"testing"
)

// MockRequest implements the minimal interface needed for GetContext testing
type MockRequest struct {
	token map[string]interface{}
}

func (m *MockRequest) ParseToken(t interface{}) {
	if ptr, ok := t.(*map[string]interface{}); ok {
		*ptr = m.token
	}
}

func TestGetContext(t *testing.T) {
	tests := []struct {
		name      string
		request   interface{}
		wantToken bool
	}{
		{
			name: "Request with token",
			request: &MockRequest{
				token: map[string]interface{}{
					"user_id": "test-user",
					"session": "abc123",
				},
			},
			wantToken: true,
		},
		{
			name: "Request with nil token",
			request: &MockRequest{
				token: nil,
			},
			wantToken: false,
		},
		{
			name:      "Request without ParseToken method",
			request:   struct{}{},
			wantToken: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ctx := GetContext(tt.request)
			if ctx == nil {
				t.Fatal("GetContext returned nil context")
			}

			// Verify context contains token if expected
			token := ctx.Value(SessionKey)
			if tt.wantToken && token == nil {
				t.Error("Expected token in context, got nil")
			}
			if !tt.wantToken && token != nil {
				t.Error("Expected no token in context, got one")
			}
		})
	}
}

func TestContextWithLogger(t *testing.T) {
	ctx := context.Background()
	logger := InitLogger(Config{LogLevel: "INFO", LogFormat: "text"})

	newCtx := ContextWithLogger(ctx, logger)
	if newCtx == nil {
		t.Fatal("ContextWithLogger returned nil")
	}
	// Currently a no-op, but test it doesn't panic
}

func TestSessionMiddleware(t *testing.T) {
	logger := InitLogger(Config{LogLevel: "INFO", LogFormat: "text"})

	middleware := SessionMiddleware(logger)
	if middleware == nil {
		t.Fatal("SessionMiddleware returned nil")
	}

	// The middleware is currently a no-op, so we just verify it exists
	// and doesn't panic when created
}
