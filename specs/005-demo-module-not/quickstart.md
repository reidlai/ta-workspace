# Quickstart: Retrieve Specific Widget

## Developer Usage

### 1. Register a Module (Standard)

No changes needed to module registration, but ensure your widget IDs are unique.

```typescript
// modules/my-module/index.ts
const myWidget: IWidget = {
  id: "my-unique-widget",
  title: "My Widget",
  component: MyComponent,
};

return {
  id: "my-module",
  widgets: [myWidget],
};
```

### 2. Retrieve a Specific Widget

Use the new `getWidget` method on the Registry singleton.

```typescript
import { Registry } from "@core/registry";

// Get the registry instance
const registry = Registry.getInstance();

// Retrieve by ID
const widget = registry.getWidget("my-unique-widget");

if (widget) {
  console.log("Found widget:", widget.title);
  // Render it
} else {
  console.warn("Widget not found");
}
```

### 3. Handling Duplicates

Check the console during development.

```text
[Registry] Registered module: module-a
[Registry] Duplicate widget ID found: my-unique-widget. Skipping registration.
```
