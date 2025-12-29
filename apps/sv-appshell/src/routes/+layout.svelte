<script>
  import "../app.css";

  // Simple utilities to manage light & dark mode in your SvelteKit app
  import { ModeWatcher } from "mode-watcher";

  let favicon = "/favicon.ico";
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

{@render children?.()}
