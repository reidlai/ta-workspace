module github.com/reidlai/ta-workspace/apps/go-server

go 1.24.11

require (
	github.com/go-chi/chi/v5 v5.2.3
	github.com/reidlai/ta-workspace/modules/portfolio/go v0.0.0-00010101000000-000000000000
	github.com/reidlai/ta-workspace/modules/watchlist/go v0.0.0-00010101000000-000000000000
	github.com/spf13/cobra v1.10.2
	github.com/spf13/viper v1.21.0
	go.opentelemetry.io/otel/trace v1.38.0
	goa.design/clue v0.20.0
	goa.design/goa/v3 v3.23.4
)

require (
	github.com/aws/smithy-go v1.23.0 // indirect
	github.com/fsnotify/fsnotify v1.9.0 // indirect
	github.com/go-logfmt/logfmt v0.6.0 // indirect
	github.com/go-viper/mapstructure/v2 v2.4.0 // indirect
	github.com/google/uuid v1.6.0 // indirect
	github.com/gorilla/websocket v1.5.3 // indirect
	github.com/inconshreveable/mousetrap v1.1.0 // indirect
	github.com/pelletier/go-toml/v2 v2.2.4 // indirect
	github.com/sagikazarmark/locafero v0.11.0 // indirect
	github.com/sourcegraph/conc v0.3.1-0.20240121214520-5f936abd7ae8 // indirect
	github.com/spf13/afero v1.15.0 // indirect
	github.com/spf13/cast v1.10.0 // indirect
	github.com/spf13/pflag v1.0.10 // indirect
	github.com/subosito/gotenv v1.6.0 // indirect
	go.opentelemetry.io/otel v1.38.0 // indirect
	go.yaml.in/yaml/v3 v3.0.4 // indirect
	golang.org/x/net v0.48.0 // indirect
	golang.org/x/sys v0.39.0 // indirect
	golang.org/x/term v0.38.0 // indirect
	golang.org/x/text v0.32.0 // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20251213004720-97cd9d5aeac2 // indirect
	google.golang.org/grpc v1.77.0 // indirect
	google.golang.org/protobuf v1.36.11 // indirect
)

replace (
	github.com/reidlai/ta-workspace/modules/portfolio/go => ../../modules/portfolio/go
	github.com/reidlai/ta-workspace/modules/watchlist/go => ../../modules/watchlist/go
)
