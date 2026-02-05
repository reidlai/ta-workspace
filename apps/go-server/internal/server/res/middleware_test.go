package res

import (
	"context"
	"testing"

	"github.com/reidlai/ta-workspace/apps/go-server/internal/server"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
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
			require.NotNil(t, ctx, "GetContext returned nil context")

			// Verify context contains token if expected
			token := ctx.Value(SessionKey)
			if tt.wantToken {
				assert.NotNil(t, token, "Expected token in context, got nil")
			} else {
				assert.Nil(t, token, "Expected no token in context, got one")
			}
		})
	}
}

func TestContextWithLogger(t *testing.T) {
	ctx := context.Background()
	logger := server.InitLogger(server.Config{LogLevel: "INFO", LogFormat: "text"})

	newCtx := ContextWithLogger(ctx, logger)
	assert.NotNil(t, newCtx, "ContextWithLogger returned nil")
}

func TestSessionMiddleware(t *testing.T) {
	logger := server.InitLogger(server.Config{LogLevel: "INFO", LogFormat: "text"})

	middleware := SessionMiddleware(logger)
	assert.NotNil(t, middleware, "SessionMiddleware returned nil")
}
