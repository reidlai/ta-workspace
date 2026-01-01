# Research: Moonrepo Module Workflow Commands

## Decision Log

### 1. Implementation Language

*   **Decision**: Node.js (TypeScript)
*   **Rationale**: 
    *   The project already relies heavily on Node.js/pnpm/Moonrepo toolchain (Rule 191).
    *   Complex JSON (`modules.json`) and YAML (`pnpm-workspace.yaml`, `moon.yml`) manipulation is safer and easier in JS/TS than Bash.
    *   Cross-platform compatibility (Windows/Linux) is better handled than shell scripts.
*   **Alternatives Considered**:
    *   *Bash*: Too brittle for complex JSON/YAML parsing and error handling constraints (RB-002).
    *   *Go*: Robust, but adding a compiled binary build step for a workflow script adds friction compared to `ts-node` or `tsx`.

### 2. CLI Framework

*   **Decision**: `commander`
*   **Rationale**: Standard, widely used, easy to create subcommands (`add-module`, `rename-module`, `delete-module`).
*   **Alternatives Considered**: `yargs` (heavier), `minimist` (too simple).

### 3. Shell Execution

*   **Decision**: `execa`
*   **Rationale**: wrapper around `child_process` with better promise support, cross-platform handling, and secure variable escaping (critical for git URLs).

### 4. Configuration Parsing

*   **Decision**: `yaml`
*   **Rationale**: Preserves comments and structure better than standard parsers, crucial for editing `pnpm-workspace.yaml` and `moon.yml` without destroying developer comments.

## Technical Risks

*   **Authentication**: Handling private repo auth via `git submodule add` requires ensuring the child process inherits stdio (interactive mode) as decided in clarifications.
*   **Partial Failures**: The "rollback" requirement means we need robust `try/catch` blocks that track state changes (files created, lines added) to revert them.

## Dependencies to Add

- `commander`
- `execa`
- `yaml` (or `js-yaml` if comment preservation isn't strict, but `yaml` is better for round-tripping)
- `tsx` (for execution without compilation)
