# Monorepo Architecture

This document outlines the architectural structure and toolchain configuration for the AppShell Workspace.

## Overview

We use [Moonrepo](https://moonrepo.dev) as our primary build system and monorepo management tool. This ensures consistent tooling, efficient caching, and deterministic builds across all environments.

## Directory Structure

The workspace is organized into applications and modules:

- **`apps/`**: Contains end-user application projects.
  - `sv-appshell`: SvelteKit frontend application.
  - `ta-server`: Go backend API server.
- **`modules/`**: Contains shared logic and feature packages.
  - `core`: Shared utilities and type definitions.
  - `portfolio`: Portfolio management logic (Go & UI).
  - `watchlist`: Watchlist management logic (Go & UI).
  - `demo`: Demonstration modules.
- **`scripts/`**: Contains workspace automation tools and scripts.
  - `module-workflow`: The CLI tool for managing feature modules.
- **`.moon/`**: Contains the workspace configuration files (`workspace.yml`, `toolchain.yml`, `tasks.yml`).

## Toolchain Configuration

Moonrepo automatically manages the toolchain to ensure every developer and CI agent uses the exact same versions.

- **Node.js**: v20
- **Package Manager**: pnpm v8

## Project Configuration

Each project (app or module) contains a `moon.yml` file that defines its tasks, dependencies, and metadata.

## Global Tasks

We have defined standard tasks that apply to most projects in the workspace:

- **`build`**: Compiles the project.
- **`test`**: Runs the test suite.
- **`lint`**: Runs code quality checks.
- **`dev`**: Starts the development server (where applicable).

These tasks can be executed from the root using `moon run :<task>` (e.g., `moon run :build` to build everything, or `moon run ta-server:build` for a specific project).

### Module Management Tasks

We also provide global automation tasks for managing the module lifecycle:

- **`add-module`**: Adds a new feature module (submodule), updates registry and workspace configs.
- **`delete-module`**: Removes a module, cleaning up git submodules and config references.
- **`rename-module`**: Renames a module, moving the submodule and refactoring internal imports/names.

Usage: `moon run :add-module -- <args>`
