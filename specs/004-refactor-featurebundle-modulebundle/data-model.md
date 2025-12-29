# Data Model: Module Architecture

## Key Interfaces

### IModuleBundle

The root contract returned by a module's `init()` function.

```typescript
export interface IModuleBundle {
    /** Unique identifier for the module */
    id: string;
    /** Defines usage of dynamic widgets (Dashboard tiles, etc.) */
    widgets?: IWidget[];
    /** Optional imperative handlers (e.g. for menu actions) */
    handlers?: IHandler[];
    /** Services to register in the DI container */
    services?: Record<string, any>;
    /** Routes definition (kept for backward compat or dynamic routing) */
    routes?: IParamsRoute[];
}
```

### IWidget

Represents a visual component exported by the module.

```typescript
export interface IWidget {
    id: string;
    title: string;
    description?: string;
    /** The actual Svelte component constructor/class */
    component: any;
    /** Suggested location: 'dashboard', 'sidebar', 'header' */
    location?: string;
    /** Size hint: 'small', 'medium', 'large' */
    size?: 'small' | 'medium' | 'large';
    props?: Record<string, any>;
}
```

### IHandler

Represents an imperative action.

```typescript
export interface IHandler {
    id: string;
    title: string;
    icon?: string;
    execute: (context: IContext) => void | Promise<void>;
}
```
