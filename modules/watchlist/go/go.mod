module github.com/reidlai/ta-workspace/modules/watchlist/go

go 1.24.0

toolchain go1.24.11

require github.com/reidlai/ta-workspace/apps/ta-server v0.0.0

require (
	github.com/google/uuid v1.6.0 // indirect
	goa.design/goa/v3 v3.23.4 // indirect
)

replace github.com/reidlai/ta-workspace/apps/ta-server => ../../../apps/ta-server
