package cmd

import (
	"fmt"
	"runtime/debug"

	"github.com/spf13/cobra"
)

// Version can be set at build time
var Version = "dev"

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print the application version",
	Long:  `Print the application version information.`,
	Run: func(cmd *cobra.Command, args []string) {
		v := Version
		if info, ok := debug.ReadBuildInfo(); ok {
			if info.Main.Version != "(devel)" {
				v = info.Main.Version
			}
		}
		fmt.Println(v)
	},
}

func init() {
	RootCmd.AddCommand(versionCmd)
}
