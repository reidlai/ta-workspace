package rest

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

// stubHandler satisfies http.Handler and tracks if it was called
type stubHandler struct {
	called bool
}

func (h *stubHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.called = true
	w.WriteHeader(http.StatusOK)
}

func TestCORSMiddleware(t *testing.T) {
	middleware := CORSMiddleware()

	t.Run("Adds CORS headers to normal request", func(t *testing.T) {
		stub := &stubHandler{}
		handler := middleware(stub)

		req := httptest.NewRequest("GET", "http://example.com/foo", nil)
		w := httptest.NewRecorder()

		handler.ServeHTTP(w, req)

		assert.Equal(t, "*", w.Header().Get("Access-Control-Allow-Origin"))
		assert.True(t, stub.called, "Expected next handler to be called")
	})

	t.Run("Handles OPTIONS preflight request", func(t *testing.T) {
		stub := &stubHandler{}
		handler := middleware(stub)

		req := httptest.NewRequest("OPTIONS", "http://example.com/foo", nil)
		w := httptest.NewRecorder()

		handler.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
		assert.NotEmpty(t, w.Header().Get("Access-Control-Allow-Methods"))
		assert.False(t, stub.called, "Expected next handler NOT to be called for OPTIONS")
	})
}

func TestSecurityHeadersMiddleware(t *testing.T) {
	middleware := SecurityHeadersMiddleware()
	stub := &stubHandler{}
	handler := middleware(stub)

	req := httptest.NewRequest("GET", "/", nil)
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)

	headers := []struct {
		key   string
		value string
	}{
		{"X-Frame-Options", "DENY"},
		{"X-Content-Type-Options", "nosniff"},
		{"X-XSS-Protection", "1; mode=block"},
		{"Referrer-Policy", "strict-origin-when-cross-origin"},
	}

	for _, h := range headers {
		assert.Equal(t, h.value, w.Header().Get(h.key), "Header %s mismatch", h.key)
	}

	assert.True(t, stub.called, "Expected next handler to be called")
}

func TestAuthenticationMiddleware(t *testing.T) {
	middleware := AuthenticationMiddleware()

	t.Run("Fails with missing header", func(t *testing.T) {
		stub := &stubHandler{}
		handler := middleware(stub)

		req := httptest.NewRequest("GET", "/", nil)
		w := httptest.NewRecorder()

		handler.ServeHTTP(w, req)

		assert.Equal(t, http.StatusUnauthorized, w.Code)
		assert.False(t, stub.called, "Expected next handler NOT to be called")
	})

	t.Run("Fails with invalid format", func(t *testing.T) {
		stub := &stubHandler{}
		handler := middleware(stub)

		req := httptest.NewRequest("GET", "/", nil)
		req.Header.Set("Authorization", "InvalidToken123")
		w := httptest.NewRecorder()

		handler.ServeHTTP(w, req)

		assert.Equal(t, http.StatusUnauthorized, w.Code)
		assert.False(t, stub.called, "Expected next handler NOT to be called")
	})

	t.Run("Succeeds with Bearer token", func(t *testing.T) {
		stub := &stubHandler{}
		handler := middleware(stub)

		req := httptest.NewRequest("GET", "/", nil)
		req.Header.Set("Authorization", "Bearer my-stub-token")
		w := httptest.NewRecorder()

		handler.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
		assert.True(t, stub.called, "Expected next handler to be called")
	})
}
