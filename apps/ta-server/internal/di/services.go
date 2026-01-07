package di

import (
	"log/slog"

	// Internal Modules
	portfolio "github.com/reidlai/ta-workspace/modules/portfolio/go/pkg"
	watchlist "github.com/reidlai/ta-workspace/modules/watchlist/go/pkg/watchlist"

	// Generated Interfaces
	portfolioGen "github.com/reidlai/ta-workspace/modules/portfolio/go/gen/portfolio"
	watchlistGen "github.com/reidlai/ta-workspace/modules/watchlist/go/gen/watchlist"

	"goa.design/clue/debug"
)

// Services holds the initialized endpoints for the server.
type Services struct {
	WatchlistEndpoints *watchlistGen.Endpoints
	PortfolioEndpoints *portfolioGen.Endpoints
}

// NewServices initializes the services and endpoints.
func NewServices(logger *slog.Logger) *Services {
	var (
		watchlistSvc watchlistGen.Service
		portfolioSvc portfolioGen.Service
	)
	{
		watchlistSvc = watchlist.NewWatchlist(logger)
		portfolioSvc = portfolio.NewPortfolio(logger)
	}

	var (
		watchlistEndpoints *watchlistGen.Endpoints
		portfolioEndpoints *portfolioGen.Endpoints
	)
	{
		watchlistEndpoints = watchlistGen.NewEndpoints(watchlistSvc)
		watchlistEndpoints.Use(debug.LogPayloads())
		portfolioEndpoints = portfolioGen.NewEndpoints(portfolioSvc)
		portfolioEndpoints.Use(debug.LogPayloads())
	}

	return &Services{
		WatchlistEndpoints: watchlistEndpoints,
		PortfolioEndpoints: portfolioEndpoints,
	}
}
