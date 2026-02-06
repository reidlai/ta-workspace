package cmd

import (
	"github.com/reidlai/ta-workspace/apps/go-server/internal/server"
	"github.com/reidlai/ta-workspace/apps/go-server/internal/server/res"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var resServerCmd = &cobra.Command{
	Use:   "res-server",
	Short: "Manage the RES protocol server",
	Long:  "Commands to manage the Technical Analysis Assistant RES protocol server",
}

var resStartCmd = &cobra.Command{
	Use:   "start",
	Short: "Start the RES protocol server",
	Long:  "Start the Technical Analysis Assistant RES protocol server (Go-RES)",
	RunE:  runResServer,
}

func init() {
	// Add start subcommand
	resServerCmd.AddCommand(resStartCmd)

	// Server flags
	resStartCmd.Flags().String("res.nats.url", "", "NATS Server URL")

	// Bind flags to Viper (using res-server prefix)
	if err := viper.BindPFlag("res.nats.url", resStartCmd.Flags().Lookup("res.nats.url")); err != nil {
		panic(err)
	}

	// Set Default values in Viper (instead of Cobra) to allow ENV overrides
	viper.SetDefault("res.nats.url", "nats://localhost:4222")

	// Explicit BindEnv for nats-url
	_ = viper.BindEnv("res.nats.url")
}

func runResServer(cmd *cobra.Command, args []string) error {
	cfg := server.Config{
		NatsURL:   viper.GetString("res.nats.url"),
		LogLevel:  viper.GetString("server.log-level"),
		LogFormat: viper.GetString("server.log-format"),
		Debug:     viper.GetBool("server.debug"),
		Secure:    viper.GetBool("server.secure"),
		TLSCert:   viper.GetString("server.tls-cert"),
		TLSKey:    viper.GetString("server.tls-key"),
	}

	return res.RunRes(cmd.Context(), cfg)
}
