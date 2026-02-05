package server

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestInitLogger(t *testing.T) {
	tests := []struct {
		name     string
		cfg      Config
		wantJSON bool
	}{
		{
			name: "Text format with INFO level",
			cfg: Config{
				LogLevel:  "INFO",
				LogFormat: "text",
				Debug:     false,
			},
			wantJSON: false,
		},
		{
			name: "JSON format with DEBUG level",
			cfg: Config{
				LogLevel:  "DEBUG",
				LogFormat: "json",
				Debug:     false,
			},
			wantJSON: true,
		},
		{
			name: "Debug flag overrides level",
			cfg: Config{
				LogLevel:  "INFO",
				LogFormat: "text",
				Debug:     true,
			},
			wantJSON: false,
		},
		{
			name: "Default to INFO",
			cfg: Config{
				LogLevel:  "",
				LogFormat: "text",
				Debug:     false,
			},
			wantJSON: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			logger := InitLogger(tt.cfg)
			require.NotNil(t, logger, "InitLogger returned nil")
			// Logger is created successfully - we can't easily test internal state
			// but we verify it doesn't panic
		})
	}
}
