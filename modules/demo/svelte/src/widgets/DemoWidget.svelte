<script lang="ts">
  import { Registry } from "virtual-module-core/registry";
  const gadgetRegistry = Registry.getInstance();
  import { onDestroy } from "svelte";

  // Access shared state store via Registry (Service Locator pattern)
  const stateStore = gadgetRegistry.getStateStore();

  let count = 0;
  let unsubscribe: (() => void) | undefined;

  if (stateStore) {
    // Get or create a channel for 'demo.counter'
    const counterChannel = stateStore.getChannel<number>("demo.counter", 0);

    // Subscribe to changes
    unsubscribe = counterChannel.subscribe((value) => {
      count = value;
    });
  }

  function increment() {
    if (stateStore) {
      // Update state via store (Last-Writer-Wins)
      stateStore.updateState("demo.counter", count + 1, "demo-widget");
    } else {
      console.warn("State store not available");
      count++; // Fallback local state
    }
  }

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });
</script>

<div class="p-4 space-y-4">
  <div class="p-4 rounded-md bg-muted text-muted-foreground text-sm">
    <p class="font-semibold text-foreground">Shared State Demo</p>
    <p>Global Count: <span class="text-primary font-bold">{count}</span></p>
    <p class="text-xs mt-2 opacity-70">
      Updates sync across all modules watching 'demo.counter'
    </p>
  </div>

  <button
    onclick={increment}
    class="inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
  >
    Increment Global Counter
  </button>
</div>
