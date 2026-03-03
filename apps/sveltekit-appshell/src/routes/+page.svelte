<script lang="ts">
  import ChartAreaInteractive from "$lib/components/chart-area-interactive.svelte";
  import DataTable from "$lib/components/data-table.svelte";
  import DemoWidget from "$modules/demo/lib/widgets/DemoWidget.svelte";
  import PortfolioSummaryWidget from "$modules/portfolio/lib/widgets/PortfolioSummaryWidget.svelte";
  import WatchlistSummaryWidget from "$modules/watchlist/lib/widgets/WatchlistSummaryWidget.svelte";
  import WatchlistTickerTableWidget from "$modules/watchlist/lib/widgets/WatchlistTickerTableWidget.svelte";

  // Receive data from parent +layout.server.ts
  let { data } = $props();
</script>

<div class="flex flex-1 flex-col gap-4">
  <!-- Dashboard Gadget Section -->
  <div class="grid gap-4 md:grid-cols-3">
    <div class="h-full rounded-xl bg-accent/33">
      <DemoWidget />
    </div>  
    <div class="h-full rounded-xl bg-accent/33">
      <PortfolioSummaryWidget />
    </div>
    <div class="h-full rounded-xl bg-accent/33">
      <WatchlistSummaryWidget />
    </div>
  </div>
  <div class="grid gap-4 md:grid-cols-2">
    <div class="h-full rounded-xl bg-muted/50">
      <WatchlistTickerTableWidget />
    </div>

    <div class="h-full rounded-xl bg-muted/50">
      <ChartAreaInteractive />
    </div>
  </div>
  <DataTable />
</div>
