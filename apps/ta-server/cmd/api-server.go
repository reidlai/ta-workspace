package cmd

import (
	// Internal Server
	"github.com/reidlai/ta-workspace/apps/ta-server/internal/server"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var apiServerCmd = &cobra.Command{
	Use:   "api-server",
	Short: "Start the REST API server",
	Long:  "Start the Technical Analysis Assistant REST API server (Goa)",
	RunE:  runAPIServer,
}

func init() {
	// Server flags
	apiServerCmd.Flags().String("host", "localhost", "Server host")
	apiServerCmd.Flags().Int("port", 8080, "HTTP port")
	apiServerCmd.Flags().Bool("debug", false, "Enable debug logging (DEPRECATED: use --log-level=DEBUG)")
	apiServerCmd.Flags().String("log-level", "INFO", "Log level: DEBUG, INFO, WARN, ERROR")
	apiServerCmd.Flags().String("log-format", "json", "Log format: json, text")
	apiServerCmd.Flags().Bool("secure", false, "Use HTTPS scheme")

	// Bind flags to Viper
	if err := viper.BindPFlag("api-server.host", apiServerCmd.Flags().Lookup("host")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("api-server.port", apiServerCmd.Flags().Lookup("port")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("api-server.debug", apiServerCmd.Flags().Lookup("debug")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("api-server.log-level", apiServerCmd.Flags().Lookup("log-level")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("api-server.log-format", apiServerCmd.Flags().Lookup("log-format")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("api-server.secure", apiServerCmd.Flags().Lookup("secure")); err != nil {
		panic(err)
	}

	// Environment variable binding
	viper.SetEnvPrefix("TA_SERVER")
	viper.AutomaticEnv()
}

func runAPIServer(cmd *cobra.Command, args []string) error {
	cfg := server.Config{
		Host:      viper.GetString("api-server.host"),
		Port:      viper.GetInt("api-server.port"),
		Debug:     viper.GetBool("api-server.debug"),
		LogLevel:  viper.GetString("api-server.log-level"),
		LogFormat: viper.GetString("api-server.log-format"),
		Secure:    viper.GetBool("api-server.secure"),
	}

	return server.Run(cmd.Context(), cfg)
}
