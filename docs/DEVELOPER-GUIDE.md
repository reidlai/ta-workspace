# Developer Guide

This guide documents the available projects in this workspace and how their abstract Moonrepo tasks map to actual shell commands.

## Architecture Overview

The workspace is organized into:
- **Apps**: Deployable applications (`apps/`)
- **Modules**: Reusable functional components (`modules/`) containing sub-projects (frontend/backend/shared).

### Core References

The following documents in `virtual-module-core` are the authoritative references:

- [AppShell Architecture](https://github.com/reidlai/virtual-module-core/blob/main/docs/APPSHELL-ARCHITECTURE.md)
- [Virtual Module Architecture](https://github.com/reidlai/virtual-module-core/blob/main/docs/VIRTUAL-MODULE-ARCHITECTURE.md)
- [Monorepo Reference](https://github.com/reidlai/virtual-module-core/blob/main/docs/MONOREPO-REFERENCE.md)

## Git Submodule Workflow

Modules can be developed as **separate Git repositories** and integrated into the workspace using Git submodules. This enables independent versioning, CI/CD, and team ownership while maintaining workspace integration.

### Adding a Module as a Submodule

#### 1. Create the Module Repository

Create a new Git repository for your module (e.g., `github.com/yourorg/portfolio-virtmod`):

```bash
# In a separate directory
git init portfolio-virtmod
cd portfolio-virtmod

# Create module structure
mkdir -p go svelte ts
# ... add module code ...

git add .
git commit -m "Initial module structure"
git remote add origin git@github.com:yourorg/portfolio-virtmod.git
git push -u origin main
```

#### 2. Add as Submodule to Workspace

From the **workspace root** (`ta-workspace`):

```bash
# Add the submodule
git submodule add git@github.com:yourorg/portfolio-virtmod.git modules/portfolio

# Initialize and update
git submodule update --init --recursive

# Commit the submodule reference
git add .gitmodules modules/portfolio
git commit -m "Add portfolio module as submodule"
```

#### 3. Configure Workspace Integration

After adding the submodule, update workspace configuration files (see next section).

### Cloning a Workspace with Submodules

When cloning the workspace:

```bash
# Option 1: Clone with submodules in one command
git clone --recurse-submodules git@github.com:yourorg/ta-workspace.git

# Option 2: Clone then initialize submodules
git clone git@github.com:yourorg/ta-workspace.git
cd ta-workspace
git submodule update --init --recursive
```

### Working with Submodules

#### Updating a Submodule

```bash
# Enter the submodule directory
cd modules/portfolio

# Pull latest changes
git pull origin main

# Return to workspace root and commit the update
cd ../..
git add modules/portfolio
git commit -m "Update portfolio module to latest"
```

#### Making Changes in a Submodule

```bash
# Enter the submodule
cd modules/portfolio

# Create a branch and make changes
git checkout -b feature/new-widget
# ... make changes ...
git add .
git commit -m "Add new widget"
git push origin feature/new-widget

# Return to workspace root
cd ../..
# The workspace will track the new commit hash
git add modules/portfolio
git commit -m "Update portfolio module reference"
```

---

## Workspace-Level Configuration Files

These files live at the **workspace root** (not in individual modules) and configure the monorepo tooling. When adding a new module as a submodule, you must update these files.

### Required Configuration Files

#### 1. `.moon/workspace.yml`

**Purpose**: Defines Moonrepo workspace configuration and project discovery.

**Location**: `.moon/workspace.yml`

**When to Update**: When adding/removing modules or changing project structure.

**Example**:
```yaml
# https://moonrepo.dev/docs/config/workspace
projects:
  - 'apps/*'
  - 'modules/*/go'
  - 'modules/*/svelte'
  - 'modules/*/ts'
  - 'modules/demo'      # Root module config
  - 'modules/portfolio' # Root module config
  - 'modules/watchlist' # Root module config

vcs:
  manager: 'git'
  defaultBranch: 'main'
```

**Maintenance**: Add new module paths when adding submodules.

---

#### 2. `pnpm-workspace.yaml`

**Purpose**: Defines pnpm workspace packages for dependency management.

**Location**: `pnpm-workspace.yaml` (workspace root)

**When to Update**: When adding new Node.js/TypeScript packages.

**Example**:
```yaml
packages:
  - 'apps/*'
  - 'modules/*/svelte'
  - 'modules/*/ts'
```

**Maintenance**: Add new package paths when adding modules with `svelte` or `ts` sub-projects.

---

#### 3. `package.json`

**Purpose**: Workspace root package configuration and shared scripts.

**Location**: `package.json` (workspace root)

**When to Update**: When adding workspace-wide dependencies or scripts.

**Example**:
```json
{
  "name": "ta-workspace",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "moon": "moon",
    "dev": "moon run :start",
    "build": "moon run :build",
    "test": "moon run :test",
    "lint": "moon run :lint",
    "format": "moon run :format"
  },
  "devDependencies": {
    "@moonrepo/cli": "^1.31.7"
  },
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  }
}
```

**Maintenance**: Rarely needs updates unless adding workspace-wide tooling.

---

#### 4. `go.work`

**Purpose**: Go workspace configuration for multi-module Go development.

**Location**: `go.work` (workspace root)

**When to Update**: When adding new Go modules.

**Example**:
```go
go 1.22

use (
    ./apps/go-server
    ./modules/demo/go
    ./modules/portfolio/go
    ./modules/watchlist/go
)
```

**Maintenance**: Add `use ./modules/<module>/go` for each new Go module.

---

#### 5. `tsconfig.base.json`

**Purpose**: Base TypeScript configuration inherited by all TS projects.

**Location**: `tsconfig.base.json` (workspace root)

**When to Update**: When changing TypeScript compiler options workspace-wide.

**Example**:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
```

**Maintenance**: Individual projects extend this with `"extends": "../../tsconfig.base.json"`.

---

#### 6. `.gitignore`

**Purpose**: Specifies files Git should ignore workspace-wide.

**Location**: `.gitignore` (workspace root)

**When to Update**: When adding new build artifacts or tool-specific files.

**Example**:
```gitignore
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
dist/
build/
.svelte-kit/
bin/

# Environment
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Moonrepo
.moon/cache/
```

**Maintenance**: Add patterns for new tools or build outputs.

---

#### 7. `.github/`

**Purpose**: GitHub-specific configuration (workflows, issue templates, etc.).

**Location**: `.github/` (workspace root)

**When to Update**: When adding CI/CD workflows or GitHub automation.

**Structure**:
```
.github/
├── workflows/
│   ├── ci.yml          # Main CI pipeline
│   ├── deploy.yml      # Deployment workflow
│   └── submodule-update.yml  # Auto-update submodules
├── ISSUE_TEMPLATE/
└── pull_request_template.md
```

**Example CI Workflow** (`.github/workflows/ci.yml`):
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive  # ⚠️ Critical for submodules
      
      - uses: moonrepo/setup-toolchain@v0
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run tests
        run: moon run :test
      
      - name: Run lints
        run: moon run :lint
```

**Maintenance**: Update workflows when adding new deployment targets or quality gates.

---

#### 8. `.pre-commit-config.yaml`

**Purpose**: Defines pre-commit hooks for code quality.

**Location**: `.pre-commit-config.yaml` (workspace root)

**When to Update**: When adding new linters or formatters.

**Example**:
```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files

  - repo: local
    hooks:
      - id: moon-test
        name: Run Moonrepo tests
        entry: moon run :test
        language: system
        pass_filenames: false
```

**Maintenance**: Add hooks for new tools or quality checks.

---

#### 9. `.eslintignore`, `.prettierignore`, `.gitattributes`

**Purpose**: Tool-specific ignore patterns and Git attributes.

**Location**: Workspace root

**When to Update**: When adding new generated code or binary files.

**`.eslintignore` Example**:
```
node_modules/
dist/
.svelte-kit/
gen/
*.config.js
```

**`.prettierignore` Example**:
```
node_modules/
dist/
.svelte-kit/
pnpm-lock.yaml
gen/
```

**`.gitattributes` Example**:
```
* text=auto
*.go text eol=lf
*.ts text eol=lf
*.js text eol=lf
*.json text eol=lf
*.md text eol=lf
```

---

#### 10. `threat_modelling/`

**Purpose**: Security threat models and documentation.

**Location**: `threat_modelling/` (workspace root)

**When to Update**: When adding new features with security implications.

**Structure**:
```
threat_modelling/
├── README.md
├── architecture.md
└── modules/
    ├── portfolio.md
    └── watchlist.md
```

**Maintenance**: Update when adding modules or changing architecture.

---

### Checklist: Adding a New Module Submodule

When adding a new module as a submodule, update these files:

- [ ] `.moon/workspace.yml` - Add project paths
- [ ] `pnpm-workspace.yaml` - Add package paths (if has `svelte`/`ts`)
- [ ] `go.work` - Add Go module path (if has `go`)
- [ ] `apps/sveltekit-appshell/svelte.config.js` - Add module alias
- [ ] `apps/sveltekit-appshell/vite.config.ts` - Add module alias
- [ ] `.github/workflows/` - Ensure `submodules: recursive` in checkout
- [ ] `threat_modelling/` - Add security documentation (if needed)
- [ ] Run `pnpm install` to update lockfile
- [ ] Run `moon sync` to update Moonrepo cache

---

## Project Tasks Reference

Run any task using: `moon run <project>:<task>`

### Applications

#### `sveltekit-appshell` (Typescript Frontend)
Main application shell.

| Task | Command | Description |
|------|---------|-------------|
| `start` | `vite dev --host` | Start the development server |
| `build` | `pnpm run build` | Build for production |
| `test` | `pnpm run test:unit` | Run unit tests |
| `lint` | `pnpm run lint` | Lint code |
| `format` | `pnpm run format` | Format code |

#### `go-server` (Go Backend)
Main API server.

| Task | Command | Description |
|------|---------|-------------|
| `start` | `go run . api-server` | Run the server |
| `build` | `go build -o go-server.exe .` | Build binary |
| `test` | `go test . ./cmd/... ./internal/...` | Run tests |
| `lint` | `go run github.com/golangci/golangci-lint/cmd/golangci-lint@latest run -v` | Lint code |
| `format` | `goimports -w .` | Format code |
| `gen` | `goa gen github.com/reidlai/ta-workspace/apps/go-server/design` | Generate code from design |

### Modules

All modules (e.g., `portfolio`, `watchlist`, `demo`) follow a standard structure with three possible sub-projects: Frontend (`svelte`), Backend (`go`), and Shared Logic (`ts`).

#### Root Project: `<module>`
Aggregates tasks across sub-projects.

| Task | Command | Description |
|------|---------|-------------|
| `build` | (Aggregated) | Builds all valid sub-projects |
| `test` | (Aggregated) | Tests all valid sub-projects |
| `lint` | (Aggregated) | Lints all valid sub-projects |
| `format` | (Aggregated) | Formats all valid sub-projects |
| `go-build` | `go build -v ./go/...` | Build Go backend (if exists) |
| `go-test` | `go test -v ./go/...` | Test Go backend (if exists) |
| `go-lint` | `golangci-lint run -v ./go/...` | Lint Go backend (if exists) |
| `go-format` | `goimports -w ./go` | Format Go backend (if exists) |
| `go-run` | `cd go && go run .` | Run Go server locally (if exists) |
| `goa-gen` | `goa gen ... --output gen/goa` | Generate Goa code to gen/goa/ |
| `ts-build` | `pnpm --dir ts build` | Build Shared TS logic (if exists) |
| `ts-lint` | `pnpm --dir ts lint` | Lint Shared TS logic (if exists) |
| `ts-test` | `pnpm --dir ts run test` | Test Shared TS logic (if exists) |
| `ts-format` | `pnpm --dir ts run format` | Format Shared TS logic (if exists) |
| `svelte-dev` | `pnpm --dir svelte dev` | Start Svelte dev server (if exists) |
| `svelte-build` | `pnpm --dir svelte build` | Build Svelte package (if exists) |
| `svelte-lint` | `pnpm --dir svelte lint` | Lint Svelte components (if exists) |
| `svelte-format` | `pnpm --dir svelte run format` | Format Svelte components (if exists) |
| `svelte-check` | `pnpm --dir svelte check` | Type-check Svelte (if exists) |
| `svelte-test` | `pnpm --dir svelte run test` | Test Svelte components (if exists) |
| `svelte-storybook` | `pnpm --dir svelte run story:dev` | Start Storybook (if exists) |

#### Frontend: `<module>-svelte`
Svelte 5 + Vite + Storybook.

| Task | Command | Description |
|------|---------|-------------|
| `dev` | `vite dev` | Start development server |
| `build` | `svelte-package` | Build component library |
| `check` | `svelte-check` | Type-check Svelte files |
| `lint` | `pnpm run lint` | Run ESLint |
| `test` | `vitest run` | Run component tests |
| `format` | `prettier --write .` | Format code |
| `storybook` | `pnpm run story:dev` | Start Storybook |

#### Shared: `<module>-ts`
TypeScript RxJS Logic.

| Task | Command | Description |
|------|---------|-------------|
| `build` | `tsc` / `pnpm build` | Transpile to JS |
| `lint` | `pnpm run lint` | Run ESLint |
| `test` | `vitest run` | Run unit tests |
| `format` | `prettier --write .` | Format code |

#### Backend: `<module>-go`
Goa v3 + Cobra + Viper.

| Task | Command | Description |
|------|---------|-------------|
| `build` | `go build ./...` | Verify compilation |
| `build-server` | `go build -o bin/server .` | Build executable |
| `start` | `./bin/server` or `go run` | Run server locally |
| `test` | `go test ./...` | Run unit tests |
| `lint` | `golangci-lint run` | Lint code |
| `format` | `goimports -w .` | Format code |
| `gen` | `goa gen ... --output gen/goa` | Generate code to gen/goa/ |

---

---

## Module Alias Configuration

Before developing modules, you must configure path aliases in the consuming application (e.g., `apps/sveltekit-appshell`) to enable cross-package imports.

### Why Aliases Are Needed

Modules use workspace dependencies (e.g., `"@modules/demo-ts": "workspace:*"`), but TypeScript/Vite need explicit path mappings to resolve imports like:
```typescript
import { DemoStateSchema } from '@modules/demo-ts/schema/demo';
```

### Configuration Steps

For each module's TypeScript package, add aliases to **both** config files in the consuming app:

#### 1. SvelteKit Config (`apps/sveltekit-appshell/svelte.config.js`)

```javascript
export default {
  kit: {
    adapter: adapter(),
    alias: {
      "@modules/demo-ts": "../../modules/demo/ts/src/index.ts",
      "@modules/portfolio-ts": "../../modules/portfolio/ts/src/index.ts",
      "@modules/watchlist-ts": "../../modules/watchlist/ts/src/index.ts",
      // ... other aliases
    },
  },
};
```

**Purpose**: Enables SvelteKit's SSR (server-side rendering) and routing to resolve module imports.

#### 2. Vite Config (`apps/sveltekit-appshell/vite.config.ts`)

```typescript
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@modules/demo-ts": path.resolve(__dirname, "../../modules/demo/ts/src/index.ts"),
      "@modules/portfolio-ts": path.resolve(__dirname, "../../modules/portfolio/ts/src/index.ts"),
      "@modules/watchlist-ts": path.resolve(__dirname, "../../modules/watchlist/ts/src/index.ts"),
      // ... other aliases
    },
  },
});
```

**Purpose**: Enables Vite's bundler and HMR (hot module replacement) to resolve module imports during development and build.

### Why Both Configs?

- **SvelteKit** handles routing, SSR, and framework-level imports
- **Vite** handles bundling, transpilation, and dev server
- Both need to know how to resolve `@modules/*` imports, but they use different configuration formats

### Alias Naming Convention

- Use `@modules/<module>-ts` for TypeScript packages (e.g., `@modules/demo-ts`)
- This matches the package name in `package.json`: `"name": "@modules/demo-ts"`
- Keeps imports consistent across the workspace

---

## Standard Module Workflow

This workflow emphasizes a **UI-First** design philosophy for modules like `portfolio` and `watchlist`. We start with visual components, define the data contract (Zod), and then propagate that contract down to the state management (RxJS) and backend API (Goa/Go).

### 1. UI Design & Component Library
**Goal**: Visually design widgets in isolation.

1.  **Create/Explore Widgets**:
    *   Path: `modules/<module>/svelte/src/lib/widgets/`
    *   Create separate files for logic and styles (e.g., `MyWidget.svelte`).
    *   **Requirement**: Use ShadCN Svelte components from `src/lib/components/ui` for consistency.

2.  **Storybook Driven Development**:
    *   Create `MyWidget.stories.ts` alongside the widget.
    *   Run `moon run <module>-svelte:storybook` to develop visually.
    *   Start designing here before touching any business logic.

3.  **Unit Testing**:
    *   Create `MyWidget.test.ts`.
    *   Test rendering and basic interactions using `vitest`.

### 2. Page Composition
**Goal**: Assemble widgets into layouts and pages.

4.  **Create Page Widgets**:
    *   Path: `modules/<module>/svelte/src/lib/pages/`
    *   Compose your individual widgets into a full page view (e.g., `DashboardPage.svelte`).

5.  **Route Integration**:
    *   Path: `modules/<module>/svelte/src/routes/`
    *   Create the route structure (e.g., `+page.svelte`).
    *   Import and use the "Page Widget" in the route file.
    *   This separates framework routing from UI implementation.

### 3. Data Contract (Zod Schemas)
**Goal**: Define the data shape as the single source of truth.

6.  **Zod Schema Definition**:
    *   **Path**: `modules/<module>/ts/src/schema/` ⚠️
    *   Define the exact shape of the data (e.g., `myWidgetSchema.ts`).
    *   **Critical**: Schemas live in the **TypeScript shared layer** (`ts/src/schema/`), NOT in the Svelte package.
    *   **Reason**: Avoids circular dependencies. The `svelte` package depends on `ts`, so schemas must be in `ts` to be imported by both services and UI.
    *   **Example**: `modules/demo/ts/src/schema/demo.ts`
    *   This Zod schema becomes the single source of truth for the API contract.

7.  **Export Schemas**:
    *   Update `modules/<module>/ts/src/index.ts` to export schemas:
    ```typescript
    export { MyWidgetSchema, type MyWidgetState } from "./schema/myWidget";
    ```

8.  **Svelte Runes**:
    *   Path: `modules/<module>/svelte/src/lib/runes/`
    *   Import schemas from `@modules/<module>-ts`:
    ```typescript
    import { MyWidgetSchema } from '@modules/<module>-ts/schema/myWidget';
    ```
    *   Create runes that strictly adhere to the Zod schema.
    *   State management should simply hold data matching the schema structure.

### 4. State Management (RxJS & TS)
**Goal**: Connect local state to application data streams.

9.  **RxJS Service Implementation**:
    *   Path: `modules/<module>/ts/src/services/`
    *   Import schemas from local `../schema/` directory:
    ```typescript
    import { MyWidgetSchema } from "../schema/myWidget";
    ```
    *   Create `BehaviorSubject` and `Observable` streams.
    *   **Validation**: All data flowing through these streams **must** be validated against the Zod schemas.
    *   **Example**:
    ```typescript
    public setData(data: MyWidgetState): void {
      try {
        MyWidgetSchema.parse(data);
        this._data$.next(data);
      } catch (error) {
        console.error("Invalid data:", error);
        throw error;
      }
    }
    ```
    *   **Unit Tests**: Validate that the BehaviorSubjects correctly hold and emit data matching the Zod schema.

10. **Export Services**:
    *   Update `modules/<module>/ts/src/index.ts` to export these services for the Svelte app to consume.

### 5. API Design (Goa)
**Goal**: Define the backend contract to match the frontend Zod schema.

11. **Goa Design DSL**:
    *   Path: `modules/<module>/go/design/`
    *   Translate the **Zod Schema** (from Step 6) into Goa DSL (`design/design.go`).
    *   Define payloads and results to match the Zod types exactly.
    *   *Tip*: Use an AI agent to map Zod → Goa DSL.

12. **Generate Interfaces**:
    *   Run `moon run <module>-go:goa-gen`.
    *   This generates the Go interfaces in `gen/goa/gen/` (Goa creates a nested structure).
    *   **Note**: Future projects may use `oapi-codegen` which would output to `gen/oapi/`.

### 6. Backend Implementation (Go)
**Goal**: fulfill the API contract.

13. **Implement API Services**:
    *   Path: `modules/<module>/go/pkg/`
    *   Create structs that implement the generated interfaces from `gen/`.
    *   Use `var _ gen.Service = (*Implementation)(nil)` to enforce compliance.
    *   **Testing**: logic should be tested with unit tests that verifying payloads match expectations (implying Zod compliance).

14. **Server Entry Point**:
    *   Path: `modules/<module>/go/main.go` & `cmd/`
    *   Ensure the new service is wired up in the dependency injection container.
    *   Running `moon run <module>-go:build-server` works.

## Architecture Summary

The workspace follows a **modular architecture** where feature modules can be developed independently and composed into applications. Each module follows a consistent structure with clear separation of concerns.

### Module Structure

```
modules/<module>/
├── ts/                              # Shared Logic Layer
│   ├── src/
│   │   ├── schema/                 # ✅ Zod schemas (single source of truth)
│   │   │   └── myWidget.ts
│   │   ├── services/               # ✅ RxJS services (validate against schemas)
│   │   │   └── MyService.ts
│   │   └── index.ts                # ✅ Export schemas + services
│   └── package.json
├── svelte/                          # UI Layer (SvelteKit)
│   ├── src/
│   │   └── lib/
│   │       ├── runes/              # ✅ Import from @modules/<module>-ts
│   │       └── widgets/            # ✅ Import from @modules/<module>-ts
│   └── package.json                # ✅ Depends on: "@modules/<module>-ts": "workspace:*"
└── go/                              # Backend Layer (Goa)
    ├── design/                      # ✅ Goa DSL (mirrors Zod schemas)
    └── pkg/                         # ✅ Implementation

Dependency Flow: svelte → ts ← go (one-way, no circular dependencies)
```

### Framework Extensibility

The architecture is **framework-agnostic** at the shared logic layer (`ts/`). While the current implementation uses **SvelteKit** for the frontend, the same RxJS services can be consumed by other frameworks:

#### Supported Frontend Frameworks

- **SvelteKit** (current) - `modules/<module>/svelte/`
- **Next.js** (future) - `modules/<module>/nextjs/`
  - Direct RxJS integration (no Redux needed)
  - Optional Redux for centralized state management
  - See [APPSHELL-ARCHITECTURE.md](https://github.com/reidlai/virtual-module-core/blob/main/docs/APPSHELL-ARCHITECTURE.md#nextjs-integration) for implementation details

- **Flutter** (future) - `modules/<module>/dart/`
  - RxDart mirrors RxJS patterns
  - Cross-platform: iOS, Android, Web, Desktop
  - See [APPSHELL-ARCHITECTURE.md](https://github.com/reidlai/virtual-module-core/blob/main/docs/APPSHELL-ARCHITECTURE.md#flutter--rxdart-integration) for implementation details

#### Supported Backend Languages

- **Go** (current) - `modules/<module>/go/`
  - Goa framework for design-first APIs
  - Type-safe service interfaces
  
- **Rust** (future) - `modules/<module>/rust/`
  - Can implement the same API contracts
  - Interoperable via HTTP/gRPC with Goa services
  - Shared OpenAPI specs ensure contract compatibility

### Why This Works

The **RxJS/Observable pattern** is the key to framework portability:

1. **Shared Runtime**: JavaScript/TypeScript runs in all web frameworks
2. **Observable Pattern**: `subscribe()` / `unsubscribe()` works universally
3. **Type Safety**: TypeScript types shared across all frameworks
4. **No Framework Lock-in**: Services are pure TypeScript + RxJS

**Example**: The same `WatchlistService` from `modules/watchlist/ts/` can be imported by:
- Svelte components (current)
- React/Next.js components (future)
- Flutter/Dart via RxDart (future)

### Detailed Architecture Documentation

For comprehensive details about the AppShell pattern, module loading, and framework integration examples, see:

📖 **[APPSHELL-ARCHITECTURE.md](./APPSHELL-ARCHITECTURE.md)**

This document covers:
- Virtual module interfaces and registration
- Frontend AppShell (SvelteKit) implementation
- Backend AppShell (Go/Goa) implementation
- Next.js integration patterns (with/without Redux)
- Flutter + RxDart integration
- MCP (Model Context Protocol) server extensibility
- RxJS + Svelte store integration patterns

---
