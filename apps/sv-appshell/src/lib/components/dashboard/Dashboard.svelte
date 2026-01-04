<script lang="ts">
  import GadgetGrid from "./GadgetGrid.svelte";
  import { themeStore } from "$lib/stores/theme";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { gadgetRegistry } from "$lib/registry";
  import ThemeSwitcher from "$lib/components/theme/ThemeSwitcher.svelte";

  let serviceMessage = "";

  function testServiceInvocation() {
    const demoService = gadgetRegistry.getService<any>("DemoService");
    if (demoService) {
      serviceMessage = demoService.greet("Dashboard");
    } else {
      serviceMessage = "Service not found";
    }
  }
</script>

<div class="space-y-6" role="main" aria-label="Dashboard">
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
      <p class="text-muted-foreground">
        Overview of your active modules and gadgets.
      </p>
    </div>
    <div class="flex items-center gap-2">
      <Button variant="outline" size="sm" onclick={testServiceInvocation}>
        Test Service
      </Button>
      {#if serviceMessage}
        <span class="text-sm text-muted-foreground">{serviceMessage}</span>
      {/if}
    </div>
  </div>

  <div class="flex justify-end">
    <ThemeSwitcher />
  </div>

  <GadgetGrid />
</div>
