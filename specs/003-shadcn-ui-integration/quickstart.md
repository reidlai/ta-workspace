# ShadCN UI Integration - Developer Quickstart

## Overview

This guide helps developers integrate new feature modules into the SvelteKit application shell using the ShadCN UI dashboard system.

## Prerequisites

- Node.js 20+
- pnpm 8+
- Basic understanding of SvelteKit and Svelte 5

## Quick Start

### 1. Create a New Feature Module

```bash
# Create module structure
mkdir -p packages/ts/svelte/features/my-feature/src
cd packages/ts/svelte/features/my-feature
```

Create `package.json`:

```json
{
  "name": "@svelte/my-feature",
  "version": "0.0.1",
  "main": "src/index.ts",
  "svelte": "src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {
    "@ts/types": "*",
    "@ts/registry": "*"
  }
}
```

### 2. Create Your Gadget Component

Create `src/MyGadget.svelte`:

```svelte
<script lang="ts">
  import { gadgetRegistry } from '@ts/registry';

  // Access shared state if needed
  const stateStore = gadgetRegistry.getStateStore();
  const myChannel = stateStore?.getChannel('my-feature.data', {});
</script>

<div class="p-4">
  <h3 class="font-semibold">My Feature Gadget</h3>
  <p class="text-muted-foreground">Your content here</p>
</div>
```

### 3. Register Your Gadget

Create `src/index.ts`:

```typescript
import MyGadget from "./MyGadget.svelte";
import { gadgetRegistry } from "@ts/registry";

// Register the gadget
gadgetRegistry.registerGadget({
  id: "my-feature-gadget",
  title: "My Feature",
  description: "Description of my feature",
  component: MyGadget,
  icon: "Star", // Lucide icon name
  priority: 5,
  size: "medium",
});

export { MyGadget };
```

### 4. Import in App Shell

Edit `apps/sv-appshell/src/routes/+layout.svelte`:

```svelte
<script>
  import '../app.css';
  import { ModeWatcher } from "mode-watcher";
  import '@svelte/demo';
  import '@svelte/my-feature'; // Add your module
  import { moduleState } from '$lib/stores/moduleState';
  import { gadgetRegistry } from '@ts/registry';

  gadgetRegistry.registerStateStore(moduleState);
</script>
```

### 5. Run the Application

```bash
pnpm install
pnpm dev -C apps/sv-appshell
```

Visit `http://localhost:5173` to see your gadget on the dashboard!

---

## Advanced Features

### Using Shared State

```typescript
// In your gadget component
const stateStore = gadgetRegistry.getStateStore();
const myData = stateStore?.getChannel<MyDataType>(
  "my-feature.data",
  initialValue,
);

// Update state
function updateData(newValue: MyDataType) {
  stateStore?.updateState("my-feature.data", newValue, "my-feature");
}

// Subscribe to changes
$: currentData = $myData;
```

### Registering a Service

```typescript
// src/MyService.ts
export class MyService {
  doSomething(input: string): string {
    return `Processed: ${input}`;
  }
}

// src/index.ts
import { MyService } from "./MyService";

const myService = new MyService();
gadgetRegistry.registerService("MyService", myService);
```

### Consuming a Service

```typescript
// In another module or component
const myService = gadgetRegistry.getService<MyService>("MyService");
if (myService) {
  const result = myService.doSomething("test");
}
```

### Creating a Multi-Step Journey

```typescript
// src/MyPage.svelte
let currentStep = 1;

function nextStep() {
  currentStep++;
  window.history.pushState(
    { step: currentStep },
    "",
    `/my-feature/step-${currentStep}`,
  );
}

// Handle browser back/forward
window.addEventListener("popstate", (event) => {
  if (event.state?.step) {
    currentStep = event.state.step;
  }
});
```

---

## Best Practices

### 1. Error Handling

Always wrap your gadget content in error boundaries:

```svelte
<GadgetErrorBoundary gadgetTitle="My Feature">
    <MyGadgetContent />
</GadgetErrorBoundary>
```

### 2. State Channel Naming

Use namespaced channel names:

- ✅ `my-feature.user-data`
- ✅ `my-feature.settings`
- ❌ `userData` (too generic)

### 3. Service Keys

Use descriptive, unique service keys:

- ✅ `MyFeatureService`
- ✅ `UserAuthenticationService`
- ❌ `Service` (too generic)

### 4. Gadget Priorities

- High priority (8-10): Critical features
- Medium priority (4-7): Standard features
- Low priority (1-3): Optional features

### 5. Accessibility

- Use semantic HTML
- Add ARIA labels for interactive elements
- Ensure keyboard navigation works
- Test with screen readers

---

## Testing Your Module

### Unit Tests

Create `src/MyGadget.spec.ts`:

```typescript
import { describe, it, expect } from "vitest";
import MyGadget from "./MyGadget.svelte";

describe("MyGadget", () => {
  it("should render", () => {
    const component = new MyGadget({
      target: document.createElement("div"),
    });
    expect(component).toBeDefined();
    component.$destroy();
  });
});
```

Run tests:

```bash
pnpm test:unit -C apps/sv-appshell
```

### BDD Tests

Create `features/my-feature/my-feature.feature`:

```gherkin
Feature: My Feature
  Scenario: User interacts with my feature
    Given the dashboard is loaded
    When I click on "My Feature"
    Then I should see the feature content
```

---

## Troubleshooting

### Gadget Not Appearing

1. Check that module is imported in `+layout.svelte`
2. Verify `registerGadget` is called
3. Check browser console for errors

### State Not Syncing

1. Ensure `ModuleStateStore` is registered in layout
2. Verify channel names match exactly
3. Check that `updateState` is called with correct parameters

### Service Not Found

1. Verify service is registered before use
2. Check service key spelling
3. Ensure module is loaded before service access

---

## UI Components

### Using ShadCN Components

The app shell provides Card and Button components:

```svelte
<script>
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>My Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>
    Content here
  </Card.Content>
</Card.Root>

<Button variant="outline" onclick={handleClick}>
  Click Me
</Button>
```

### Available Variants

**Button**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
**Sizes**: `default`, `sm`, `lg`, `icon`

---

## Resources

- [SvelteKit Documentation](https://kit.svelte.dev/)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/what-are-runes)
- [Tailwind CSS](https://tailwindcss.com/)
- [Project Spec](file:///c:/Users/reidl/GitLocal/appshell-workspace/specs/003-shadcn-ui-integration/spec.md)

---

## Support

For questions or issues:

1. Check the [walkthrough](file:///C:/Users/reidl/.gemini/antigravity/brain/b2c181fe-23f5-4c73-8635-fa02122d79f8/walkthrough.md)
2. Review existing modules in `packages/ts/svelte/features/demo`
3. Consult the implementation plan
