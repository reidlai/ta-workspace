<script lang="ts">
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

    <div class="border rounded p-6 shadow-sm">
        <h2 class="text-2xl font-semibold mb-2">{steps[currentStep].title}</h2>
        <p class="text-muted-foreground mb-4">{steps[currentStep].description}</p>
        <p class="text-lg leading-relaxed mb-6">
            {steps[currentStep].content}
        </p>
        
        <div class="flex justify-between">
            <button
                class="px-4 py-2 border rounded hover:bg-muted disabled:opacity-50"
                onclick={prevStep}
                disabled={currentStep === 0}
            >
                Previous
            </button>
            <button 
                class="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
                onclick={nextStep}
            >
                {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </button>
        </div>
    </div>

    <div class="flex justify-center gap-2 mt-8">
        {#each steps as _, i}
            <div
                class="h-2 w-2 rounded-full transition-all duration-300 {i === currentStep ? 'bg-primary w-4' : 'bg-muted'}"
            ></div>
        {/each}
    </div>
</div>
