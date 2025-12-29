<script lang="ts">
  import SectionCards from "$lib/components/section-cards.svelte";
  import ChartAreaInteractive from "$lib/components/chart-area-interactive.svelte";
  import DataTable from "$lib/components/data-table.svelte";
  import { Registry } from "@core/registry";
  import type { IWidget } from "@core/types";

  const registry = Registry.getInstance();
  const demoWidget = registry.getWidget("demo-widget");
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
    {#if demoWidget}
      <div class="h-full rounded-xl bg-muted/50">
        <svelte:component this={demoWidget.component} {...demoWidget.props} />
      </div>
    {/if}
    {#if demoWidget}
      <div class="h-full rounded-xl bg-muted/50">
        <svelte:component this={demoWidget.component} {...demoWidget.props} />
      </div>
    {/if}
  </div>

  <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
    <ChartAreaInteractive />
  </div>
  <DataTable />
</div>
