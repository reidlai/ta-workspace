<script lang="ts">
  import { setMode, mode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";

  function toggleTheme() {
    const modes = ["light", "dark", "system"] as const;
    const currentIndex = modes.indexOf(mode.current as any);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setMode(nextMode);
  }

  function setThemeMode(newMode: "light" | "dark" | "system") {
    setMode(newMode);
  }
</script>

<div class="theme-switcher">
  <Card.Root class="w-64">
    <Card.Header>
      <Card.Title>Theme Settings</Card.Title>
      <Card.Description>Choose your preferred color scheme</Card.Description>
    </Card.Header>
    <Card.Content class="space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-sm">Current: <strong>{mode.current}</strong></span>
        <Button
          variant="outline"
          size="sm"
          onclick={toggleTheme}
          aria-label="Toggle theme"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        </Button>
      </div>

      <div class="grid grid-cols-3 gap-2">
        <Button
          variant={(mode.current as any) === "light" ? "default" : "outline"}
          size="sm"
          onclick={() => setThemeMode("light")}
          aria-label="Light theme"
          aria-pressed={(mode.current as any) === "light"}
        >
          Light
        </Button>
        <Button
          variant={(mode.current as any) === "dark" ? "default" : "outline"}
          size="sm"
          onclick={() => setThemeMode("dark")}
          aria-label="Dark theme"
          aria-pressed={(mode.current as any) === "dark"}
        >
          Dark
        </Button>
        <Button
          variant={(mode.current as any) === "system" ? "default" : "outline"}
          size="sm"
          onclick={() => setThemeMode("system")}
          aria-label="System theme"
          aria-pressed={(mode.current as any) === "system"}
        >
          Auto
        </Button>
      </div>
    </Card.Content>
  </Card.Root>
</div>
