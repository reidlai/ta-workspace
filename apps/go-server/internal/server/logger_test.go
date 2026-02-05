package server

import (
	"bytes"
	"encoding/json"
	"log/slog"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestResLogger(t *testing.T) {
	var buf bytes.Buffer
	handler := slog.NewJSONHandler(&buf, &slog.HandlerOptions{Level: slog.LevelDebug})
	logger := slog.New(handler)
	resLogger := &ResLogger{Logger: logger}

	tests := []struct {
		name      string
		logFunc   func()
		wantLevel string
		wantMsg   string
	}{
		{
			name: "Infof",
			logFunc: func() {
				resLogger.Infof("test info %s", "formatted")
			},
			wantLevel: "INFO",
			wantMsg:   "test info formatted",
		},
		{
			name: "Errorf",
			logFunc: func() {
				resLogger.Errorf("test error %d", 404)
			},
			wantLevel: "ERROR",
			wantMsg:   "test error 404",
		},
		{
			name: "Debugf",
			logFunc: func() {
				resLogger.Debugf("test debug %v", true)
			},
			wantLevel: "DEBUG",
			wantMsg:   "test debug true",
		},
		{
			name: "Tracef",
			logFunc: func() {
				resLogger.Tracef("test trace")
			},
			wantLevel: "DEBUG", // Trace is mapped to Debug
			wantMsg:   "test trace",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			buf.Reset()
			tt.logFunc()

			var entry map[string]interface{}
			err := json.Unmarshal(buf.Bytes(), &entry)
			require.NoError(t, err, "failed to unmarshal log entry")

			assert.Equal(t, tt.wantLevel, entry["level"])
			assert.Equal(t, tt.wantMsg, entry["msg"])
		})
	}
}
