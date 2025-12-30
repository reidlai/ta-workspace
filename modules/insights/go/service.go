package insights

import (
	"context"
	"log"
	"math/rand"

	insights "github.com/reidlai/ta-workspace/apps/ta-server/gen/insights"
)

// insights service implementation.
type insightssrvc struct {
	logger *log.Logger
}

// NewInsights returns the insights service implementation.
func NewInsights(logger *log.Logger) insights.Service {
	return &insightssrvc{logger: logger}
}

// Get insights for current watchlist
func (s *insightssrvc) List(ctx context.Context, p *insights.ListPayload) (res []*insights.Insight, err error) {
	s.logger.Printf("insights.list user=%s", p.UserID)

	demos := []string{"AAPL", "TSLA", "NVDA", "MSFT"}
	res = make([]*insights.Insight, 0)

	for _, sym := range demos {
		res = append(res, &insights.Insight{
			Symbol:    sym,
			Sentiment: randomSentiment(),
			Summary:   "AI generated summary for " + sym + ": Moving average indicates strong momentum.",
			Action:    "HOLD",
		})
	}
	return
}

func randomSentiment() string {
	r := rand.Intn(3)
	switch r {
	case 0:
		return "bullish"
	case 1:
		return "bearish"
	default:
		return "neutral"
	}
}
