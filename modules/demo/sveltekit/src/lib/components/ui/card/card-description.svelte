<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "../../../utils";

	let { class: className, children, ...rest }: HTMLAttributes<HTMLParagraphElement> = $props();
</script>

<p class={cn("text-muted-foreground text-sm", className)} {...rest}>
	{@render children?.()}
</p>
