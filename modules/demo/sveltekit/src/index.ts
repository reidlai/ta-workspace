/// <reference types="vite/client" />
import DemoWidget from "./lib/widgets/DemoWidget.svelte";
import { demoRxService } from "@modules/demo-ts";

import type { ModuleInit } from "virtual-module-core/types";
import { SvelteKitAdapter } from "virtual-module-core";

// Create adapter instance
const adapter = new SvelteKitAdapter();

export const init: ModuleInit = async (_context) => {
  // 1. Discover SvelteKit routes
  const routes = import.meta.glob("./routes/**/+*.{svelte,ts}", {
    eager: true,
  });
  const bundle = await adapter.parse(routes);

  // 2. Decorate bundle with module-specific metadata, widgets, and services
  bundle.id = "demo-module";
  bundle.services = {
    DemoRxService: demoRxService,
  };
  bundle.widgets = [
    {
      id: "demo-widget",
      title: "Demo Widget",
      component: DemoWidget,
      location: "dashboard",
      size: "medium",
    },
  ];

  return bundle;
};

export { DemoWidget };
