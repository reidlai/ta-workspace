<script lang="ts">
  import { cn } from "$lib/utils";
  let {
    class: className = undefined,
    level = "h3",
    children,
    ...rest
  } = $props();
</script>

<div
  class={cn("text-2xl font-semibold leading-none tracking-tight", className)}
  {...rest}
>
  {@render children?.()}
</div>
