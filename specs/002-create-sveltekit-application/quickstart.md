# Quickstart: sv-appshell

**Feature**: Create SvelteKit App Shell
**Branch**: `002-create-sveltekit-application`

## Prerequisites

- Node.js 20+ (Managed via Moonrepo)
- pnpm (Managed via Moonrepo)

## Setup

1.  **Install Dependencies**:
    ```bash
    moon setup
    ```

2.  **Infrastructure (SvelteKit App)**:
    The app is located at `apps/sv-appshell`.
    
    *Note: The app is created via the `002` feature implementation.*

## Running the App Shell

### Development Mode

Run the SvelteKit app in dev mode (with Hot Module Replacement).

```bash
moon run sv-appshell:dev
```

Access the app at `http://localhost:5173`.

### Production Build

Build the Docker-ready Node.js adapter output.

```bash
moon run sv-appshell:build
```

The output will be in `apps/sv-appshell/build`.

### Preview Production Build

```bash
moon run sv-appshell:preview
```

## Adding a Module

1.  Define your module in `apps/sv-appshell/src/lib/modules/` (or strictly, inject it via the shared interface if external).
2.  Implement `init(context): IFeatureBundle`.
3.  Register the module in `apps/sv-appshell/static/modules.json` (or equivalent config).
4.  Restart the dev server (if config is not hot-reloaded).

## Architecture

See [App Shell Architecture](../../docs/appshell-architecture.md) for details on DI, Registry, and Modules.
