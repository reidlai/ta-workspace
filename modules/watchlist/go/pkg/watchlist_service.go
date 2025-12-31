package pkg

import (
	"context"
	"log"
	"sync"
	"time"

	watchlist "github.com/reidlai/ta-workspace/modules/watchlist/go/gen/watchlist"
)

// watchlist service implementation.
type watchlistsrvc struct {
	logger *log.Logger
	mu     sync.Mutex
	// Map UserID -> Symbol -> Item
	store map[string]map[string]*watchlist.TickerItem
}

// NewWatchlist returns the watchlist service implementation.
func NewWatchlist(logger *log.Logger) watchlist.Service {
	return &watchlistsrvc{
		logger: logger,
		store:  make(map[string]map[string]*watchlist.TickerItem),
	}
}

// List all tickers for user
func (s *watchlistsrvc) List(ctx context.Context, p *watchlist.ListPayload) (res []*watchlist.TickerItem, err error) {
	s.logger.Printf("watchlist.list user=%s", p.UserID)
	s.mu.Lock()
	defer s.mu.Unlock()

	userStore, ok := s.store[p.UserID]
	if !ok {
		return []*watchlist.TickerItem{}, nil
	}

	res = make([]*watchlist.TickerItem, 0, len(userStore))
	for _, item := range userStore {
		res = append(res, item)
	}
	return
}

// Add ticker
func (s *watchlistsrvc) Add(ctx context.Context, p *watchlist.AddPayload) (res *watchlist.TickerItem, err error) {
	s.logger.Printf("watchlist.add user=%s symbol=%s", p.UserID, p.Symbol)
	s.mu.Lock()
	defer s.mu.Unlock()

	if s.store[p.UserID] == nil {
		s.store[p.UserID] = make(map[string]*watchlist.TickerItem)
	}

	now := time.Now().Format(time.RFC3339)
	item := &watchlist.TickerItem{
		Symbol:    p.Symbol,
		OnHand:    p.OnHand,
		CreatedAt: &now,
	}
	s.store[p.UserID][p.Symbol] = item
	return item, nil
}

// Remove ticker
func (s *watchlistsrvc) Remove(ctx context.Context, p *watchlist.RemovePayload) (err error) {
	s.logger.Printf("watchlist.remove user=%s symbol=%s", p.UserID, p.Symbol)
	s.mu.Lock()
	defer s.mu.Unlock()

	if s.store[p.UserID] != nil {
		delete(s.store[p.UserID], p.Symbol)
	}
	return nil
}
