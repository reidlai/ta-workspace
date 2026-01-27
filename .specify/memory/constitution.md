<!--
Sync Impact Report:
- Version change: 1.1.0 -> 2.0.0 (Major architecture and workflow standardization)
- Modified Principles: 
    - "Branching, Protection, and Promotions" -> Refined to align with Release-Please and Monorepo flow.
    - "Environments & Configuration" -> Updated to reflect AppShell architecture.
    - "DevSecOps Gates" -> Aligned strict 6-stage pipeline from DEVSECOPS.md.
    - "Architecture & Standards" -> Explicitly mapped to virtual-module-core docs.
- Added Sections:
    - "UI-First Development Workflow" (Mandatory 9-step process).
    - "Virtual Module Architecture" (Polyglot structure, Registry, RxJS/Runes).
    - "Monorepo & Toolchain" (Moonrepo, pnpm, Go 1.24+).
- Removed Sections:
    - Deprecated generic "Engineering Principles" in favor of specific architectural constraints.
- Templates requiring updates: ✅ None (Templates logic remains valid, just stricter enforcement).
-->
# Constitution

## Purpose

This file defines immutable, non-negotiable engineering guardrails for this repository.
All specs, plans, and implementations MUST comply. Changes require the change-control
process below. This constitution is intentionally concise and enforceable.

## Scope

**Tech stack**: 
- **Frontend**: SvelteKit 2 + Svelte 5 (Runes) + TailwindCSS v4 + ShadCN.
- **Backend**: Go 1.24+ (Goa DSL) + Zodios (TypeScript Client).
- **Core**: RxJS 7+ for state management and transport decoupling.
- **Build System**: Moonrepo + pnpm v10.

**Architecture**: Polyglot Virtual Module Architecture orchestrated by an AppShell.

## Decision Rights & Change Control

**File ownership**: constitution.md is protected. Changes require a PR approved by:
Security Lead + Product Owner (PO) + one Maintainer.

**Recording**: Each change MUST include a rationale and enforcement impact in the PR
description and be labeled `constitution-change`.

**Effective date**: Changes take effect only after CI policy jobs pass and merge
protection gates are satisfied.

## Immutable Rules

### 1. Authority & Reference Architecture

The following documents in `virtual-module-core` are the **Single Source of Truth (SSOT)**. All designs and code MUST align with them:

-   **AppShell Architecture**: implementation of Registry pattern, Module Loading, and RxJS/Rune state adapters ([`APPSHELL-ARCHITECTURE.md`](https://github.com/reidlai/virtual-module-core/blob/main/docs/APPSHELL-ARCHITECTURE.md)).
-   **Virtual Module Pattern**: polyglot structure (go/ts/sveltekit), dependency injection, and Git submodule integration ([`VIRTUAL-MODULE-ARCHITECTURE.md`](https://github.com/reidlai/virtual-module-core/blob/main/docs/VIRTUAL-MODULE-ARCHITECTURE.md)).
-   **Monorepo Strategy**: Moonrepo for task orchestration and toolchain management ([`MONOREPO-REFERENCE.md`](https://github.com/reidlai/virtual-module-core/blob/main/docs/MONOREPO-REFERENCE.md)).
-   **Developer Guide**: The mandatory 9-step UI-First workflow ([`DEVELOPER-GUIDE.md`](https://github.com/reidlai/virtual-module-core/blob/main/docs/DEVELOPER-GUIDE.md)).

### 2. UI-First Development Workflow

Feature development **MUST** follow the strictly phased 9-step sequence:

1.  **UI Prototyping**: Create Svelte components with ShadCN and local `$state`.
2.  **Local Types**: Define props interfaces for Storybook.
3.  **Storybook**: Validate UX with stakeholders via `.stories.ts` (Loading, Error, Success).
4.  **State Adapter**: Create Svelte Runes (`.svelte.ts`) implementing the state interface.
5.  **API Contract**: Define Goa DSL (`design.go`) matching UI data needs.
6.  **Code Gen**: Run `goa gen`.
7.  **Backend Impl**: Implement Go service logic satisfying the generated interface.
8.  **Client Gen**: Generate Zodios/TypeScript client from OpenAPI.
9.  **Integration**: Wire RxJS Service (`.ts`) to Client and connect to Svelte Rune.

**Constraint**: Backend implementation starts ONLY after UI contracts are validated (Step 3).

### 3. Virtual Module Architecture

-   **Structure**: Modules MUST exist as independent Git submodules with `go/`, `ts/`, and `sveltekit/` layers.
-   **Dependency Flow**: `UI (Svelte)` → `Shared (RxJS/Zod)` → `Backend (Go)`. Circular dependencies are FORBIDDEN.
-   **Transport Independence**: UI components MUST NOT fetch data directly. They MUST subscribe to RxJS Observables exposed by the Shared layer.
-   **Registry Pattern**: Widgets, Routes, and Services MUST be registered with the AppShell Registry at runtime via `init()`.

### 4. DevSecOps & Security Gates

The 6-stage pipeline defined in `DEVSECOPS.md` and `.github/workflows/ci.yml` is **MANDATORY**:

1.  **SCA**: `govulncheck` and `pnpm audit` (High/Critical blocks).
2.  **Linting**: `prettier`, `go fmt`, `trailing-whitespace`.
3.  **Quality**: `moon lint` (ESLint), `go vet`.
4.  **Testing**: `moon test` (Vitest Unit, Go Unit).
5.  **SAST**: `gosec` (Go), `semgrep` (Polyglot) with strict error intervals.
6.  **Threat Model**: `pytm` automated diagram generation.

**Constraint**: No code reaches `main` if any gate fails. Security waivers require specific `security-waiver` labels and PO approval.

### 5. Monorepo & Toolchain

-   **Moonrepo**: The exclusive task runner. All tasks (build, test, lint) MUST be defined in `moon.yml`.
-   **Consistency**: CI and Local environments MUST use Moonrepo's toolchain management to pin Node.js (v20+) and Go (v1.24+).
-   **Workspace**: `pnpm-workspace.yaml`, `.moon/workspace.yml`, and `go.work` MUST be kept in sync for all modules.

### 6. Testing Strategy

-   **Unit**: Isolated tests for Go (`go test`), Shared TS (`vitest`), and UI Components (`vitest`).
-   **Mockability**: All external dependencies (DBs, APIs) MUST be mockable. RxJS services MUST support `usingMockData` toggle.
-   **Storybook**: All UI widgets MUST have associated Storybook stories covering all states.

### 7. Branching & Release

-   **Flow**: Feature Branch (`issue-name`) → PR → Main.
-   **Releases**: Semantic Versioning automated via `release-please`.
-   **Protection**: Direct pushes to `main` are blocked.

### 8. AI Agent Guardrails

AI coding agents MUST:
-   Verify changes locally using `moon run :test` and `moon run :lint` before requesting review.
-   Follow the **UI-First** workflow for new features (Start with UI, then Contract, then Backend).
-   Never bypass Security Gates or modify `ci.yml` to weaken checks.

## Governance

This constitution supersedes all other practices. All PRs and reviews MUST verify
compliance.

Amendments require: documentation, approval from Security Lead + PO + Maintainer,
`constitution-change` label, and passing CI policy jobs before merge.
