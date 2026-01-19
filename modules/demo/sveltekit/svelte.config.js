import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  preprocess: vitePreprocess(),

  kit: {
    alias: {
      "@modules/demo-ts/*": "../ts/src/*",
    },
  },
};
