<script>
  import SectionCards from "$lib/components/section-cards.svelte";
  import ChartAreaInteractive from "$lib/components/chart-area-interactive.svelte";
  import DataTable from "$lib/components/data-table.svelte";
</script>

<div class="flex flex-1 flex-col gap-4">
  <SectionCards />
  <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
     <ChartAreaInteractive />
  </div>
  <DataTable />
</div>
