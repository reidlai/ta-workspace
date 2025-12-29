<script lang="ts">
  import SectionCards from "$lib/components/section-cards.svelte";
  import ChartAreaInteractive from "$lib/components/chart-area-interactive.svelte";
  import DataTable from "$lib/components/data-table.svelte";
  import { Registry } from "@core/registry";
  import type { IWidget } from "@core/types";

  const registry = Registry.getInstance();
  const widgets: IWidget[] = registry.getWidgets();
</script>

<div class="flex flex-1 flex-col gap-4">
  <SectionCards />

  {#if widgets.length > 0}
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {#each widgets as widget}
        <div class="rounded-xl bg-card text-card-foreground shadow border p-4">
          <h3 class="font-semibold">{widget.title}</h3>
          <p class="text-sm text-muted-foreground mb-4">{widget.description}</p>
          <svelte:component this={widget.component} {...widget.props} />
        </div>
      {/each}
    </div>
  {/if}

  <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
    <ChartAreaInteractive />
  </div>
  <DataTable />
</div>
