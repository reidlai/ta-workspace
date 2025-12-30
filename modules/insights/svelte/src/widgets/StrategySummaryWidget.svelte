<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { insightsService, type Insight } from "../../../ts/src/index";

    // We can show all insights, or just a few.
    let insightsMap: Record<string, Insight> = {};
    let unsubscribe: () => void;
    let loading = false;

    // Derived list
    $: insightsList = Object.values(insightsMap);

    onMount(() => {
        unsubscribe = insightsService.subscribe((value) => {
            insightsMap = value;
        });
        refresh();
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });

    async function refresh() {
        loading = true;
        await insightsService.refresh();
        loading = false;
    }

    function getSentimentColor(sentiment: string) {
        switch (sentiment) {
            case "bullish":
                return "text-green-500 bg-green-500/10";
            case "bearish":
                return "text-red-500 bg-red-500/10";
            default:
                return "text-yellow-500 bg-yellow-500/10";
        }
    }
</script>

<div
    class="h-full w-full bg-card text-card-foreground rounded-xl border shadow flex flex-col overflow-hidden"
>
    <div class="p-4 border-b bg-muted/20 flex justify-between items-center">
        <h3 class="font-semibold">Strategy Insights</h3>
        <button
            on:click={refresh}
            class="p-1 hover:bg-muted rounded"
            disabled={loading}
        >
            <svg
                class:animate-spin={loading}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"
                ></path><path d="M21 3v5h-5"></path></svg
            >
        </button>
    </div>

    <div class="flex-1 overflow-auto p-4 space-y-3">
        {#if insightsList.length === 0}
            {#if loading}
                <div class="space-y-3">
                    <div
                        class="h-16 rounded-lg bg-muted/50 animate-pulse"
                    ></div>
                    <div
                        class="h-16 rounded-lg bg-muted/50 animate-pulse"
                    ></div>
                </div>
            {:else}
                <div class="text-center text-muted-foreground text-sm py-4">
                    No insights available. Add tickers to your watchlist.
                </div>
            {/if}
        {/if}

        {#each insightsList as insight (insight.symbol)}
            <div class="p-3 rounded-lg border bg-background space-y-2">
                <div class="flex justify-between items-start">
                    <div class="flex items-center gap-2">
                        <span class="font-bold">{insight.symbol}</span>
                        <span
                            class="px-2 py-0.5 rounded text-[10px] uppercase font-bold {getSentimentColor(
                                insight.sentiment,
                            )}"
                        >
                            {insight.sentiment}
                        </span>
                    </div>
                    <span
                        class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded"
                        >Action: {insight.action}</span
                    >
                </div>
                <p class="text-sm text-muted-foreground leading-relaxed">
                    {insight.summary}
                </p>
            </div>
        {/each}
    </div>
</div>
