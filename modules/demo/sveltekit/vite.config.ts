import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  plugins: [tailwindcss(), sveltekit()],
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
    },
  },
}));
