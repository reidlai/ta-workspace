import { Registry } from "virtual-module-core/registry";
import { DIContainer } from "virtual-module-core/di";
import type { LayoutLoad } from "./$types";
import { ModuleLoader } from "$lib/loader/ModuleLoader";
import { setAppContainer } from "$lib/registry";
import pino from "pino";

const logger = pino({
  name: "appshell",
  level: "debug",
  browser: { asObject: true },
});

export const ssr = false;

export const load: LayoutLoad = async ({ data, fetch }) => {
  logger.debug("+layout.ts load start");
  const registry = Registry.getInstance();

  // Check if already loaded (client-side nav)
  if (registry.getWidgets().size > 0) {
    logger.debug("Modules already loaded");
    return { modules: Array.from(registry.getWidgets().values()) };
  }

  try {
    const { appConfig } = data;

    // Fetch modules.json on the client
    const res = await fetch("/modules.json");
    if (!res.ok) throw new Error("Failed to fetch modules.json");
    const json = await res.json();
    const moduleConfigs = json.modules;

    const container = new DIContainer(appConfig);

    setAppContainer(container);

    await ModuleLoader.loadModules(container, moduleConfigs);
    logger.debug("ModuleLoader done");
  } catch (e) {
    logger.error({ err: e }, "Failed to initialize app registry");
  }

  return {
    modules: Array.from(registry.getWidgets().values()),
  };
};
