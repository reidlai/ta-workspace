# Research: Module Architecture Refactor

**Status**: Complete
**Method**: Architectural Analysis

## Decision: Replace IFeatureBundle with IModuleBundle
**Rationale**: 
- `IFeatureBundle` was vague. 
- `IModuleBundle` clearly provides `widgets` for UI injection (Dashboard, Sidebar) and optional `handlers` for imperative actions.
- Aligns with SvelteKit's component model (Widgets = Svelte Components).

## Alternatives Considered
- **Keep Gadgets**: "Gadget" term was ambiguous. "Widget" implies a visual component.
- **Handlers Only**: User explicitly rejected this. Widgets are needed for dashboard tiles.

## Unknowns Resolved
- **Widget Definition**: Defined as `{ id: string, component: any, location: string, size?: string }`.
- **Handler Definition**: Defined as generic action handler `{ id, execute: () => void }`.
