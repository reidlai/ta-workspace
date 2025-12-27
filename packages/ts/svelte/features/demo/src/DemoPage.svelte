<script>
  export let bundle;
</script>

<div class="demo-feature">
  <h2>🎉 Demo Feature Loaded!</h2>
  <p>This component is from <code>@features/demo-feature</code></p>
  <p>Feature ID: <strong>{bundle?.id || 'demo-feature'}</strong></p>
  
  <div class="info">
    <h3>Feature Details:</h3>
    <ul>
      <li>Package: <code>packages/ts/svelte/features/demo</code></li>
      <li>Injected via: <code>apps/sv-appshell/src/routes/+layout.ts</code></li>
      <li>Configured in: <code>apps/sv-appshell/static/modules.json</code></li>
    </ul>
  </div>

  <p class="success">✅ Module injection is working!</p>
</div>

<style>
  .demo-feature {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }

  h2 {
    color: #0066cc;
    margin-bottom: 1rem;
  }

  .info {
    background: #f5f5f5;
    padding: 1.5rem;
    border-radius: 8px;
    margin: 1.5rem 0;
  }

  .info h3 {
    margin-top: 0;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd;
  }

  li:last-child {
    border-bottom: none;
  }

  code {
    background: #e0e0e0;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }

  .success {
    background: #4caf50;
    color: white;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
    margin-top: 2rem;
  }
</style>
