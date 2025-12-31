<script lang="ts">
  import ChartAreaInteractive from "$lib/components/chart-area-interactive.svelte";
  import DataTable from "$lib/components/data-table.svelte";
  import { Registry } from "@core/registry";

  // Registry.getInstance() is a singleton. It returns the SAME instance initialized
  // in +layout.ts, so we have access to all the widgets loaded there.
  const registry = Registry.getInstance();
  const demoWidget = registry.getWidget("demo-widget");
  const portfolioSummaryWidget = registry.getWidget("portfolio-summary"); // ID from index.ts
  const myTickersWidget = registry.getWidget("my-tickers");
</script>

<div class="flex flex-1 flex-col gap-4">
  <!-- <h1>Debug Page</h1>
  <p>Widget Count: {widgets.length}</p> -->

  <!-- Dashboard Gadget Section -->

  <div class="grid gap-4 md:grid-cols-3">
    {#if demoWidget}
      <div class="h-full rounded-xl bg-muted/50">
        <svelte:component this={demoWidget.component} {...demoWidget.props} />
      </div>
    {/if}
    {#if portfolioSummaryWidget}
      <div class="h-full rounded-xl bg-card">
        <svelte:component
          this={portfolioSummaryWidget.component}
          {...portfolioSummaryWidget.props}
        />
      </div>
    {/if}
    {#if myTickersWidget}
      <div class="h-full rounded-xl bg-muted/50">
        <svelte:component
          this={myTickersWidget.component}
          {...myTickersWidget.props}
        />
      </div>
    {/if}
  </div>

  <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
    <ChartAreaInteractive />
  </div>
  <DataTable />
</div>
