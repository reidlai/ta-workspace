<script lang="ts">
  import { cn } from "$lib/utils";
  let { class: className, level = "h3", ...rest } = $props();
</script>

<div class={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...rest}>
  <slot />
</div>
