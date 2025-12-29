<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import { Registry } from "@core/registry";
  import { page } from "$app/stores";

  let favicon = "/favicon.ico";
  let { children } = $props();

  const registry = Registry.getInstance();
  const handlers = registry.getHandlers();

  function executeHandler(handler: any) {
    const context = {
      config: {},
      register: () => {},
      getService: registry.getService.bind(registry),
    }; // Mock context or pass real one
    if (handler.execute) handler.execute(context);
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<div class="flex min-h-screen flex-col">
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container mx-auto flex h-14 items-center">
      <div class="mr-4 hidden md:flex">
        <a class="mr-6 flex items-center space-x-2" href="/">
          <span class="hidden font-bold sm:inline-block">App Shell</span>
        </a>
        <!-- <nav class="flex items-center space-x-6 text-sm font-medium">
          {#each handlers as handler}
            <button
              class="transition-colors hover:text-foreground/80 text-foreground/60"
              onclick={() => executeHandler(handler)}
            >
              {handler.title}
            </button>
          {/each}
        </nav> -->
      </div>
    </div>
  </header>
  <main class="flex-1 container mx-auto py-6">
    {@render children?.()}
  </main>
</div>
