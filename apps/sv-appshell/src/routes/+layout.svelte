<script>
  import '../app.css';
</script>

<div class="app-shell">
  <header>
    <h1>SV App Shell</h1>
    <nav>
      <a href="/">Home</a>
      <!-- Links could be dynamic based on registry -->
    </nav>
  </header>

  <main>
    <slot />
  </main>
</div>

<style>
  .app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  header {
    background: #333;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  }
  header a {
    color: white;
    text-decoration: none;
    margin-left: 1rem;
  }
  main {
    flex: 1;
    padding: 1rem;
  }
</style>
