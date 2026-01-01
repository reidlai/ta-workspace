# Technical Analysis Workspace

## Overview

This project is a **Proof of Concept (PoC)** demonstrating a modern, scalable architecture for AI-assisted development. It focuses on four key pillars:

1.  **AI Agent Integration**: Adapting Google **Antigravity** and **Claude Code** to the [GitHub SpecKit](https://github.com/github/speckit) standard using `AGENTS.md`, `CLAUDE.md`, and `.agent/workflows`. This standardizes how AI agents understand and interact with the codebase.
2.  **Monorepo Management**: Implementing a high-performance monorepo using [Moonrepo](https://moonrepo.dev) for consistent tooling, caching, and task orchestration across multiple projects.
3.  **SOLID Principles**: Adhering to SOLID design principles to ensure code maintainability, testability, and scalability.
4.  **AppShell Architecture**: Utilizing a **Virtual Module Pattern** to create a framework-agnostic host (AppShell). This enables cross-platform and cross-stack integration (e.g., SvelteKit, Next.js, Flutter) by dynamically loading feature modules at runtime.

## Architecture

The system is built on a high-performance monorepo foundation, supporting a modular AppShell architecture for both frontend and backend.

### 1. Monorepo Structure
Managed by **Moonrepo**, the workspace separates end-user applications from reusable logic:
*   **`apps/`**: Hosts for the AppShells (e.g., `sv-appshell`, `ta-server`).
*   **`modules/`**: Feature-specific logic (e.g., `watchlist`, `portfolio`) shared across apps.
*   **Toolchain**: Deterministic Node.js and pnpm versions ensured by Moonrepo.

[📄 Read Monorepo Architecture](docs/MONOREPO-ARCHITECTURE.md)

### 2. Frontend AppShell (`sv-appshell`)
A **SvelteKit**-based host that implements the **Virtual Module Pattern**.
*   **Dynamic Loading**: Modules are discovered and injected at runtime via `ModuleLoader`.
*   **Registry**: A singleton managing widgets, routes, and services from injected modules.
*   **Framework Agnostic**: Designed to maximize code reuse across frameworks via ReactiveX.

[📄 Read AppShell Architecture](docs/APPSHELL-ARCHITECTURE.md)

### 3. Backend AppShell (`ta-server`)
A **Go**-based API server leveraging the **Goa Framework**.
*   **Design-First**: APIs defined in DSL, generating transport-agnostic code.
*   **Modular Wiring**: Services like `watchlist` and `portfolio` are injected into the server core.
*   **Clean Architecture**: Separation of HTTP transport (Chi router) from business logic.

[📄 Read API Server Architecture](docs/API-SERVER.md)

## Virtual Module Injection Architecture

The AppShell uses a **Virtual Module Pattern** to dynamically inject features at runtime, enabling a loose coupling between the host application and feature packages.

### How It Works

1.  **Configuration**: The enabled modules are defined in [`apps/sv-appshell/static/modules.json`](apps/sv-appshell/static/modules.json). The AppShell reads this file at runtime to filter which available modules should be loaded.
    ```json
    {
        "modules": [
            { "id": "watchlist-module", "enabled": true, "src": "watchlist" },
            { "id": "portfolio-module", "enabled": true, "src": "portfolio" }
        ]
    }
    ```
2.  **Discovery**: At build/runtime, the `ModuleLoader` uses `import.meta.glob` to find all available modules in the workspace matching the pattern `modules/*/*/src/index.ts`. It matches these against the `src` property from the configuration.
2.  **Initialization**: Each found module exports an `init()` function that returns an `IModuleBundle`.
3.  **Registration**: The returned bundle is registered with the **Registry Singleton**, making its widgets, routes, and services available to the AppShell.

### Code Example

**1. Module Definition (`modules/watchlist/svelte/src/index.ts`):**
```typescript
export const init: ModuleInit = async (context) => {
    return {
        id: 'watchlist',
        widgets: [{
            id: 'my-tickers',
            title: 'My Tickers',
            component: MyTickersWidget, // Svelte Component
            location: 'dashboard'
        }]
    };
};
```

**2. AppShell Consumption (`apps/sv-appshell/src/routes/+page.svelte`):**
```svelte
<script>
  import { Registry } from "@core/registry";
  const registry = Registry.getInstance();
  const myTickersWidget = registry.getWidget("my-tickers");
</script>

{#if myTickersWidget}
  <svelte:component this={myTickersWidget.component} />
{/if}
```

[📄 read more details in APPSHELL-ARCHITECTURE.md](docs/APPSHELL-ARCHITECTURE.md)

### Anatomy of a Virtual Module

Each module (e.g., `modules/watchlist`) is composed of several configuration files that work together:

| File | Location | Purpose |
| :--- | :--- | :--- |
| **`modules.json`** | `apps/sv-appshell/static/` | **Runtime Config**. Tells the AppShell which modules to load and enable. Maps logical IDs to source paths. |
| **`tsconfig.base.json`** | `root` | **Global Path Aliases**. Defines paths like `@modules/watchlist-ts` so you can import across the monorepo without relative paths. |
| **`moon.yml`** | `modules/<feature>/<stack>/` | **Build Orchestration**. Defines the folder as a Moonrepo project. Specifies tasks (`build`, `test`, `lint`) and dependencies. |
| **`tsconfig.json`** | `modules/<feature>/<stack>/` | **Type Config**. Extends `tsconfig.base.json` to inherit aliases but adds framework-specific types (e.g., `svelte`, `vite/client`). |
| **`go.mod`** | `modules/<feature>/go/` | **Backend Dependency**. Defines the Go module scope and dependencies (e.g., Goa framework) for the server-side component. |

## Prerequisites

- Node.js v20 (Managed automatically by Moonrepo)
- pnpm (Managed automatically by Moonrepo)


## Getting Started

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```

2. **Setup Workspace**:
   ```bash
   npx @moonrepo/cli setup
   ```

3. **Verify Configuration**:
   ```bash
   npx @moonrepo/cli project-graph
   ```
   This will display all configured projects and their dependencies.

## Quick Start

For most developers, you'll want to start the development server:

```bash
npx @moonrepo/cli run sv-appshell:dev
```

Then open **http://localhost:5173** in your browser to see the app.

## Development

### Workspace-Wide Commands

These commands run across **all projects** in the monorepo (useful for CI/CD or verifying everything works):

- **Build All Projects**: `npx @moonrepo/cli run :build`
  - Compiles all libraries and applications
  - Use this to verify everything compiles before committing
  
- **Test All Projects**: `npx @moonrepo/cli run :test`
  - Runs tests across all projects
  
- **Lint All Projects**: `npx @moonrepo/cli run :lint`
  - Lints all projects

### Module Management

Manage feature modules globally across the monorepo:

- **Add Module**: `npx @moonrepo/cli run :add-module`
  - Clones a remote repository as a new feature module
- **Delete Module**: `npx @moonrepo/cli run :delete-module`
  - Removes a module and cleans up configuration
- **Rename Module**: `npx @moonrepo/cli run :rename-module`
  - Renames a module and refactors internal references

> **Note**: The `:build` command compiles projects but does **not** start a development server.

## Applications

### sv-appshell
The main SvelteKit application shell.

#### Development (Most Common)

- **Start Dev Server**: `npx @moonrepo/cli run sv-appshell:dev`
  - Opens dev server at **http://localhost:5173**
  - Supports hot module reloading
  - **This is what you use for day-to-day development**

#### Other Commands

- **Build Production**: `npx @moonrepo/cli run sv-appshell:build`
  - Creates optimized production build
  
- **Preview Production Build**: `npx @moonrepo/cli run sv-appshell:preview`
  - Previews the production build locally

### ta-server
A Go-based server built with [Goa framework](https://goa.design/) and [Cobra](https://github.com/spf13/cobra) CLI.

Supports multiple server types:
- `api-server`: REST API (Goa)
- `mcp-server`: MCP protocol (future)

#### Running the API

```bash
cd apps/ta-server

# Start the REST API server (default: localhost:8080)
go run . api-server

# With custom port
go run . api-server --port 9000

# View help
go run . --help
go run . api-server --help
```

#### Using Moonrepo (Recommended)

To run via Moonrepo (ensures correct environment), use `--` to pass arguments:

```bash
# Start API server
npx @moonrepo/cli run ta-server:run -- api-server

# With flags
npx @moonrepo/cli run ta-server:run -- api-server --port 9000
```

#### Configuration

The CLI supports multiple configuration sources (highest precedence first):
1. **CLI flags**: `--port 9000`
2. **Environment variables**: `TAASSISTANT_API_SERVER_PORT=9000`
3. **Config file**: `taassistant.yaml`

#### API Endpoints

- **Watchlist Service** (`/watchlist`): Manage user watchlist entries
- **Insights Service** (`/insights`): Get AI-powered trading insights

> **Note**: Goa generates OpenAPI specs—use Swagger UI or Postman for API testing.

---

## Common Workflows

### First Time Setup
```bash
pnpm install
npx @moonrepo/cli setup
npx @moonrepo/cli project-graph  # Verify configuration
```

### Daily Development
```bash
npx @moonrepo/cli run sv-appshell:dev  # Start dev server
# Open http://localhost:5173 in browser
```

### Before Committing
```bash
npx @moonrepo/cli run :build  # Ensure everything compiles
npx @moonrepo/cli run :lint   # Check for linting errors
npx @moonrepo/cli run :test   # Run all tests
```

---

See [Moonrepo Documentation](https://moonrepo.dev/docs) for more details.

## License

This project is licensed under the **MIT License**.

> **Disclaimer**: This is a Proof of Concept (PoC) project provided "AS IS", without warranty of any kind. The authors are not responsible for any bugs, data loss, or issues arising from the use of this software. Use at your own risk.

[📄 Read Full License](LICENSE)
