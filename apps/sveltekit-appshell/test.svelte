<script lang="ts">
  import { setContext, untrack } from "svelte";
  let { data } = $props();
  const appContainer = untrack(() => data.appContainer);
</script>
