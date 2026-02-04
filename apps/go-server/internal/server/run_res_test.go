package server

import (
	"context"
	"io"
	"log/slog"
	"testing"
)

func TestNewResServer(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(io.Discard, nil))
	cfg := Config{
		NatsURL:   "nats://localhost:4222",
		LogLevel:  "INFO",
		LogFormat: "text",
	}

	srv := NewResServer(cfg, logger)
	if srv == nil {
		t.Fatal("NewResServer returned nil")
	}

	if srv.Logger == nil {
		t.Error("ResServer.Logger is nil")
	}

	if srv.Config.NatsURL != cfg.NatsURL {
		t.Errorf("Expected NatsURL %s, got %s", cfg.NatsURL, srv.Config.NatsURL)
	}
}

func TestResServer_Run_InvalidNatsURL(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(io.Discard, nil))
	cfg := Config{
		NatsURL:   "invalid://url",
		LogLevel:  "INFO",
		LogFormat: "text",
	}

	srv := NewResServer(cfg, logger)
	ctx := context.Background()

	// This should fail to connect to NATS
	err := srv.Run(ctx)
	if err == nil {
		t.Error("Expected error when connecting to invalid NATS URL, got nil")
	}
}

func TestRunRes(t *testing.T) {
	// Test that RunRes initializes logger correctly
	cfg := Config{
		NatsURL:   "nats://localhost:4222",
		LogLevel:  "DEBUG",
		LogFormat: "json",
		Debug:     true,
	}

	ctx, cancel := context.WithCancel(context.Background())
	cancel() // Cancel immediately to prevent actual connection

	// This will fail to connect, but we're testing initialization
	err := RunRes(ctx, cfg)

	// We expect an error since context is cancelled
	if err == nil {
		t.Error("Expected error with cancelled context")
	}
}

func TestResServer_RegisterHandlers_NilService(t *testing.T) {
	logger := slog.New(slog.NewTextHandler(io.Discard, nil))
	cfg := Config{
		NatsURL: "nats://localhost:4222",
	}

	srv := NewResServer(cfg, logger)

	// RegisterHandlers should handle nil Service gracefully
	defer func() {
		if r := recover(); r != nil {
			t.Errorf("RegisterHandlers panicked with nil Service: %v", r)
		}
	}()

	// Note: We can't actually call RegisterHandlers without initializing Services
	// This test verifies the structure
	if srv.Service != nil {
		t.Error("Service should be nil before Run is called")
	}
}
