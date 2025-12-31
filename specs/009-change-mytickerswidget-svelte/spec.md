# Feature Specification: Update MyTickers Widget

**Feature Branch**: `009-change-mytickerswidget-svelte`
**Created**: 2025-12-31
**Status**: Draft
**Input**: User description: "change MyTickersWidget.svelte to use ShadCN Card to show number of tickers in watch list without data entry"

## User Scenarios & Testing

### User Story 1 - View Watchlist Summary (Priority: P1)

As a dashboard user, I want to see the total count of tickers in my watchlist formatted as a clean summary card, so that I can quickly gauge my monitoring scope without clutter.

**Why this priority**: The core request is to "show number of tickers" using the specific "ShadCN Card" style, emphasizing a visual upgrade and summary information.

**Independent Test**: Can be tested by checking if the widget renders a ShadCN Card containing the correct count of tickers and no input fields.

**Acceptance Scenarios**:
1. **Given** a watchlist with 5 tickers, **When** the dashboard loads, **Then** the MyTickers widget displays "5" (or "5 watched") prominently.
2. **Given** the widget is displayed, **When** inspecting the DOM, **Then** it uses ShadCN `Card` components (`Card.Root`, `Card.Header`, `Card.Content`).
3. **Given** the widget is displayed, **When** checking for interactive elements, **Then** NO input fields or "Add" buttons are present.

---

### User Story 2 - View Watched Tickers List (Priority: P2)

As a user, I want to see the list of tickers I am watching within the card, so that I can identify which specific assets make up the count.

**Why this priority**: While the prompt emphasized the "number of tickers" and "without data entry", retaining the existing list view (as read-only) preserves current functionality. Removing it effectively deletes the user's ability to see their watchlist.

**Independent Test**: Can be tested by verifying the list of tickers appears inside the card content.

**Acceptance Scenarios**:
1. **Given** a watchlist with tickers "AAPL" and "GOOGL", **When** viewing the widget, **Then** "AAPL" and "GOOGL" are listed.
2. **Given** the list is displayed, **When** interacting, **Then** there is no option to add new tickers (only potentially remove, if consistent with "without data entry" - assuming "data entry" means *input*, but removal might be preserved or removed. Default to keeping removal as it's not "entry").
   - *Refinement*: User selected **Strictly Read-Only**. No "Remove" button will be shown.

### Edge Cases

- **Empty Watchlist**: Widget should display "0" count and a friendly "No tickers watched" message (or empty state).
- **Long List**: Widget should handle overflow (e.g., scrollable content area within the Card).

## Requirements

### Functional Requirements

- **FR-001**: System MUST render `MyTickersWidget` using ShadCN UI `Card` components.
- **FR-002**: System MUST display the total count of tickers in the watchlist.
- **FR-003**: System MUST remove the "Add Ticker" input field, checkbox, and button.
- **FR-004**: System MUST display the list of current tickers.
- **FR-005**: System MUST allow scrolling if the ticker list exceeds the card height.
- **FR-006**: System MUST NOT provide any mechanism to remove tickers (Strictly Read-Only). Management (Add/Remove) interacts on `modules/watchlist` pages.
- **FR-007**: System MUST display the count of unique exchanges represented in the watchlist as subtext (e.g., "5 Tickers • 2 Exchanges").

### Key Entities

- **TickerItem**: `{ symbol: string, on_hand: boolean, ... }` - Managed by `watchlistService`.

## Assumptions & Dependencies

- Data entry (Add/Remove) is performed on dedicated pages within the `modules/watchlist` scope, not this widget.
- **Exchange Attribution**: Since `TickerItem` currently lacks exchange data, the widget will use a **Static Mapping** (e.g., AAPL -> "NASDAQ") on the frontend to derive the count. These exchange names MUST align with the **ISO 10383 MIC** standard established in Feature 007.


## Success Criteria

### Measurable Outcomes

- **SC-001**: Widget renders without any raw HTML/Tailwind classes for the container (must use Registry/ShadCN components).
- **SC-002**: Visual regression check confirms no input fields are visible.
- **SC-003**: User can identify total ticker count within 1 second of viewing the dashboard.
