<script lang="ts">
  import { goto } from "$app/navigation";
  import DemoWidget from "../lib/widgets/DemoWidget.svelte";
  import * as Card from "../lib/components/ui/card";
  import { Button, buttonVariants } from "../lib/components/ui/button";

  // Demo state
  let currentStep = 0;

  const steps = [
    {
      title: "Welcome to AppShell",
      description: "This is a demonstration of the modular architecture.",
      content:
        "Features are injected dynamically at runtime, allowing for a truly scalable monorepo structure.",
    },
    {
      title: "Feature Modules",
      description: "Self-contained units of functionality.",
      content:
        "Each module bundles its own routes, services, and widgets, keeping concerns separated.",
    },
    {
      title: "Ready to Build",
      description: "Start creating your own modules.",
      content:
        "Check the documentation to learn how to create and register new features.",
    },
  ];

  function nextStep() {
    if (currentStep < steps.length - 1) {
      currentStep++;
    } else {
      goto("/");
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
    }
  }
</script>

<div class="container mx-auto p-8 max-w-2xl">
  <h1 class="text-4xl font-bold mb-2">Demo Feature - Multi-Step Journey</h1>
  <p class="text-muted-foreground mb-8">
    This page is loaded from a dynamic feature module.
  </p>

  <Card.Root>
    <Card.Header>
      <Card.Title>{steps[currentStep].title}</Card.Title>
      <Card.Description>{steps[currentStep].description}</Card.Description>
    </Card.Header>
    <Card.Content>
      <p class="text-lg leading-relaxed">
        {steps[currentStep].content}
      </p>
    </Card.Content>
    <Card.Footer class="flex justify-between">
      <Button variant="outline" onclick={prevStep} disabled={currentStep === 0}>
        Previous
      </Button>
      <Button onclick={nextStep}>
        {currentStep === steps.length - 1 ? "Finish" : "Next"}
      </Button>
    </Card.Footer>
  </Card.Root>

  <div class="flex justify-center gap-2 mt-8">
    {#each steps as _, i}
      <div
        class="h-2 w-2 rounded-full transition-all duration-300 {i ===
        currentStep
          ? 'bg-primary w-4'
          : 'bg-muted'}"
      ></div>
    {/each}
  </div>

  <!-- Routing Examples Section -->
  <div class="mt-16 pt-12 border-t">
    <h2 class="text-3xl font-bold mb-6">SvelteKit Routing Examples</h2>
    <p class="text-muted-foreground mb-4">
      Explore basic and advanced routing patterns implemented in this module.
    </p>
    <a href="/routing" class={buttonVariants({ variant: "default" })}>
      View Routing Examples
    </a>
  </div>
</div>
