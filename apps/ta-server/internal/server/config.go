package server

// Config holds the server configuration.
type Config struct {
	Host      string
	Port      int
	Debug     bool
	LogLevel  string
	LogFormat string
	Secure    bool
}
