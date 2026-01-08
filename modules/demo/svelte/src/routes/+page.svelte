<script lang="ts">
  import DemoWidget from '$lib/widgets/DemoWidget.svelte';
  import { status } from '$lib/stores/demo';
</script>

<div class="p-8 space-y-8">
  <h1 class="text-2xl font-bold">Demo Module Dev Preview</h1>
  
  <section>
    <h2 class="text-xl mb-4">Reactive Store Status</h2>
    <div class="p-4 bg-muted rounded">
      Status: <span class="font-mono text-primary">{$status}</span>
    </div>
  </section>

  <section>
    <h2 class="text-xl mb-4">Demo Widget</h2>
    <div class="max-w-md border rounded p-4">
       <DemoWidget />
    </div>
  </section>
</div>
