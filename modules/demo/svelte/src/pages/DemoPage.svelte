<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { goto } from "$app/navigation";
    import { fade, fly } from "svelte/transition";

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

    <div class="relative overflow-hidden min-h-[300px]">
        {#key currentStep}
            <div
                in:fly={{ x: 200, duration: 300, delay: 300 }}
                out:fly={{ x: -200, duration: 300 }}
                class="absolute w-full"
            >
                <Card.Root>
                    <Card.Header>
                        <Card.Title>{steps[currentStep].title}</Card.Title>
                        <Card.Description
                            >{steps[currentStep].description}</Card.Description
                        >
                    </Card.Header>
                    <Card.Content>
                        <p class="text-lg leading-relaxed">
                            {steps[currentStep].content}
                        </p>
                    </Card.Content>
                    <Card.Footer class="flex justify-between">
                        <Button
                            variant="outline"
                            on:click={prevStep}
                            disabled={currentStep === 0}
                        >
                            Previous
                        </Button>
                        <Button on:click={nextStep}>
                            {currentStep === steps.length - 1
                                ? "Finish"
                                : "Next"}
                        </Button>
                    </Card.Footer>
                </Card.Root>
            </div>
        {/key}
    </div>

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
</div>
