import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
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
    alias: {
      "@modules/demo-ts": path.resolve(__dirname, "../../modules/demo/ts/src/index.ts"),
      "@modules/watchlist-ts": path.resolve(__dirname, "../../modules/watchlist/ts/src/index.ts"),
      "@modules/portfolio-ts": path.resolve(__dirname, "../../modules/portfolio/ts/src/index.ts"),
    },
  },
});
