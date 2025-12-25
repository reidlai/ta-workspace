# Data Model: Initialize Project with Moonrepo

**Feature**: `001-initialize-current-project`

## Conceptual Entities

Since this feature involves initializing infrastructure and tooling, there is no application database schema. However, the "Data Model" of the workspace configuration is defined below:

### Workspace (`.moon/workspace.yml`)

Represents the root of the monorepo.

- **projects**: List or Glob pattern of project locations (e.g., `apps/*`, `packages/*`).
- **vcs**: Version control settings (Git).

### Toolchain (`.moon/toolchain.yml`)

Defines the environment tools available to the projects.

- **node**: Node.js configuration (version, package manager).
- **typescript**: TS configuration sync settings.

### Global Task (`.moon/tasks.yml`)

Defines a reusable unit of work.

- **command**: The CLI command to run.
- **inputs**: Files that invalidate the cache.
- **outputs**: Artifacts produced by the task.
