<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { watchlistService, type TickerItem } from "../../../ts/src/index";

    let tickers: TickerItem[] = [];
    let newSymbol = "";
    let newOnHand = false;
    let unsubscribe: () => void;

    onMount(() => {
        unsubscribe = watchlistService.subscribe((value) => {
            tickers = value;
        });
    }); // Testing

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });

    async function add() {
        if (!newSymbol) return;
        await watchlistService.addTicker(newSymbol.toUpperCase(), newOnHand);
        newSymbol = "";
        newOnHand = false;
    }

    async function remove(symbol: string) {
        await watchlistService.removeTicker(symbol);
    }
</script>

<div
    class="h-full w-full bg-card text-card-foreground rounded-xl border shadow flex flex-col overflow-hidden"
>
    <div class="p-4 border-b bg-muted/20 flex justify-between items-center">
        <h3 class="font-semibold">My Tickers</h3>
        <span class="text-xs text-muted-foreground"
            >{tickers.length} watched</span
        >
    </div>

    <div class="flex-1 overflow-auto p-4 space-y-2">
        {#each tickers as ticker (ticker.symbol)}
            <div
                class="flex items-center justify-between p-2 rounded-lg bg-background border"
            >
                <div class="flex items-center gap-3">
                    <div
                        class="{ticker.on_hand
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-blue-500/10 text-blue-500'} p-2 rounded-full"
                    >
                        {#if ticker.on_hand}
                            <!-- Icon for Holding -->
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                ><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                ></path><path d="M22 4L12 14.01l-3-3"
                                ></path></svg
                            >
                        {:else}
                            <!-- Icon for Watch only -->
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                ><circle cx="12" cy="12" r="10"></circle><line
                                    x1="12"
                                    y1="16"
                                    x2="12"
                                    y2="12"
                                ></line><line x1="12" y1="8" x2="12.01" y2="8"
                                ></line></svg
                            >
                        {/if}
                    </div>
                    <span class="font-bold">{ticker.symbol}</span>
                </div>
                <button
                    on:click={() => remove(ticker.symbol)}
                    class="text-muted-foreground hover:text-destructive p-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        ><path d="M3 6h18"></path><path
                            d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
                        ></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
                        ></path></svg
                    >
                </button>
            </div>
        {:else}
            <div class="text-center text-muted-foreground text-sm py-4">
                No tickers watched.
            </div>
        {/each}
    </div>

    <div class="p-3 bg-muted/20 border-t flex gap-2">
        <input
            class="flex-1 bg-background border rounded px-3 py-2 text-sm"
            placeholder="Symbol (e.g. AAPL)"
            bind:value={newSymbol}
        />
        <label class="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                bind:checked={newOnHand}
                class="w-4 h-4 rounded border-gray-300"
            />
            <span class="text-xs">Hold</span>
        </label>
        <button
            on:click={add}
            class="bg-primary text-primary-foreground px-4 py-2 rounded text-sm font-medium hover:bg-primary/90"
            >Add</button
        >
    </div>
</div>
