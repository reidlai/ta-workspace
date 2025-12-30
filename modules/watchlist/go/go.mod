module github.com/reidlai/ta-workspace/modules/watchlist/go

go 1.23.10

require (
	github.com/reidlai/ta-workspace/apps/ta-server v0.0.0
	golang.org/x/text v0.14.0
)

require (
	github.com/google/uuid v1.4.0 // indirect
	goa.design/goa/v3 v3.14.0 // indirect
)

replace github.com/reidlai/ta-workspace/apps/ta-server => ../../../apps/ta-server
