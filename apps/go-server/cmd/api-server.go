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
	startCmd.Flags().String("host", "", "Server host")
	startCmd.Flags().Int("port", 0, "HTTP port")

	// Bind flags to Viper (using api-server prefix)
	if err := viper.BindPFlag("rest.host", startCmd.Flags().Lookup("host")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("rest.port", startCmd.Flags().Lookup("port")); err != nil {
		panic(err)
	}

	// Set Default values in Viper (instead of Cobra) to allow ENV overrides
	viper.SetDefault("rest.host", "localhost")
	viper.SetDefault("rest.port", 8080)

	// Explicit BindEnv for api-server prefix
	_ = viper.BindEnv("rest.host")
	_ = viper.BindEnv("rest.port")
}

func runAPIServer(cmd *cobra.Command, args []string) error {
	cfg := server.Config{
		Host:      viper.GetString("rest.host"),
		Port:      viper.GetInt("rest.port"),
		Debug:     viper.GetBool("server.debug"),
		LogLevel:  viper.GetString("server.log-level"),
		LogFormat: viper.GetString("server.log-format"),
		Secure:    viper.GetBool("server.secure"),
		TLSCert:   viper.GetString("server.tls-cert"),
		TLSKey:    viper.GetString("server.tls-key"),
	}

	return rest.Run(cmd.Context(), cfg)
}
