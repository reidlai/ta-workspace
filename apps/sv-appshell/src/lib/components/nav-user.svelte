<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";

  let { user }: { user: any } = $props();
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <Sidebar.MenuButton
      size="lg"
      class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <div
        class="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-xs font-medium"
      >
        {user.name ? user.name.slice(0, 2).toUpperCase() : "CN"}
      </div>
      <div class="grid flex-1 text-left text-sm leading-tight">
        <span class="truncate font-semibold">{user.name}</span>
        <span class="truncate text-xs">{user.email}</span>
      </div>
      <ChevronsUpDown class="ml-auto size-4" />
    </Sidebar.MenuButton>
  </Sidebar.MenuItem>
</Sidebar.Menu>
