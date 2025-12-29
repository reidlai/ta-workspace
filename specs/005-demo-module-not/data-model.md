# Data Model: Specific Widget Retrieval

## Key Entities

### Registry (Internal State)

The `Registry` singleton is updated to maintain a direct index of widgets.

```typescript
class Registry {
    // Primary storage for O(1) lookup
    private widgetMap: Map<string, IWidget>;
    
    // Derived or Computed
    // getWidgets() returns Array.from(this.widgetMap.values())
}
```

## API Contracts (Internal TypeScript API)

### Retrieve Specific Widget

`Registry.getInstance().getWidget(id: string): IWidget | undefined`

**Parameters:**
- `id` (string): The unique identifier of the widget to retrieve.

**Returns:**
- `IWidget`: The widget object if found.
- `undefined`: If no widget with the given ID exists.

**Behavior:**
- **Lookup**: O(1) complexity.
- **Uniqueness**: enforced at registration time.

### Registration (Behavior Change)

`register(bundle: IModuleBundle): void`

**Behavior Update:**
- When processing `bundle.widgets`:
  - For each widget, check `widgetMap.has(widget.id)`.
  - **If Exists**: Log warning `[Registry] Duplicate widget ID found: ${id}. Skipping registration.`. Do NOT overwrite.
  - **If New**: `widgetMap.set(widget.id, widget)`.
