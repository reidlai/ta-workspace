# Feature Specification: Update Dashboard Portfolio Widget

**Feature Branch**: `008-update-dashboard-portfolio-widget`  
**Created**: 2025-12-30  
**Status**: Draft  
**Input**: User description: "Change the second gadget in Dashboard Gadget Section to use PortfolioSummaryWidget and should use ShadCN Card like the following code. I prefer this widget should show portfolio valuation balance. Once this widget clicked in dashboard, the page should show up"

## User Scenarios & Testing

### User Story 1 - View Portfolio Valuation (Priority: P1)

As a user, I want to see my portfolio valuation and trends on the dashboard so that I can quickly assess my performance.

**Why this priority**: High visibility information that adds immediate value to the dashboard.

**Independent Test**: Verify the dashboard loads and the second gadget displays the "Total Revenue" / Valuation card with correct mock data.

**Acceptance Scenarios**:

1. **Given** the user is on the dashboard (`/`), **When** the page loads, **Then** the second gadget displays a "Total Revenue" card with balance "$1,250.00" and value "+12.5%".
2. **Given** the card is displayed, **When** the user inspects the styling, **Then** it uses the ShadCN Card component design (clean, bordered, responsive).

---

### User Story 2 - Navigate to Portfolio Details (Priority: P1)

As a user, I want to click on the valuation card to see more details about my strategies.

**Why this priority**: Essential for navigation flow from summary to detail.

**Independent Test**: Click the card and verify URL change.

**Acceptance Scenarios**:

1. **Given** the user sees the valuation card, **When** they click anywhere on the card, **Then** the application navigates to the Portfolio page (e.g., `/portfolio` or related route).

---

## Requirements

### Functional Requirements

- **FR-001**: The system MUST replace the current content of `PortfolioSummaryWidget` (or the second dashboard gadget) with a ShadCN `Card` component.
- **FR-002**: The widget MUST display a portfolio valuation balance (e.g., "$1,250.00") and a trend indicator (e.g., "+12.5%").
- **FR-003**: The widget MUST use mock data for valuation as the backend does not currently support this metric.
- **FR-004**: The entire card MUST be interactive (clickable).
- **FR-005**: Clicking the card MUST navigate the user to the detailed Portfolio page (`/portfolio`).
- **FR-006**: The widget MUST maintain responsiveness using Tailwind CSS container queries (`@container`).

### Key Entities

- **Valuation Data**: Currently mock-only. Contains `balance` (Currency), `trend` (Percentage), `trendDirection` (Up/Down).


## Clarifications
### Session 2025-12-30
- Q: Target Route Implementation → A: Create a basic placeholder page (`/portfolio`) registered to complete the flow (Option A).

## Constraints & Architectural Requirements
- **Frontend Structure**: Move top-level page components to a `pages/` subfolder within their respective module directories. This applies to:
    - `modules/portfolio/svelte/src/pages/PortfolioPage.svelte` (New)
    - `modules/demo/svelte/src/pages/DemoPage.svelte` (Refactor)
- **TypeScript Services**: All `modules/**/ts/` services MUST be updated to retrieve latest API changes using ReactiveX (RxJS) patterns for reactive state management.
- **Backend Structure** (applies to both `portfolio` and `watchlist` modules):
    - **Design**: Move Goa design files to `modules/{module}/go/design`:
        - `/portfolio` design → `modules/portfolio/go/design`
        - `/watchlist` design → `modules/watchlist/go/design`
    - **Service**: Move service implementation logic to `modules/{module}/go/pkg`:
        - `modules/portfolio/go/pkg`
        - `modules/watchlist/go/pkg`

## Success Criteria

### Measurable Outcomes

- **SC-001**: Dashboard gadget renders without console errors or styling breakages.
- **SC-002**: Navigation to details page occurs within 200ms of click.
- **SC-003**: Visual design matches the user-provided mock (ShadCN style) with 100% fidelity.
- **SC-004**: Architectural restructuring (Svelte pages and Go backend files) is verified by file existence in new locations.
