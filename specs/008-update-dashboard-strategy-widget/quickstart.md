# Quickstart: Update Dashboard Strategy Widget

**Feature**: 008-update-dashboard-strategy-widget  
**Date**: 2025-12-30

## Prerequisites

- Node.js 1 (managed by Moonrepo/proto)
- Go 1.22+ (managed by Moonrepo/proto)
- pnpm 8.12.0 (managed by Moonrepo/proto)
- WSL2 (if on Windows)

## Setup

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Verify Moonrepo setup**:
   ```bash
   npx @moonrepo/cli --version
   ```

## Development Workflow

### Frontend Development

1. **Start the SvelteKit dev server**:

   ```bash
   npx @moonrepo/cli run sv-appshell:dev
   ```

   Access at: `http://localhost:5173` (or network IP if using WSL)

2. **Watch for changes**:
   - Vite HMR automatically reloads on file changes
   - Check console for errors

### Backend Development

1. **Start the API server**:

   ```bash
   npx @moonrepo/cli run ta-server:run
   ```

   API available at: `http://localhost:8080`

2. **Regenerate Goa code** (after design changes):
   ```bash
   cd apps/ta-server
   goa gen github.com/reidlai/ta-workspace/modules/portfolio/go/design
   goa gen github.com/reidlai/ta-workspace/modules/watchlist/go/design
   ```

### Running Both Servers

Open two terminal windows:

- **Terminal 1**: `npx @moonrepo/cli run ta-server:run`
- **Terminal 2**: `npx @moonrepo/cli run sv-appshell:dev`

## Testing Scenarios

### Manual Verification

1. **Dashboard Widget Display**:
   - Navigate to `http://localhost:5173`
   - Verify second gadget shows "Total Revenue" card
   - Verify balance displays "$1,250.00"
   - Verify trend shows "+12.5%" with upward indicator

2. **Navigation**:
   - Click anywhere on the valuation card
   - Verify navigation to `/insights` page
   - Verify placeholder page loads without errors

3. **Responsive Design**:
   - Resize browser window
   - Verify card layout adapts using container queries
   - Check mobile viewport (375px width)

### Console Checks

- **No errors**: Console should be clean (SC-001)
- **Navigation timing**: Use DevTools Performance tab to verify < 200ms (SC-002)

## Common Issues

### Port 5173 Already in Use

```bash
# Kill existing Vite process
pkill -f vite
```

### Port 8080 Already in Use

```bash
# Kill existing Go process
pkill -f ta-server
```

### WSL Localhost Access Issues

- Use network IP instead: `http://172.25.122.170:5173`
- Or ensure `vite.config.ts` has `server.host: true`

## File Locations

- **Widget**: `modules/portfolio/svelte/src/widgets/PortfolioWidget.svelte`
- **Page**: `modules/portfolio/svelte/src/pages/PortfolioPage.svelte`
- **Dashboard**: `apps/sv-appshell/src/routes/+page.svelte`
- **ShadCN Cards**: `apps/sv-appshell/src/lib/components/ui/card/`
