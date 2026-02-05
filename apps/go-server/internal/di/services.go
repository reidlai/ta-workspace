package di

import (
	"log/slog"

	"github.com/reidlai/virtual-module-core/go/pkg/module"
	// Virtual Module Packages (no goa_gen imports!)
	portfolio "github.com/reidlai/ta-workspace/modules/portfolio/go/pkg/portfolio"
	watchlist "github.com/reidlai/ta-workspace/modules/watchlist/go/pkg/watchlist"
)

// Services holds the initialized services for the server.
type Services struct {
	// Dynamic module registration
	Modules []module.Registrar
}

// NewServices initializes the services and modules.
func NewServices(logger *slog.Logger) *Services {
	// Each module creates its own endpoints internally
	modules := []module.Registrar{
		watchlist.NewModule(logger),
		portfolio.NewModule(logger),
	}

	return &Services{
		Modules: modules,
	}
}
