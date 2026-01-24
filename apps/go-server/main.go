package main

import (
	"fmt"
	"os"

	"github.com/reidlai/ta-workspace/apps/go-server/cmd"
)

func main() {
	if err := cmd.RootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
