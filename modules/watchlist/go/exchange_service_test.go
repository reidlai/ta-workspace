package watchlist

import (
	"context"
	"testing"

	"github.com/reidlai/ta-workspace/apps/ta-server/gen/exchange"
)

func TestListExchanges(t *testing.T) {
	// Setup mock data
	Exchanges = []*Exchange{
		{OperatingMIC: "XNYS", ExchangeName: "New York Stock Exchange", DisplayName: "NYSE ...", Country: "US", City: "New York", Acronym: "NYSE"},
		{OperatingMIC: "XLON", ExchangeName: "London Stock Exchange", DisplayName: "LSE ...", Country: "GB", City: "London", Acronym: "LSE"},
		{OperatingMIC: "XJPX", ExchangeName: "Japan Exchange Group", DisplayName: "JPX ...", Country: "JP", City: "Tokyo", Acronym: "JPX"},
	}

	svc := NewExchange()
	ctx := context.Background()

	// Case 1: List All
	res, err := svc.List(ctx, &exchange.ListPayload{})
	if err != nil {
		t.Fatalf("List failed: %v", err)
	}
	if len(res) != 3 {
		t.Errorf("expected 3 exchanges, got %d", len(res))
	}

	// Case 2: Filter by Name (insensitive)
	q := "york"
	res, err = svc.List(ctx, &exchange.ListPayload{Query: &q})
	if err != nil {
		t.Fatalf("List with query failed: %v", err)
	}
	if len(res) != 1 {
		t.Errorf("expected 1 exchange (NYSE), got %d", len(res))
	}
	if res[0].OperatingMic != "XNYS" {
		t.Errorf("expected XNYS, got %s", res[0].OperatingMic)
	}

	// Case 3: Filter by Country
	q2 := "gb"
	res, err = svc.List(ctx, &exchange.ListPayload{Query: &q2})
	if err != nil {
		t.Fatalf("List with query failed: %v", err)
	}
	if len(res) != 1 {
		t.Errorf("expected 1 exchange (Great Britain), got %d", len(res))
	}
	if res[0].OperatingMic != "XLON" {
		t.Errorf("expected XLON, got %s", res[0].OperatingMic)
	}

	// Case 4: No match
	q3 := "Mars"
	res, err = svc.List(ctx, &exchange.ListPayload{Query: &q3})
	if err != nil {
		t.Fatalf("List with query failed: %v", err)
	}
	if len(res) != 0 {
		t.Errorf("expected 0 exchanges, got %d", len(res))
	}
}
