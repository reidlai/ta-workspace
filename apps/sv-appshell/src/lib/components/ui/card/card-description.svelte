<script lang="ts">
  import { cn } from "$lib/utils";
  let { class: className = undefined, children, ...rest } = $props();
</script>

<p class={cn("text-sm text-muted-foreground", className)} {...rest}>
  {@render children?.()}
</p>
