package server

// Config holds the server configuration.
import "fmt"

type Config struct {
	Host      string
	Port      int
	Debug     bool
	LogLevel  string
	LogFormat string
	Secure    bool
}

// Validate checks if the configuration is valid.
func (c Config) Validate() error {
	if c.Host == "" {
		return fmt.Errorf("host cannot be empty")
	}
	if c.Port <= 0 || c.Port > 65535 {
		return fmt.Errorf("invalid port: %d", c.Port)
	}
	switch c.LogLevel {
	case "DEBUG", "INFO", "WARN", "ERROR":
		// valid
	default:
		return fmt.Errorf("invalid log level: %s", c.LogLevel)
	}
	return nil
}
