package server

import (
	"fmt"
	"log/slog"
)

// ResLogger adapts slog.Logger to the logger.Logger interface expected by go-res
type ResLogger struct {
	*slog.Logger
}

// Infof logs info messages
func (l *ResLogger) Infof(format string, v ...interface{}) {
	l.Info(fmt.Sprintf(format, v...))
}

// Errorf logs error messages
func (l *ResLogger) Errorf(format string, v ...interface{}) {
	l.Error(fmt.Sprintf(format, v...))
}

// Debugf logs debug messages
func (l *ResLogger) Debugf(format string, v ...interface{}) {
	l.Debug(fmt.Sprintf(format, v...))
}

// Tracef logs trace messages (mapped to Debug)
func (l *ResLogger) Tracef(format string, v ...interface{}) {
	l.Debug(fmt.Sprintf(format, v...))
}
