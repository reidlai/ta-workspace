package cmd

import (
	// Internal Server
	"github.com/reidlai/ta-workspace/apps/go-server/internal/server"
	"github.com/reidlai/ta-workspace/apps/go-server/internal/server/rest"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var apiServerCmd = &cobra.Command{
	Use:   "api-server",
	Short: "Manage the REST API server",
	Long:  "Commands to manage the Technical Analysis Assistant REST API server",
}

var startCmd = &cobra.Command{
	Use:   "start",
	Short: "Start the REST API server",
	Long:  "Start the Technical Analysis Assistant REST API server (Goa)",
	RunE:  runAPIServer,
}

func init() {
	// Add start subcommand
	apiServerCmd.AddCommand(startCmd)

	// Server flags (moved to start subcommand)
	startCmd.Flags().String("host", "localhost", "Server host")
	startCmd.Flags().Int("port", 8080, "HTTP port")
	startCmd.Flags().Bool("debug", false, "Enable debug logging (DEPRECATED: use --log-level=DEBUG)")
	startCmd.Flags().String("log-level", "INFO", "Log level: DEBUG, INFO, WARN, ERROR")
	startCmd.Flags().String("log-format", "json", "Log format: json, text")
	startCmd.Flags().Bool("secure", false, "Use HTTPS scheme")

	// Bind flags to Viper (using api-server prefix)
	if err := viper.BindPFlag("api-server.host", startCmd.Flags().Lookup("host")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("api-server.port", startCmd.Flags().Lookup("port")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("api-server.debug", startCmd.Flags().Lookup("debug")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("api-server.log-level", startCmd.Flags().Lookup("log-level")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("api-server.log-format", startCmd.Flags().Lookup("log-format")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("api-server.secure", startCmd.Flags().Lookup("secure")); err != nil {
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

	return rest.Run(cmd.Context(), cfg)
}
