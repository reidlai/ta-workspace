import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [sveltekit()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,ts}"],
    setupFiles: ["./vitest-setup.ts"],
  },
  resolve: {
    conditions: ["browser"],
    alias: {
      svelte: "svelte",
      $lib: path.resolve(__dirname, "./src/lib"),
      ...(mode === "test"
        ? {
          "$app/navigation": path.resolve(
            __dirname,
            "./src/test/mocks/app-navigation.ts",
          ),
        }
        : {}),
      "@modules/demo-ts": path.resolve(__dirname, "../ts/src"),
    },
  },
}));
