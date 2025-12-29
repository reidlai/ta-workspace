<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  // This catch-all route handles nested module routing
  // The actual module content is determined by the path segments

  let moduleComponent: any = null;
  let error: string | null = null;

  import { Registry } from "@core/registry";

  onMount(async () => {
    const path = $page.url.pathname;
    const registry = Registry.getInstance();

    // Look up route in registry
    moduleComponent = registry.getRoute(path);

    if (!moduleComponent) {
      error = "Module route not found";
    }
  });
</script>

{#if error}
  <div class="p-8 text-center">
    <h1 class="text-2xl font-bold text-destructive">Route Error</h1>
    <p class="text-muted-foreground mt-2">{error}</p>
    <a href="/" class="inline-block mt-4 text-primary hover:underline"
      >Return to Dashboard</a
    >
  </div>
{:else if moduleComponent}
  <svelte:component this={moduleComponent} />
{:else}
  <div class="p-8 text-center">
    <p class="text-muted-foreground">Loading...</p>
  </div>
{/if}
