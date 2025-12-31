# Quickstart: MyTickersWidget Update

## Prerequisites

- Node.js 20+
- `pnpm` installed
- `moon` installed

## Running the Dashboard

1. Start the app shell:
   ```bash
   npx @moonrepo/cli run sv-appshell:dev
   # OR
   cd apps/sv-appshell && npx vite dev --host
   ```
2. Open browser to `http://localhost:5173`.

## Verifying the Widget

1. Locate the **My Tickers** card on the dashboard.
2. Verify:
   - It looks like a ShadCN Card (white background, shadow, border).
   - It displays the count of tickers.
   - **It displays the Exchange Count subtext (e.g., "• X Exchanges").**
   - It lists the tickers.
   - There are NO input fields or "Add" buttons.
   - There are NO "Remove" buttons.
3. If the watchlist is empty, verify "0" count and empty state message.
