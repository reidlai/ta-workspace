package server

import (
	"github.com/jirenius/go-res"
	genwatchlist "github.com/reidlai/ta-workspace/modules/watchlist/go/goa_gen/gen/watchlist"
)

// RegisterHandlers registers the RES handlers
func (s *ResServer) RegisterHandlers() {
	s.Logger.Info("Registering RES handlers...")

	// User Story 2: Register Watchlist Handlers
	if s.Services.WatchlistEndpoints != nil {
		// We need the raw Service, accessing via endpoints might be tricky if we want direct service access.
		// However, Services struct has Endpoints.
		// Ideally we should inject the Service interface into ResServer or use the Endpoint's service if accessible.
		// Looking at di/services.go, it constructs Endpoints from Service but doesn't expose Service directly.
		// BUT, for Go-RES, we typically want to call the Business Logic directly.
		// For this task, I'll assumme we can refactor DI to expose Service OR I'll use the Endpoint (which is a wrapper).
		// GOA Endpoints are functions (Service.GetWatchlist -> Endpoint).
		// Let's use Endpoints for now as that's what we have.

		NewWatchlistHandler(s.Services.WatchlistEndpoints).Register(s.Service)
	}
}

type WatchlistHandler struct {
	Endpoints *genwatchlist.Endpoints
}

func NewWatchlistHandler(endpoints *genwatchlist.Endpoints) *WatchlistHandler {
	return &WatchlistHandler{Endpoints: endpoints}
}

func (h *WatchlistHandler) Register(s *res.Service) {
	// Exposing "ta.watchlist" as a singleton for now as per service signature
	s.Handle("watchlist",
		res.GetModel(h.GetWatchlist),
		res.Call("add_ticker", h.AddTicker),
		res.Call("remove_ticker", h.RemoveTicker),
	)
}

func (h *WatchlistHandler) GetWatchlist(r res.ModelRequest) {
	ctx := GetContext(r)

	// Call Endpoint
	// Endpoints.GetWatchlist is func(ctx, req) (res, err)
	res, err := h.Endpoints.GetWatchlist(ctx, nil)
	if err != nil {
		r.Error(err)
		return
	}

	r.Model(res)
}

func (h *WatchlistHandler) AddTicker(r res.CallRequest) {
	var params genwatchlist.AddWatchlistTickerPayload
	r.ParseParams(&params)

	ctx := GetContext(r)
	res, err := h.Endpoints.AddWatchlistTicker(ctx, &params)
	if err != nil {
		r.Error(err)
		return
	}

	// In RES, adding to a collection (if watchlist was a collection) or updating model.
	// Since GetWatchlist returns a Model with Tickers, this is a Model update.
	// But usually Watchlist is a Collection of Tickers?
	// The Spec says "Watchlist Resource Exposure".
	// The Watchlist data model (genwatchlist.Watchlist) has Tickers [].
	// This implies Watchlist is a Model containing a list.
	// We'll return the result.
	r.OK(res)
}

func (h *WatchlistHandler) RemoveTicker(r res.CallRequest) {
	var params genwatchlist.RemoveWatchlistTickerPayload
	r.ParseParams(&params)

	ctx := GetContext(r)
	_, err := h.Endpoints.RemoveWatchlistTicker(ctx, &params)
	if err != nil {
		r.Error(err)
		return
	}

	r.OK(nil)
}
