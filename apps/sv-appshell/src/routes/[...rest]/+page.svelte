<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { Registry, RouterService } from '@ts/registry';
  import type { IParamsRoute } from '@ts/types';

  let currentRoute: IParamsRoute | null = null;
  let routeParams: Record<string, string> = {};

  $: {
    const path = $page.url.pathname;
    const registry = Registry.getInstance();
    const router = new RouterService(registry);
    
    console.log('[AppShell] Matching path:', path);
    // Debug: log registered modules
    console.log('[AppShell] Registry modules:', registry.getModules().map(m => m.id));

    const match = router.match(path);
    if (match) {
        currentRoute = match.route;
        routeParams = match.params;
    } else {
        currentRoute = null;
    }
  }
</script>

{#if currentRoute}
  <svelte:component this={currentRoute.component} {routeParams} />
{:else}
  <h1>404 - Not Found</h1>
  <p>No module found for {$page.url.pathname}</p>
{/if}
