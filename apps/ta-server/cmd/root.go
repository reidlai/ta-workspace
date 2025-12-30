package cmd

import (
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

// Version can be set at build time
var Version = "dev"

var RootCmd = &cobra.Command{
	Use:   "ta-server",
	Short: "Technical Analysis Assistant API",
	Long:  "Technical Analysis Assistant - API for managing watchlist and providing strategy insights",
}

func init() {
	cobra.OnInitialize(initConfig)

	// Add subcommands
	RootCmd.AddCommand(apiServerCmd)

	// Global flags
	RootCmd.PersistentFlags().String("config", "", "config file (default is ta-server.yaml)")
	viper.BindPFlag("config", RootCmd.PersistentFlags().Lookup("config"))
}

func initConfig() {
	if cfgFile := viper.GetString("config"); cfgFile != "" {
		viper.SetConfigFile(cfgFile)
	} else {
		viper.SetConfigName("ta-server")
		viper.SetConfigType("yaml")
		viper.AddConfigPath(".")
		viper.AddConfigPath("$HOME/.ta-server")
	}

	// Read config file (silently ignore if not found)
	viper.ReadInConfig()
}
