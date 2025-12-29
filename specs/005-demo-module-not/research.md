# Research: Retrieve Specific Widget

**Status**: Complete
**Method**: Architectural Reasoning

## Decision 1: Secondary Index for Widgets
**Context**: We need O(1) lookup for `getWidget(id)`. Currently, widgets are stored in a flat array `private widgets: IWidget[] = []`.
**Decision**: Introduce `private widgetMap = new Map<string, IWidget>()`.
**Rationale**: 
- `Map.get()` provides O(1) access.
- `Map` preserves insertion order (mostly), useful if we ever iterate.
- Allows efficient existence check `Map.has()` for uniqueness enforcement (FR-004).
- We will keep `widgets` array for `getWidgets()` to maintain backward compatibility and simple iteration, or replace it with `Array.from(widgetMap.values())`. Suggest replacing to avoid dual-source-of-truth drift.
**Alternatives**: 
- *Array.find*: O(N). Acceptable for small N, but O(1) is explicitly requested in plan/spec. 
- *Object*: `Record<string, IWidget>`. Keys are strings only. Maps are cleaner for dynamic keys and size checks.

## Decision 2: Uniqueness Handling
**Context**: FR-005 requires "Warning and Ignore" on duplicate.
**Decision**: In `register(bundle)`, before adding to map, check `widgetMap.has(widget.id)`. If true, `console.warn` and skip.
**Rationale**: 
- Strictly satisfies FR-005.
- Prevents overwriting valid widgets with potential garbage or malicious duplicates.
- "First-to-register wins" is a stable strategy given module load order.

## Implementation Details
- **Registry.ts**:
  - Add `private widgetMap = new Map<string, IWidget>();`
  - Update `register()`:
    - Iterate module widgets.
    - Check uniqueness.
    - Add to `widgetMap`.
  - Update `getWidgets()`: Return `Array.from(this.widgetMap.values())`.
  - Add `getWidget(id)`: Return `this.widgetMap.get(id)`.
  - Update `clear()`: `this.widgetMap.clear()`.
