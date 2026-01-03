# Feature Specification: Module Architecture Refactor

**Feature Branch**: `004-refactor-featurebundle-modulebundle`
**Created**: 2025-12-29
**Status**: Draft
**Input**: User description: "Refactor FeatureBundle to ModuleBundle and replace Gadgets with Handlers"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Developer Defines a Module Journey (Priority: P1)

As a Module Developer, I want to define my module's capabilities using `IModuleBundle` so that the App Shell can discover and invoke my features. I want to define "Handlers" that control the user journey (e.g., opening a page), rather than just exporting static widgets.

**Why this priority**: Fundamental architectural change required to support the new "User Journey" driven navigation model.

**Independent Test**:

- Create a test module implementing `IModuleBundle`.
- Verify it exports a `Handler`.
- Verify it does _not_ export a `Gadget` directly in the bundle properties.

**Acceptance Scenarios**:

1. **Given** a new module, **When** I implement `init`, **Then** it returns an `IModuleBundle`.
2. **Given** an `IModuleBundle`, **When** I inspect properties, **Then** it has `handlers` but no `gadgets`.

---

### User Story 2 - User Navigates via Handler (Priority: P1)

As an App User, I want to click a menu item that triggers a Module Handler, so that I am taken to the correct page or journey defined by that module.

**Why this priority**: Validation that the new architecture supports the core user interaction (navigation).

**Independent Test**:

- Mock an App Shell with a Sidebar.
- Click a link associated with a Handler.
- Verify the Handler executes and navigates to the expected route.

**Acceptance Scenarios**:

1. **Given** the App Shell is loaded, **When** I click "Demo Feature", **Then** the associated Handler is invoked and routes me to `/demo`.

---

## Clarifications

### Session 2025-12-29

- Q: Clarify definition of "Widget" vs "Handler" → A: Option A - "Widget" is a specialized Component definition `{ id, component, location }` for dynamic rendering (e.g. Dashboard tile), while "Handler" controls navigation actions.
- Q: Clarify need for "Handlers" → A: User clarified that Handlers are NOT valid. The system should rely solely on Widgets (and presumably standard Routes) for integration.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The system MUST define an `IModuleBundle` interface replacing `IFeatureBundle`.
- **FR-002**: `IModuleBundle` MAY include a `widgets` property (formerly "gadgets") returning a list of `IWidget` definitions.
- **FR-003**: `IModuleBundle` MAY include an optional `handlers` property for defining navigation actions or commands.
- **FR-004**: The `init` function of a module MUST return `Promise<IModuleBundle>`.
- **FR-005**: The App Shell MUST support both `widgets` (for UI embedding) and `handlers` (for imperative actions/navigation), allowing modules flexibility.

### Key Entities

- **IModuleBundle**: The new contract for modules.
- **IWidget**: A strong-typed definition for embeddable UI components `{ id, component, location, size }`.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 100% of existing modules (Demo) successfully migrate to `IModuleBundle`.
- **SC-002**: `IFeatureBundle` is completely removed from the codebase.
- **SC-003**: Navigation to module pages works correctly using the new Handler mechanism.
