# AppShell Workspace

## Overview

This repository is a monorepo managed by [Moonrepo](https://moonrepo.dev).

## Architecture

- `apps/`: Application projects
- `packages/`: Shared library projects
- `.moon/`: Moonrepo configuration

See [Architecture Documentation](docs/ARCHITECTURE.md) for deeper details.


## Prerequisites

- Node.js v20 (Managed automatically by Moonrepo)
- pnpm (Managed automatically by Moonrepo)

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Workspace**:
   ```bash
   npx @moonrepo/cli setup
   ```

3. **Verify Configuration**:
   ```bash
   npx @moonrepo/cli doctor
   ```

## Development

- **Run Build**: `npx @moonrepo/cli run :build`
- **Run Tests**: `npx @moonrepo/cli run :test`
- **Run Lint**: `npx @moonrepo/cli run :lint`

See [Moonrepo Documentation](https://moonrepo.dev/docs) for more details.
