<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import NavMain from "./nav-main.svelte";
  import NavDocuments from "./nav-documents.svelte";
  import NavSecondary from "./nav-secondary.svelte";
  import NavUser from "./nav-user.svelte";

  import LayoutDashboard from "lucide-svelte/icons/layout-dashboard";
  import List from "lucide-svelte/icons/list";
  import BarChart from "lucide-svelte/icons/chart-bar";
  import Folder from "lucide-svelte/icons/folder";
  import Users from "lucide-svelte/icons/users";
  import Database from "lucide-svelte/icons/database";
  import FileText from "lucide-svelte/icons/file-text";
  import FileType from "lucide-svelte/icons/file-type";
  import Settings from "lucide-svelte/icons/settings";
  import HelpCircle from "lucide-svelte/icons/circle-help";
  import Search from "lucide-svelte/icons/search";
  import GalleryVerticalEnd from "lucide-svelte/icons/gallery-vertical-end";

  import type { ComponentProps } from "svelte";

  let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      { title: "Dashboard", url: "#", icon: LayoutDashboard },
      { title: "Lifecycle", url: "#", icon: List },
      { title: "Analytics", url: "#", icon: BarChart },
      { title: "Projects", url: "#", icon: Folder },
      { title: "Team", url: "#", icon: Users },
    ],
    navDocuments: [
      { name: "Data Library", url: "#", icon: Database },
      { name: "Reports", url: "#", icon: FileText },
      { name: "Word Assistant", url: "#", icon: FileType },
    ],
    navSecondary: [
      { title: "Settings", url: "#", icon: Settings },
      { title: "Get Help", url: "#", icon: HelpCircle },
      { title: "Search", url: "#", icon: Search },
    ],
  };
</script>

<Sidebar.Root collapsible="icon" {...restProps}>
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton size="lg" class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          {#snippet child({ props })}
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <GalleryVerticalEnd class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">Acme Inc</span>
              <span class="truncate text-xs">Enterprise</span>
            </div>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
  <Sidebar.Content>
    <NavMain items={data.navMain} />
    <NavDocuments items={data.navDocuments} />
    <NavSecondary items={data.navSecondary} class="mt-auto" />
  </Sidebar.Content>
  <Sidebar.Footer>
    <NavUser user={data.user} />
  </Sidebar.Footer>
</Sidebar.Root>
