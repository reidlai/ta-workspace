# Monorepo Architecture

This document outlines the architectural structure and toolchain configuration for the AppShell Workspace.

## Overview

We use [Moonrepo](https://moonrepo.dev) as our primary build system and monorepo management tool. This ensures consistent tooling, efficient caching, and deterministic builds across all environments.

## Directory Structure

- **`apps/`**: Contains end-user application projects (e.g., web apps, services).
- **`packages/`**: Contains shared libraries and utilities used by apps.
- **`.moon/`**: Contains the workspace configuration files.

## Toolchain Configuration

Moonrepo automatically manages the toolchain to ensure every developer and CI agent uses the exact same versions.

- **Node.js**: v20 (LTS)
- **Package Manager**: pnpm

## Global Tasks

We have defined standard tasks that apply to all projects in the workspace:

- **`build`**: Compiles the project.
- **`test`**: Runs the test suite.
- **`lint`**: Runs code quality checks.

These tasks can be executed from the root using `npx @moonrepo/cli run :<task>`.
