<script lang="ts">
  import { onMount } from "svelte";
  import type { IWidget } from "virtual-module-core/types";
  import { gadgetRegistry } from "$lib/registry";
  import * as Card from "$lib/components/ui/card";
  import GadgetErrorBoundary from "./GadgetErrorBoundary.svelte";
  import { cn } from "$lib/utils";

  let gadgets: IWidget[] = [];

  onMount(() => {
    gadgets = gadgetRegistry.getWidgets();
  });
</script>

<div
  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
  role="region"
  aria-label="Dashboard Gadgets"
>
  {#each gadgets as gadget (gadget.id)}
    <article
      class={cn(
        "h-full",
        gadget.size === "large" ? "md:col-span-2" : "col-span-1",
      )}
      aria-labelledby={`gadget-title-${gadget.id}`}
    >
      <Card.Root
        class="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow"
      >
        <Card.Header>
          <Card.Title
            id={`gadget-title-${gadget.id}`}
            class="flex items-center gap-2"
          >
            {#if gadget.icon}
              <!-- Dynamic icon loading would go here, simplified for MVP -->
              <span class="text-primary">{gadget.icon}</span>
            {/if}
            {gadget.title}
          </Card.Title>
          {#if gadget.description}
            <Card.Description>{gadget.description}</Card.Description>
          {/if}
        </Card.Header>
        <Card.Content class="flex-1">
          <GadgetErrorBoundary gadgetTitle={gadget.title}>
            <svelte:component this={gadget.component} {...gadget.props} />
          </GadgetErrorBoundary>
        </Card.Content>
      </Card.Root>
    </article>
  {/each}
</div>
