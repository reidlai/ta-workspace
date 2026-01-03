<script lang="ts">
  import { page } from "$app/stores";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import type { ComponentProps } from "svelte";

  let { items }: { items: any[] } = $props();
</script>

<Sidebar.Group>
  <Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
  <Sidebar.Menu>
    {#each items as item (item.title)}
      <Sidebar.MenuItem>
        <Sidebar.MenuButton tooltipContent={item.title}>
          {#snippet child({ props })}
            <a href={item.url} {...props}>
              {#if item.icon}
                <item.icon />
              {/if}
              <span>{item.title}</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    {/each}
  </Sidebar.Menu>
</Sidebar.Group>
