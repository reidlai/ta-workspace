<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { goto } from "$app/navigation";
    import { watchlistService, type TickerItem } from "../../../ts/src/index";
    import * as Card from "@ui/card";

    let tickers: TickerItem[] = [];
    let unsubscribe: () => void;

    onMount(() => {
        unsubscribe = watchlistService.subscribe((value) => {
            tickers = value;
        });
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });

    // T003: Static Mapping Strategy for Exchange Count
    const EXCHANGE_MAP: Record<string, string> = {
        AAPL: "NASDAQ",
        MSFT: "NASDAQ",
        GOOGL: "NASDAQ",
        NVDA: "NASDAQ",
        AMZN: "NASDAQ",
        F: "NYSE",
        GE: "NYSE",
        JPM: "NYSE",
        WMT: "NYSE",
    };

    function getExchange(symbol: string): string {
        return EXCHANGE_MAP[symbol.toUpperCase()] || "Other";
    }

    // T004: Derived store for exchange counts
    $: uniqueExchangeCount = new Set(tickers.map((t) => getExchange(t.symbol)))
        .size;

    function handleClick() {
        goto("/watchlist");
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick();
        }
    }
</script>

<div
    role="button"
    tabindex="0"
    class="@container w-full h-full cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
    on:click={handleClick}
    on:keydown={handleKeydown}
>
    <Card.Root
        class="h-full flex flex-col justify-between border-l-4 border-l-primary"
    >
        <Card.Header class="pb-2">
            <Card.Description>Number of Tickers in Watchlist</Card.Description>
            <Card.Title class="text-3xl font-bold tracking-tight"
                >{tickers.length}</Card.Title
            >
        </Card.Header>
        <Card.Content>
            <div class="flex items-center space-x-2">
                <span class="text-sm text-muted-foreground">In</span>
                <span class="font-semibold text-sm">
                    {uniqueExchangeCount}
                </span>
                <span class="text-sm text-muted-foreground">Markets</span>
            </div>
        </Card.Content>
    </Card.Root>
</div>
