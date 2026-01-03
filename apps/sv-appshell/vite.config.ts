import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    alias: {
      // Force Svelte to use browser/client version instead of server version
      // This fixes the "mount(...) is not available on the server" error
      svelte: "svelte",
    },
  },
  resolve: {
    conditions: ["browser"],
  },
});
