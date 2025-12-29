# AppShell Workspace

## Overview

This repository is a monorepo managed by [Moonrepo](https://moonrepo.dev).

## Architecture

Packages are organized by **tech stack** for better scalability in a multi-framework monorepo:

- `apps/`: Application projects
  - `sv-appshell/`: SvelteKit application shell
    - `src/lib/`: Shared code & core modules
      - `types/`: Shared type definitions
      - `di/`: Dependency injection container
      - `registry/`: Feature registry and router
      - `features/`: Feature modules (e.g., `demo/`)
- `.moon/`: Moonrepo configuration

See [Architecture Documentation](docs/appshell-architecture.md) for deeper details.

## Feature Injection Architecture

The app shell uses a **dynamic module loading system** to inject feature packages at runtime.

### How It Works

1. **Feature Configuration** ([`static/modules.json`](apps/sv-appshell/static/modules.json))
   ```json
   {
     "modules": [
       {
         "id": "demo-module",
         "enabled": true,
         "src": "@modules/demo-module"
       }
     ]
   }
   ```

2. **App Shell Loader** ([`src/routes/+layout.ts`](apps/sv-appshell/src/routes/+layout.ts))
   - Fetches `modules.json` on app initialization
   - Dynamically imports each enabled feature package
   - Calls the feature's `init()` function with app context
   - Registers the feature bundle (routes, services) in the global Registry

3. **Feature Module** ([`src/lib/features/demo`](apps/sv-appshell/src/lib/features/demo))
   - Exports a default `init()` function
   - Returns a bundle containing:
     - **Routes**: Path and component mappings
     - **Services**: Shared services/utilities
   - Example structure:
     ```typescript
     export default async function init(context: IContext): Promise<IFeatureBundle> {
       return {
         id: 'demo-module',
         routes: [{ path: '/demo', component: DemoPage }],
         services: { 'DemoService': { sayHello: () => 'Hello!' } }
       };
     }
     ```

4. **Registry & Router** ([`src/lib`](apps/sv-appshell/src/lib))
   - `Registry`: Singleton that stores all loaded feature bundles
   - `RouterService`: Matches paths to feature routes and renders components

### Adding a New Feature

1. Create a new folder in `apps/sv-appshell/src/lib/features/your-feature`
2. Export a default `init()` function returning an `IFeatureBundle`
3. Add your feature to `apps/sv-appshell/static/modules.json` using the `$lib` path or logical ID
4. Rebuild and the app shell will auto-load it!

### Example: Demo Feature

Visit **http://localhost:5173/demo** to see the demo feature in action.

Check console logs to see:
- `[DemoModule] Initializing with context: DIContainer`
- `[Registry] Registered module: demo-module`



## Security & Maintenance

### Vulnerability Management
This project prioritizes security. We have resolved all critical and high vulnerabilities (as of Late 2025) by:
- Enforcing modern dependencies (e.g., updating `@sveltejs/kit`).
- Using `pnpm` for stricter dependency resolution.
- Hardening configurations (e.g., `pnpm.overrides` for `cookie`).

To check for vulnerabilities:
```bash
pnpm audit
```

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
