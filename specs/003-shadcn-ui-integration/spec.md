# Feature Specification: ShadCN UI Dashboard Integration

**Feature Branch**: `003-shadcn-ui-integration`  
**Created**: 2025-12-27  
**Status**: Draft  
**Input**: User description: "Standardize to use ShadCN UI as core UI framework for SvelteKit application ./apps/sv-appshell. Suppose SvelteKit app sv-appshell should initialize ShadCN UI. For example, if I have a dashboard required to show when web app start, each Gadget in Dashboard should be able to assign handler exported from different injected modules (define under packages/ts/svelte). Then these handler should create corresponding user journey or navigation defined in the corresponding module. These modules should also be able to accept SvelteKit states, export changed states, call exported functions, or called exported services"

## Clarifications

### Session 2025-12-27

- Q: When a module fails to load, what should happen to its dashboard gadget? → A: Hide the gadget entirely with no visual indicator
- Q: Should the dashboard layout be specified now or left as an implementation detail? → A: Implementation detail - layout strategy, positioning, and source code location will be decided during planning/development
- Q: What structure should gadgets follow? → A: Gadgets are organisms (Atomic Design) composed of ShadCN UI primitives (Card, Button, MenuItem, etc.). Modules provide complete custom components with centralized theme configuration at app startup

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Dashboard with Module-Based Gadgets (Priority: P1)

When the application starts, users see a dashboard displaying gadgets. Each gadget represents functionality from different feature modules, allowing users to quickly access key features and navigate to detailed views.

**Why this priority**: This is the core entry point for the application and demonstrates the module composition pattern that enables the extensible architecture.

**Independent Test**: Can be fully tested by launching the application and verifying the dashboard loads with at least one working gadget that navigates to its feature module.

**Acceptance Scenarios**:

1. **Given** the application starts, **When** the user accesses the home page, **Then** the dashboard displays with configured gadgets from enabled modules
2. **Given** a gadget is displayed on the dashboard, **When** the user clicks the gadget, **Then** the navigation changes to the module's defined route
3. **Given** multiple feature modules are enabled, **When** the dashboard loads, **Then** each module's gadget appears with its custom content

---

### User Story 2 - Module State Integration (Priority: P2)

Feature modules can access and modify application state through SvelteKit's state management, allowing gadgets and module views to display dynamic, reactive content based on shared application state.

**Why this priority**: Essential for building cohesive user experiences where actions in one module can affect display in other modules or the dashboard.

**Independent Test**: Can be tested by creating a module that updates shared state when interacted with, and observing that the dashboard or other modules reflect the change.

**Acceptance Scenarios**:

1. **Given** a module exports a handler function, **When** the handler updates shared state, **Then** other modules observing that state display the updated value
2. **Given** dashboard gadgets display state-derived data, **When** a module updates the underlying state, **Then** the relevant gadgets re-render with new data
3. **Given** a module accepts state as input, **When** state changes externally, **Then** the module's UI updates reactively

---

### User Story 3 - Module Service Invocation (Priority: P2)

Modules can export services that other modules or the shell can call, enabling feature modules to provide reusable functionality across the application without tight coupling.

**Why this priority**: Enables module interoperability and allows for shared business logic without replicating code across modules.

**Independent Test**: Can be tested by creating a module with an exported service, then calling that service from another module or the dashboard and verifying the expected behavior.

**Acceptance Scenarios**:

1. **Given** a module exports a service function, **When** another module calls that service, **Then** the service executes and returns the expected result
2. **Given** a gadget needs to display data from a module service, **When** the gadget invokes the service, **Then** the returned data is rendered correctly
3. **Given** multiple modules export services, **When** the shell or other modules discover available services, **Then** all registered services are accessible

---

### User Story 4 - Custom User Journeys per Module (Priority: P3)

Each module defines its own navigation structure and user journeys, allowing modules to control their internal routing and page flow while remaining integrated with the main application shell.

**Why this priority**: Provides module autonomy for complex features while maintaining consistency with the overall application navigation.

**Independent Test**: Can be tested by navigating to a module's route and verifying the module's internal navigation works independently of other modules.

**Acceptance Scenarios**:

1. **Given** a module defines multiple routes, **When** a user navigates within the module, **Then** the browser URL updates and the correct module views render
2. **Given** a module has a multi-step workflow, **When** the user progresses through steps, **Then** navigation state is maintained within the module
3. **Given** a user is within a module journey, **When** they use browser back/forward, **Then** the module respects navigation history

---

### Edge Cases

- **Module Load Failure**: When a module fails to load or initialize, its gadget is hidden entirely from the dashboard with no visual indicator (logged for developer monitoring).
- **Simultaneous State Updates**: The system MUST implement a reactive queue or "last-writer-wins" strategy for shared state updates to ensure atomicity and visual consistency.
- **Module Dependencies**: The shell MUST resolve module dependencies during the initialization phase. If Module A requires Service B, the system ensures Module B is initialized before Module A.
- **Handler Errors**: All gadget handlers MUST be wrapped in the `GadgetErrorBoundary`. Errors within a handler are caught, logged, and the specific gadget is replaced with a "temporarily unavailable" state without crashing the dashboard.
- **Disabled Modules**: Modules marked as disabled in `modules.json` are ignored by the registry; their gadgets and services are not registered.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST integrate ShadCN UI component library as the core UI framework for sv-appshell
- **FR-002**: System MUST display a dashboard as the default entry view when the application launches
- **FR-003**: Dashboard MUST support configurable gadgets, where each gadget is provided by a feature module
- **FR-004**: Feature modules MUST be able to export gadget components that can be rendered on the dashboard
- **FR-005**: Gadgets MUST support click handlers that trigger navigation to module-defined routes
- **FR-006**: Feature modules MUST be able to define custom routes and navigation structures
- **FR-007**: Modules MUST be able to access SvelteKit application state (stores, context)
- **FR-008**: Modules MUST be able to export state updates that affect shared application state
- **FR-009**: Modules MUST be able to export service functions callable by other modules or the shell
- **FR-010**: Shell MUST provide a registry or discovery mechanism for module-exported services and gadgets
- **FR-011**: System MUST gracefully handle module loading failures without crashing the dashboard
- **FR-012**: Each module MUST be able to accept configuration parameters from the shell (e.g., state, services, context)
- **FR-013**: System MUST support centralized theme configuration that applies to all ShadCN UI components across modules

### Key Entities

- **Dashboard**: The main landing view that composes gadgets from multiple modules
- **Gadget**: An organism-level UI component (Atomic Design) exported by a feature module. Gadgets are composed of ShadCN UI primitives (Card, Button, MenuItem, etc.) and rendered on the dashboard. Each gadget has an associated handler and follows the centralized theme defined at app startup
- **Feature Module**: A package under `packages/ts/svelte/features/*` that exports gadgets, routes, services, and handlers
- **Module Handler**: A function exported by a module that defines behavior (e.g., navigation, state updates) when triggered
- **Shared State**: Application-level state accessible to all modules (via SvelteKit stores or context)
- **Module Service**: A function or API exported by a module for use by other modules or the shell
- **Route Definition**: Navigation paths and corresponding components defined by a module
- **Theme Configuration**: Centralized styling configuration applied to all ShadCN UI components at application startup

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Dashboard loads and displays at least one gadget within 1 second of application start
- **SC-002**: Users can navigate from a dashboard gadget to a module's detailed view with a single click
- **SC-003**: Modules can update shared state, and dependent UI components reflect changes within 100ms
- **SC-004**: The system supports at least 10 concurrent feature modules without performance degradation
- **SC-005**: 95% of module initialization failures are gracefully handled without affecting other modules or the dashboard
- **SC-006**: Developers can add a new module with a gadget and service in under 30 minutes of work
- **SC-007**: All UI components use ShadCN UI styling, providing consistent visual design across modules

## Assumptions _(optional)_

- ShadCN UI for Svelte is available and compatible with the current SvelteKit version
- The existing module loading system (`@ts/registry`, dynamic imports) will be extended to support gadget and service registration
- Shared state will be managed using SvelteKit's built-in stores or runes
- Feature modules will follow a standard export contract (e.g., exporting a registration function that returns gadgets, routes, and services)
- **Dashboard implementation is flexible**: The layout strategy (grid, list, custom), positioning logic, and source code location (in sv-appshell, injected as module, or configurable) are implementation details to be decided during planning and development

## Dependencies _(optional)_

- Completion of demo module infrastructure (current working module system)
- ShadCN UI library for Svelte must be installed and configured
- Existing type definitions in `@ts/types` must be extended to include gadget and service interfaces
