# Feature Specification: ISO 10383 MIC Exchange Listing

**Feature Branch**: `007-exchange-listing`  
**Created**: 2025-12-30  
**Status**: Draft  
**Input**: User description: "Download https://www.iso20022.org/sites/default/files/ISO10383_MIC/ISO10383_MIC.csv as true source of MIC code list. Use the following logic in python to render exchange list implemented in modules/watchlist/go using golang so API can list exchange based on API Request"

## Clarifications

### Session 2025-12-30
- Q: Segment MIC Inclusion → A: Operating MICs Only (strictly follow reference code).
- Q: Search Logic Details → A: Case-insensitive Partial Match (Contains).
- Q: Runtime Data Access Strategy → A: Load Once at Startup (Fastest API, stays in RAM).
- Q: Local Data Corruption Handling → A: Fail Fast (App stops with error if parse fails).
- Q: API Pagination Strategy → A: Full List (Client-side filtering; best for UX/Simplicity).
- Q: UI Usage & Framework → A: API initialized during watchlist entry form; used to populate exchange select list. Design MUST use Goa.
- Q: Select List Item Formatting → A: Pre-formatted Label (e.g., "ACRONYM - FULL NAME (COUNTRY)").

## User Scenarios & Testing *(mandatory)*

### User Story 1 - List All Active Operating Exchanges (Priority: P1)

As a user or system administrator, I want to obtain a comprehensive list of all active operating exchanges globally, so that I can provide valid options for stock or asset tracking.

**Why this priority**: Core functionality and MVP. Without the list of exchanges, the system cannot reliably validate exchange-specific data.

**Independent Test**: Can be tested by calling the API endpoint and verifying it returns a non-empty list of exchanges sorted by country.

**Acceptance Scenarios**:

1. **Given** the system has access to the official ISO 10383 MIC data, **When** a request is made to list exchanges, **Then** only "Operating MICs" (OPRT) with "ACTIVE" status are returned.
2. **Given** a list of exchanges is retrieved, **When** viewed, **Then** the list is sorted primarily by ISO Country Code and secondarily by Exchange Name.

---

### User Story 2 - Search and Filter Exchanges (Priority: P2)

As a developer, I want to be able to filter the list of exchanges by country or name via the API, so that I can efficiently find the correct Market Identifier Code (MIC).

**Why this priority**: Enhances usability for large datasets (hundreds of exchanges).

**Independent Test**: Can be tested by passing a country code to the API and verifying only exchanges from that country are returned.

**Acceptance Scenarios**:

1. **Given** a request with a search query (e.g., country code "US"), **When** processed, **Then** the system returns only matching exchanges.

---

### Edge Cases

- **Source Unavailable**: How does the system handle a failure to download or access the latest `ISO10383_MIC.csv`?
- **Invalid CSV Format**: What happens if the CSV structure changes or contains unexpected data types?
- **Empty Result**: If filtering results in no matches, the system should return an empty but valid list structure.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST be able to process the ISO 10383 MIC CSV file as the authoritative source.
- **FR-002**: System MUST filter for records where `OPRT/SGMT` is `OPRT` (Operating MICs only) and `STATUS` is `ACTIVE`. Individual Segment MICs (SGMT) MUST be excluded.
- **FR-003**: System MUST expose the following fields for each exchange: `Operating_MIC`, `Exchange_Name`, `Country`, `City`, and `Acronym`.
- **FR-004**: System MUST sort the resulting exchange list by `Country` (primary) and `Exchange_Name` (secondary).
- **FR-005**: API design and implementation MUST use the **Goa** framework.
- **FR-006**: System MUST handle the CSV encoding (ISO-8859-1) correctly.
- **FR-007**: System MUST support bundling the MIC data as an embedded resource within the application binary.
- **FR-008**: System SHOULD provide a way to update the bundled data file via the standard build process (manual download and replacement of the source file).
- **FR-009**: Name-based search MUST perform case-insensitive partial matching (e.g., "Exchange" matches "Stock Exchange").
- **FR-010**: System MUST provide a pre-formatted `Display_Name` field for each exchange (e.g., "ACRONYM - FULL NAME (COUNTRY)") to ensure UI consistency.
- **FR-011**: The exchange list API MUST be optimized for initialization of the watchlist entry form.
- **FR-012**: System MUST load the processed exchange list into memory once during application initialization.
- **FR-013**: System MUST "Fail Fast" if the bundled MIC data is missing or fails to parse during initialization.

### Key Entities

- **Exchange**: Represents a financial market or institution.
  - `Operating_MIC`: 4-character ISO 10383 code.
  - `Exchange_Name`: Full descriptive name of the market.
  - `Display_Name`: Pre-formatted string for UI select lists.
  - `Country`: ISO 3166 alpha-2 country code.
  - `City`: Geographical location of the exchange.
  - `Acronym`: Short identifier for the exchange.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The generated exchange list matches the output of the reference Python/Polars logic when run against the same source data.
- **SC-002**: API response time for listing all exchanges is under 1 second.
- **SC-003**: 100% of returned exchanges have a status of "ACTIVE" in the source data.
- **SC-004**: The list contains all entities that meet the filtering criteria from the official ISO dataset.
