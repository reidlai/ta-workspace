package design

import (
	. "goa.design/goa/v3/dsl"
)

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
