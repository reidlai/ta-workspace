# Data Model: Exchange Listing

## Entities

### Exchange

Represents a financial market or institution filtered from ISO 10383.

| Field         | Type   | Description                            | Validation        |
| ------------- | ------ | -------------------------------------- | ----------------- |
| operating_mic | string | 4-character ISO 10383 code             | Required, 4 chars |
| exchange_name | string | Full descriptive name                  | Required          |
| display_name  | string | Formatter for UI (ACRONYM - NAME (CC)) | Required          |
| country       | string | ISO 3166 alpha-2 code                  | Required, 2 chars |
| city          | string | City location                          | Required          |
| acronym       | string | Short identifier                       | Optional          |

## Domain Logic

### Initialization

- **Action**: `LoadExchanges()`
- **Logic**:
  1. Open embedded `ISO10383_MIC.csv`.
  2. Decode ISO-8859-1 stream to UTF-8.
  3. Filter: `OPRT/SGMT == "OPRT"` AND `STATUS == "ACTIVE"`.
  4. Transform: Map CSV columns to `Exchange` fields.
  5. Compute: `display_name` = `{acronym} - {exchange_name} ({country})`.
  6. Store: Sort and load into global service state (slice).

### Search

- **Action**: `List(query string)`
- **Logic**:
  - If `query` is empty → return full list.
  - Else → filter items where `exchange_name` or `country` contains `query` (case-insensitive).
    基础
