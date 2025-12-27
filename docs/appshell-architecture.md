# App Shell Architecture

The `sv-appshell` is a SvelteKit application designed as a modular host for feature bundles.

## Core Concepts

### 1. Dependency Injection (DI)
The shell uses a custom, lightweight DI container (`@shared/core/src/di/Container.ts`) to manage services and configuration.

- **Container**: Holds service instances.
- **Context**: Passed to module initialization functions.

### 2. Module Registry
The `Registry` (`@shared/core/src/registry/Registry.ts`) is a singleton that stores loaded feature bundles.

- **Feature Bundle**: Defines routes, state, and services.
- **Registration**: Modules are registered at runtime (e.g., in `+layout.ts`).

### 3. Dynamic Routing
The shell handles routing via a catch-all route (`src/routes/[...rest]/+page.svelte`).

- **Router Service**: Matches the current URL path against registered module routes.
- **Rendering**: Dynamically mounts the component associated with the matched route.

## Module Structure

Modules are strictly typed via `@shared/typescripts`.

```typescript
export const init: ModuleInit = async (context) => {
  return {
    id: 'my-feature',
    routes: [ { path: '/my-feature', component: MyComponent } ]
  };
};
```

## Adding a New Module

1. Create a package in `packages/features/`.
2. Implement `src/index.ts` conforming to `ModuleInit`.
3. Add the package dependency to `apps/sv-appshell/package.json`.
4. Update `apps/sv-appshell/static/modules.json` to enable it.
