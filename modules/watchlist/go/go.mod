module example.com/taassistant/modules/watchlist

go 1.24.0

toolchain go1.24.11

require example.com/taassistant/api v0.0.0

require (
	github.com/google/uuid v1.6.0 // indirect
	goa.design/goa/v3 v3.23.4 // indirect
)

replace example.com/taassistant/api => ../../../apps/taassistant-api
