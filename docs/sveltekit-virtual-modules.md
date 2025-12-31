# Understanding SvelteKit Virtual Modules in Isolated Packages

## The Problem
When working with Svelte components in isolated workspace packages (e.g., `modules/portfolio/svelte`), you may encounter errors like:
> Cannot find module '$app/navigation' or its corresponding type declarations.

This happens because standard SvelteKit imports (`$app/*`, `$env/*`) are **virtual modules**.

## How It Works

### In a Full SvelteKit App
In a regular SvelteKit application:
1.  **Vite Plugin**: The SvelteKit Vite plugin intercepts imports to `$app/navigation` and resolves them to internal SvelteKit framework code at runtime.
2.  **Type Generation**: SvelteKit automatically generates a `.svelte-kit/types/src/` directory containing `d.ts` files that declare these modules.
3.  **tsconfig.json**: The app's `tsconfig.json` extends `.svelte-kit/tsconfig.json`, ensuring these generated types are visible to TypeScript.

### In an Isolated Package
When you extract components into a separate workspace package:
1.  **No Auto-Generation**: The package usually doesn't run the full SvelteKit CLI to generate `.svelte-kit` types.
2.  **Missing Context**: TypeScript sees `import ... from '$app/navigation'` but finds no corresponding file on disk and no declaration file in the package's include path.
3.  **Runtime Works**: Even though TypeScript complains during development, the code often works fine at runtime *if* it is consumed by a SvelteKit app. The consuming app's Vite config handles the module resolution.

## The Solution: `app.d.ts` Stubs

To fix the specific TypeScript errors in the isolated package, we manually declare the modules in a local `src/app.d.ts` (or `src/global.d.ts`):

```typescript
declare module '$app/navigation' {
    export function goto(url: string | URL, opts?: any): Promise<void>;
    // ... add other exports as needed
}

declare module '$app/stores' {
    import { Readable } from 'svelte/store';
    export const page: Readable<any>;
    // ...
}
```

### Why This Works
1.  **Compile Time**: Validates the **Contract**. You tell TypeScript: "Trust me, these modules exist with this shape." This stops the editor errors.
2.  **Runtime**: The **Implementation** is provided by the consuming application's build system (Vite + SvelteKit).

This approach allows you to build reusable Svelte components that leverage SvelteKit features without forcing the isolated package itself to be a full SvelteKit application.
