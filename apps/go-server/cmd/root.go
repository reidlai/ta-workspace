package cmd

import (
	"strings"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

/*
 * Root command for the application
 * @return void
 */
var RootCmd = &cobra.Command{
	Use:   "ta-server",
	Short: "Technical Analysis Assistant API",
	Long:  "Technical Analysis Assistant - API for managing watchlist and providing strategy insights",
}

func init() {

	// Initialize config from file and environment variables
	cobra.OnInitialize(initConfig)

	// Add subcommand api-server
	RootCmd.AddCommand(apiServerCmd)

	// Define persistent flags
	RootCmd.PersistentFlags().String("config", "", "config file (default is rest-server.yaml)")
	RootCmd.PersistentFlags().String("log-level", "", "Log level: DEBUG, INFO, WARN, ERROR")
	RootCmd.PersistentFlags().String("log-format", "", "Log format: json, text")
	RootCmd.PersistentFlags().Bool("debug", false, "Enable debug logging")
	RootCmd.PersistentFlags().Bool("secure", false, "Enable secure mode")
	RootCmd.PersistentFlags().String("tls-cert", "", "Path to TLS certificate file")
	RootCmd.PersistentFlags().String("tls-key", "", "Path to TLS key file")

	// Bind persistent flags with cobra command line parameters
	if err := viper.BindPFlag("config", RootCmd.PersistentFlags().Lookup("config")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("server.log-level", RootCmd.PersistentFlags().Lookup("log-level")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("server.log-format", RootCmd.PersistentFlags().Lookup("log-format")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("server.debug", RootCmd.PersistentFlags().Lookup("debug")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("server.secure", RootCmd.PersistentFlags().Lookup("secure")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("server.tls-cert", RootCmd.PersistentFlags().Lookup("tls-cert")); err != nil {
		panic(err)
	}
	if err := viper.BindPFlag("server.tls-key", RootCmd.PersistentFlags().Lookup("tls-key")); err != nil {
		panic(err)
	}
}

// initConfig reads in config file and ENV variables if set.
// Configuration precedence: Flag > Env > Config File > Default.
//
// It searches for "server.yaml" in:
// 1. Current directory (".")
// 2. Home directory ("$HOME")
func initConfig() {
	if cfgFile := viper.GetString("config"); cfgFile != "" {
		viper.SetConfigFile(cfgFile)
	} else {
		viper.SetConfigName("server")
		viper.AddConfigPath(".")
		viper.AddConfigPath("$HOME")
	}

	// Configuration precedence: Flag > Env > Config File > Default.
	viper.SetEnvPrefix("ta_goserver")
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_", "-", "_"))
	viper.AutomaticEnv()

	// Global defaults
	viper.SetDefault("server.log-level", "INFO")
	viper.SetDefault("server.log-format", "json")

	// Explicit BindEnv for common options (supporting multiple formats)
	_ = viper.BindEnv("server.log-level")
	_ = viper.BindEnv("server.log-format")
	_ = viper.BindEnv("server.debug")
	_ = viper.BindEnv("server.secure")
	_ = viper.BindEnv("server.tls-cert")
	_ = viper.BindEnv("server.tls-key")

	// Read config file (silently ignore if not found)
	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			panic(err)
		}
	}
}
