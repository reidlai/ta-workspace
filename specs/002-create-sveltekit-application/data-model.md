# Data Model & Interfaces

**Feature**: sv-appshell
**Branch**: `002-create-sveltekit-application`

## Shared Interfaces (`packages/shared/typescripts`)

These interfaces define the contract between the App Shell and registered Modules.

### 1. `IFeatureBundle`

The standardized export from a module.

```typescript
export interface IFeatureBundle {
  /** Unqiue identifier for the module */
  id: string;
  /** Route definitions for dynamic runtime routing */
  routes: IParamsRoute[];
  /** Internal Svelte stores or state objects exposed to other modules (optional) */
  state?: Record<string, any>;
  /** Service implementations exposed to the DI container (optional) */
  services?: Record<string, any>;
}

export interface IParamsRoute {
  /** Path pattern (e.g., '/dashboard', '/users/:id') */
  path: string;
  /** Component constructor/import */
  component: any; 
  /** Layout preferences */
  layout?: {
    hideHeader?: boolean;
    hideSidebar?: boolean;
  };
}
```

### 2. `IContext`

The context passed to a module's `init` function.

```typescript
export interface IContext {
  /** Retrieve a service by key */
  getService<T>(key: string): T;
  /** Access application configuration */
  config: IAppConfig;
}
```

### 3. `IAppConfig`

Configuration injected into the application.

```typescript
export interface IAppConfig {
  apiBaseUrl: string;
  debugMode: boolean;
  featureFlags: Record<string, boolean>;
  /** Environment specific config */
  [key: string]: any;
}
```

### 4. `ModuleInit`

The factory function signature.

```typescript
export type ModuleInit = (context: IContext) => IFeatureBundle | Promise<IFeatureBundle>;
```

## Internal Entities (App Shell)

### 1. `Registry`

Simple singleton to hold loaded modules.

- `modules`: `Map<string, IFeatureBundle>`
- `services`: `Map<string, any>`

### 2. `ModuleConfig` (JSON)

Configuration file format for enabling modules.

```json
{
  "modules": [
    {
      "id": "user-profile",
      "enabled": true,
      "src": "./modules/user-profile" 
    }
  ]
}
```
