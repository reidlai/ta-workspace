package cmd

import (
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

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
	if err := viper.BindPFlag("config", RootCmd.PersistentFlags().Lookup("config")); err != nil {
		panic(err)
	}
}

// initConfig reads in config file and ENV variables if set.
// Configuration precedence: Flag > Env > Config File > Default.
//
// It searches for "ta-server.yaml" in:
// 1. Current directory (".")
// 2. Home directory ("$HOME/.ta-server")
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
	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			panic(err)
		}
	}
}
