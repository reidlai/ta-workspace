<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  
  // Multi-step user journey demo
  let currentStep = 1;
  const totalSteps = 3;
  
  let formData = {
    name: '',
    email: '',
    preferences: ''
  };

  function nextStep() {
    if (currentStep < totalSteps) {
      currentStep++;
      // Update URL to reflect step (for browser history)
      if (typeof window !== 'undefined') {
        window.history.pushState({ step: currentStep }, '', `/demo/step-${currentStep}`);
      }
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      currentStep--;
      if (typeof window !== 'undefined') {
        window.history.pushState({ step: currentStep }, '', `/demo/step-${currentStep}`);
      }
    }
  }

  function handleSubmit() {
    console.log('Form submitted:', formData);
    alert('Journey complete! Check console for data.');
    currentStep = 1;
    formData = { name: '', email: '', preferences: '' };
  }

  // Handle browser back/forward
  if (typeof window !== 'undefined') {
    window.addEventListener('popstate', (event) => {
      if (event.state?.step) {
        currentStep = event.state.step;
      }
    });
  }
</script>

<div class="container mx-auto p-8 max-w-2xl">
  <h1 class="text-4xl font-bold mb-2">Demo Feature - Multi-Step Journey</h1>
  <p class="text-muted-foreground mb-8">Example of a custom user journey with browser history support</p>

  <Card.Root>
    <Card.Header>
      <Card.Title>Step {currentStep} of {totalSteps}</Card.Title>
      <Card.Description>
        {#if currentStep === 1}
          Enter your basic information
        {:else if currentStep === 2}
          Provide your contact details
        {:else}
          Set your preferences
        {/if}
      </Card.Description>
    </Card.Header>
    
    <Card.Content class="space-y-4">
      {#if currentStep === 1}
        <div>
          <label for="name" class="block text-sm font-medium mb-2">Name</label>
          <input
            id="name"
            type="text"
            bind:value={formData.name}
            class="w-full px-3 py-2 border rounded-md bg-background"
            placeholder="Enter your name"
          />
        </div>
      {:else if currentStep === 2}
        <div>
          <label for="email" class="block text-sm font-medium mb-2">Email</label>
          <input
            id="email"
            type="email"
            bind:value={formData.email}
            class="w-full px-3 py-2 border rounded-md bg-background"
            placeholder="Enter your email"
          />
        </div>
      {:else}
        <div>
          <label for="preferences" class="block text-sm font-medium mb-2">Preferences</label>
          <textarea
            id="preferences"
            bind:value={formData.preferences}
            class="w-full px-3 py-2 border rounded-md bg-background"
            placeholder="Tell us your preferences"
            rows="4"
          />
        </div>
      {/if}

      <div class="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          onclick={prevStep}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        {#if currentStep < totalSteps}
          <Button onclick={nextStep}>
            Next
          </Button>
        {:else}
          <Button onclick={handleSubmit}>
            Complete Journey
          </Button>
        {/if}
      </div>
    </Card.Content>
  </Card.Root>

  <div class="mt-8">
    <a href="/" class="text-primary hover:underline">← Back to Dashboard</a>
  </div>
</div>
