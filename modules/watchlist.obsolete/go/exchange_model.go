package watchlist

// Exchange represents a financial market or institution filtered from ISO 10383.
type Exchange struct {
	// OperatingMIC is the 4-character ISO 10383 code.
	OperatingMIC string
	// ExchangeName is the full descriptive name of the market.
	ExchangeName string
	// DisplayName is the pre-formatted string for UI select lists (e.g. "NYSE - NEW YORK STOCK EXCHANGE (US)").
	DisplayName string
	// Country is the ISO 3166 alpha-2 country code.
	Country string
	// City is the geographical location of the exchange.
	City string
	// Acronym is the short identifier for the exchange.
	Acronym string
}

// Global storage for the loaded exchanges
var (
	// Exchanges is the list of all active operating exchanges.
	Exchanges []*Exchange
)
