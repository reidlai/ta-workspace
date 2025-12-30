module github.com/reidlai/ta-workspace/modules/insights/go

go 1.23.10

require (
	github.com/reidlai/ta-workspace/apps/ta-server v0.0.0
	goa.design/goa/v3 v3.14.0
	golang.org/x/text v0.14.0
)

replace github.com/reidlai/ta-workspace/apps/ta-server => ../../../apps/ta-server
