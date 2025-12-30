package design

import (
	. "goa.design/goa/v3/dsl"
)

var _ = API("ta-server", func() {
	Title("Technical Analysis API")
	Description("API for managing watchlist and providing strategy insights")
	Server("ta-server", func() {
		Host("localhost", func() {
			URI("http://localhost:8080")
		})
	})
})

var TickerItem = Type("TickerItem", func() {
	Attribute("symbol", String, "Stock Symbol", func() {
		Example("AAPL")
	})
	Attribute("on_hand", Boolean, "Whether user holds the stock", func() {
		Example(true)
	})
	Attribute("created_at", String, "Creation timestamp", func() {
		Format(FormatDateTime)
		Example("2023-10-27T10:00:00Z")
	})
	Required("symbol", "on_hand")
})

var Insight = Type("Insight", func() {
	Attribute("symbol", String, "Stock Symbol")
	Attribute("sentiment", String, "Market Sentiment", func() {
		Enum("bullish", "bearish", "neutral")
	})
	Attribute("summary", String, "Analysis Summary")
	Attribute("action", String, "Recommended Action")
	Required("symbol", "sentiment", "summary", "action")
})

var _ = Service("watchlist", func() {
	Description("Manage user watchlist")

	Method("list", func() {
		Payload(func() {
			Attribute("user_id", String, "User ID")
			Required("user_id")
		})
		Result(ArrayOf(TickerItem))
		HTTP(func() {
			GET("/watchlist")
			Header("user_id:X-User-ID")
			Response(StatusOK)
		})
	})

	Method("add", func() {
		Payload(func() {
			Attribute("user_id", String, "User ID")
			Attribute("symbol", String)
			Attribute("on_hand", Boolean)
			Required("user_id", "symbol", "on_hand")
		})
		Result(TickerItem)
		HTTP(func() {
			POST("/watchlist")
			Header("user_id:X-User-ID")
			Response(StatusOK)
		})
	})

	Method("remove", func() {
		Payload(func() {
			Attribute("user_id", String, "User ID")
			Attribute("symbol", String)
			Required("user_id", "symbol")
		})
		HTTP(func() {
			DELETE("/watchlist/{symbol}")
			Header("user_id:X-User-ID")
			Response(StatusNoContent)
		})
	})
})

var _ = Service("insights", func() {
	Description("Provide AI insights")

	Method("list", func() {
		Payload(func() {
			Attribute("user_id", String, "User ID")
			Required("user_id")
		})
		Result(ArrayOf(Insight))
		HTTP(func() {
			GET("/insights")
			Header("user_id:X-User-ID")
			Response(StatusOK)
		})
	})
})

var Exchange = Type("Exchange", func() {
	Description("A financial market or institution")
	Attribute("operating_mic", String, "4-character ISO 10383 code", func() {
		Example("XNYS")
		MinLength(4)
		MaxLength(4)
	})
	Attribute("exchange_name", String, "Full descriptive name", func() {
		Example("New York Stock Exchange")
	})
	Attribute("display_name", String, "Formatted name for UI", func() {
		Example("NYSE - New York Stock Exchange (US)")
	})
	Attribute("country", String, "ISO 3166 alpha-2 country code", func() {
		Example("US")
		MinLength(2)
		MaxLength(2)
	})
	Attribute("city", String, "City location", func() {
		Example("New York")
	})
	Attribute("acronym", String, "Short identifier", func() {
		Example("NYSE")
	})
	Required("operating_mic", "exchange_name", "display_name", "country", "city")
})

var _ = Service("exchange", func() {
	Description("Manage financial exchanges")

	Method("list", func() {
		Payload(func() {
			Attribute("query", String, "Optional search query (name or country)")
		})
		Result(ArrayOf(Exchange))
		HTTP(func() {
			GET("/exchanges")
			Params(func() {
				Param("query")
			})
			Response(StatusOK)
		})
	})

	Method("get", func() {
		Payload(func() {
			Attribute("operating_mic", String, "Operating MIC of the exchange")
			Required("operating_mic")
		})
		Result(Exchange)
		HTTP(func() {
			GET("/exchanges/{operating_mic}")
			Response(StatusOK)
		})
	})
})
