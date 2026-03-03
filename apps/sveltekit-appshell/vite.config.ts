import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    fs: {
      allow: [".."],
    },
  },
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    alias: {
      svelte: "svelte",
    },
  },
  resolve: {
    conditions: ["browser"],
    alias: {
      "$modules/demo": path.resolve(
        __dirname,
        "../../modules/demo/sveltekit/src",
      ),
      "$modules/portfolio": path.resolve(
        __dirname,
        "../../modules/portfolio/sveltekit/src",
      ),
      "$modules/watchlist": path.resolve(
        __dirname,
        "../../modules/watchlist/sveltekit/src",
      ),
    },
  },
  ssr: {
    noExternal: ["svelte-sonner"],
  },
});
