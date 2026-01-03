# Research: sv-appshell

**Feature**: Create SvelteKit App Shell
**Branch**: `002-create-sveltekit-application`

## Decision: SvelteKit Adapter

**Context**: The Constitution requires the service to be packaged as a Docker container. SvelteKit supports various adapters (auto, node, static, vercel, etc.).

**Options**:

1.  `adapter-node`: Creates a Node.js server. Ideal for containerization.
2.  `adapter-static`: Generates static files. Good for SPA/CDN, but user mentioned "App Injection" and "Dynamic Routing" which might require server-side handling or at least a serving container (nginx). However, for "Just the web part" and "App Shell", a static SPA is possible (adapter-static with fallback).
    - _Constraint Check_: Backend is separate. Shell acts as container.
    - _Decision_: **`adapter-test` / `adapter-node`**. Since we need dynamic runtime routing (catch-all), `adapter-node` is safer for handling SSR/routing logic if needed, OR `adapter-static` with valid fallback (SPA mode). Given "Minimum dependencies" and "Containerized", `adapter-node` provides a self-contained server that fits the `FROM distroless/nodejs` pattern well.

**Selected**: `adapter-node`
**Rationale**: Complies with "Service packaged as Docker" rule (Node.js runtime). Simplifies environment variable injection at runtime (Constitution Rule 2).

## Decision: Custom DI Container

**Context**: Requirements specify "Custom lightweight DI" and "No external DI libraries".

**Approach**:

- **Registry**: A `Map<string, any>` or Typed Map to hold singleton services.
- **Factory Init**: Modules export `init(context)`. The `context` exposes a restricted API to `get()` services and `register()` internal logic.
- **Config**: Config is loaded at boot and placed into the Registry as `IConfig`.

**Rationale**: Zero dependencies. Typesafe enough via TS interfaces.

## Decision: Dynamic Routing

**Context**: Modules define routes. Shell renders them.

**Approach**:

- **Catch-all Route**: `src/routes/[...rest]/+page.svelte`.
- **Router Service**: Matches `page.url.pathname` against registered Module Routes.
- **Component Rendering**: `<svelte:component this={routedComponent} />`.

**Rationale**: SvelteKit's filesystem routing is build-time. Runtime routing requires a catch-all to delegate to the proprietary module router.
