# Research & Decisions: Initialize Project with Moonrepo

**Feature**: `001-initialize-current-project`
**Date**: 2025-12-25

## 1. Toolchain Versioning

### Decision
Use **Node.js v20 (LTS)** and **pnpm** as the package manager.

### Rationale
- **Constitution Compliance**: The project constitution mandates Moonrepo usage, which supports `pnpm` natively for workspace management.
- **Serverless Compatibility**: Node.js v20 is currently the active LTS and has broad support across AWS Lambda, Firebase Functions, and other serverless providers without needing custom runtimes.
- **Performance**: `pnpm` offers superior installation speed and disk space efficiency compared to `npm` or `yarn` via its content-addressable store.

### Alternatives Considered
- **Node.js v22**: Rejected for immediate adoption due to potential lack of support in some serverless environments.
- **npm/yarn**: Rejected due to inferior workspace performance and lack of strong native integration preference in Moonrepo docs compared to pnpm.

## 2. Global Task Taxonomy

### Decision
Define standard `build`, `test`, `lint` tasks in `.moon/tasks.yml`.

### Rationale
- **Consistency**: Ensures every project, regardless of language or type, has a predictable lifecycle interface.
- **CI/CD Simplification**: CI pipelines can run `moon run :lint` to lint all affected projects without knowing specific implementation details.

### Alternatives Considered
- **Empty Configuration**: Rejected because it leads to drift where different projects define different task names (e.g., `build` vs `compile`).
