<script lang="ts">
  import { onMount } from 'svelte';
  
  let error: Error | null = null;
  let hasError = false;

  export let gadgetTitle: string = 'Gadget';

  // Error boundary logic would typically use an error boundary component
  // Since Svelte 4/5 doesn't have a direct equivalent to React's ComponentDidCatch in functional components easily,
  // we simulate this handling or assume usage within a future Svelte 5 boundary context.
  // For now, this component acts as a wrapper that can display error states if explicitly triggered
  // or if we catch module loading errors.
  
  // NOTE: In Svelte 5, true error boundaries are planned but implementation details vary.
  // For this tasks.md requirement T010, we implement the visual shell.
  
  function resetError() {
      error = null;
      hasError = false;
  }

  // Exposed method for parent to trigger error state
  export const setError = (e: Error) => {
      error = e;
      hasError = true;
      console.error(`[GadgetError] ${gadgetTitle}:`, e);
  };
</script>

{#if hasError}
  <div class="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
    <div class="flex items-center gap-2 font-semibold">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
        <span>Error loading {gadgetTitle}</span>
    </div>
    <p class="mt-2 text-sm opacity-90">
        {error?.message || 'An unexpected error occurred.'}
    </p>
    <button class="mt-3 text-xs underline hover:no-underline" on:click={resetError}>
        Try Again
    </button>
  </div>
{:else}
  <slot />
{/if}
