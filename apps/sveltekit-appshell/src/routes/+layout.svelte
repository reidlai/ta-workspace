<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";

  let favicon = "/favicon.ico";
  let { children, data } = $props();

  import { setContext } from "svelte";
  import type { DIContainer } from "virtual-module-core/di";

  // The DIContainer is created once per page load, so setting it on init is fine.
  // We use a derived or effect if it were reactive, but the app context is static per-load.
  // @ts-ignore - bypass type strictness on dynamic loader data
  // svelte-ignore state_referenced_locally
  const appContainer = data.appContainer as DIContainer | undefined;
  if (appContainer) {
    setContext("appContainer", appContainer);
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
      </div>
    </div>
  </header>
  <main class="flex-1 container mx-auto py-6">
    {@render children?.()}
  </main>
</div>
