# Quickstart: Workspace Initialization

## Prerequisites

- **Git**: Installed and available in PATH.
- **Internet Connection**: Required to download Moonrepo binary and toolchain.

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd appshell-workspace
   ```

2. **Install Moonrepo**:
   Follow instructions at [moonrepo.dev](https://moonrepo.dev/docs/install) or use the checked-in script if available.
   ```bash
   # Example (if using mise/proto)
   mise install moon
   ```

3. **Verify Configuration**:
   ```bash
   moon doctor
   ```

## Creating a New Project

1. Create a directory in `apps/` or `packages/`.
2. Add a `moon.yml` file to the directory.
3. Run `moon sync` to regenerate project graph.

## Running Tasks

- **Build all projects**:
  ```bash
  moon run :build
  ```

- **Run tests for specific project**:
  ```bash
  moon run app-name:test
  ```
