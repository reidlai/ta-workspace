<script lang="ts">
  import { setContext } from "svelte";
  let { data } = $props();
  // svelte-ignore state_referenced_locally
  const appContainer = data.appContainer;
</script>
