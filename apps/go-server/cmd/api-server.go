package cmd

import (
	// Internal Server
	"github.com/reidlai/ta-workspace/apps/go-server/internal/server"
	"github.com/reidlai/ta-workspace/apps/go-server/internal/server/rest"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

// Subcommand api-server
var apiServerCmd = &cobra.Command{
	Use:   "api-server",
	Short: "Manage the REST API server",
	Long:  "Commands to manage the Technical Analysis Assistant REST API server",
}

// Subcommand start of api-server command
var startCmd = &cobra.Command{
	Use:   "start",
	Short: "Start the REST API server",
	Long:  "Start the Technical Analysis Assistant REST API server (Goa)",
	RunE:  runAPIServer,
}

func init() {
	// Add start subcommand to subcommand api-server
	apiServerCmd.AddCommand(startCmd)

	// Server flags (moved to start subcommand)
	startCmd.Flags().String("host", "", "Server host")
	startCmd.Flags().Int("port", 0, "HTTP port")
	startCmd.Flags().String("read-header-timeout", "", "Read header timeout (e.g. 10s)")
	startCmd.Flags().String("write-timeout", "", "Write timeout (e.g. 60s)")
	startCmd.Flags().String("idle-timeout", "", "Idle timeout (e.g. 120s)")
	startCmd.Flags().Int("max-header-bytes", 0, "Max header bytes")

	// Bind flags to Viper (using api-server prefix)
	if err := viper.BindPFlag("rest.host", startCmd.Flags().Lookup("host")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("rest.port", startCmd.Flags().Lookup("port")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("rest.read-header-timeout", startCmd.Flags().Lookup("read-header-timeout")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("rest.write-timeout", startCmd.Flags().Lookup("write-timeout")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("rest.idle-timeout", startCmd.Flags().Lookup("idle-timeout")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("rest.max-header-bytes", startCmd.Flags().Lookup("max-header-bytes")); err != nil {
		panic(err)
	}

	// Set Default values in Viper (instead of Cobra) to allow ENV overrides
	viper.SetDefault("rest.host", "localhost")
	viper.SetDefault("rest.port", 8080)
	viper.SetDefault("rest.read-header-timeout", "10s")
	viper.SetDefault("rest.write-timeout", "60s")
	viper.SetDefault("rest.idle-timeout", "120s")
	viper.SetDefault("rest.max-header-bytes", 1<<20) // 1 MB

	// Explicit BindEnv for api-server prefix
	_ = viper.BindEnv("rest.host")
	_ = viper.BindEnv("rest.port")
	_ = viper.BindEnv("rest.read-header-timeout")
	_ = viper.BindEnv("rest.write-timeout")
	_ = viper.BindEnv("rest.idle-timeout")
	_ = viper.BindEnv("rest.max-header-bytes")
}

func runAPIServer(cmd *cobra.Command, args []string) error {
	cfg := server.Config{
		Host:              viper.GetString("rest.host"),
		Port:              viper.GetInt("rest.port"),
		Debug:             viper.GetBool("server.debug"),
		LogLevel:          viper.GetString("server.log-level"),
		LogFormat:         viper.GetString("server.log-format"),
		Secure:            viper.GetBool("server.secure"),
		TLSCert:           viper.GetString("server.tls-cert"),
		TLSKey:            viper.GetString("server.tls-key"),
		ReadHeaderTimeout: viper.GetDuration("rest.read-header-timeout"),
		WriteTimeout:      viper.GetDuration("rest.write-timeout"),
		IdleTimeout:       viper.GetDuration("rest.idle-timeout"),
		MaxHeaderBytes:    viper.GetInt("rest.max-header-bytes"),
	}

	return rest.Run(cmd.Context(), cfg)
}
