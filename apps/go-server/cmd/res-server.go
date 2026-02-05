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
	resStartCmd.Flags().String("nats-url", "nats://localhost:4222", "NATS Server URL")
	resStartCmd.Flags().String("log-level", "INFO", "Log level: DEBUG, INFO, WARN, ERROR")
	resStartCmd.Flags().String("log-format", "json", "Log format: json, text")
	resStartCmd.Flags().Bool("debug", false, "Enable debug logging")

	// Bind flags to Viper (using res-server prefix)
	if err := viper.BindPFlag("res-server.nats-url", resStartCmd.Flags().Lookup("nats-url")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("res-server.log-level", resStartCmd.Flags().Lookup("log-level")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("res-server.log-format", resStartCmd.Flags().Lookup("log-format")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("res-server.debug", resStartCmd.Flags().Lookup("debug")); err != nil {
		panic(err)
	}
}

func runResServer(cmd *cobra.Command, args []string) error {
	cfg := server.Config{
		NatsURL:   viper.GetString("res-server.nats-url"),
		LogLevel:  viper.GetString("res-server.log-level"),
		LogFormat: viper.GetString("res-server.log-format"),
		Debug:     viper.GetBool("res-server.debug"),
	}

	return res.RunRes(cmd.Context(), cfg)
}
