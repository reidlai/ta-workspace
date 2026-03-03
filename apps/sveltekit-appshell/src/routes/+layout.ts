import { Registry } from "virtual-module-core/registry";
import { DIContainer } from "virtual-module-core/di";
import type { LayoutLoad } from "./$types";
import { ModuleLoader } from "$lib/loader/ModuleLoader";
import { setAppContainer, appContainer } from "$lib/registry";
import pino from "pino";
import axios from "axios";
import { env } from "$env/dynamic/public";

const logger = pino({
  name: "appshell",
  level: "debug",
  browser: { asObject: true },
});

export const load: LayoutLoad = async ({ data, fetch }) => {
  logger.debug("+layout.ts load start");
  const registry = Registry.getInstance();

  // Check if already loaded (client-side nav)
  if (registry.getWidgets().size > 0) {
    logger.debug("Modules already loaded");
    return {
      modules: Array.from(registry.getWidgets().values()),
      appContainer,
    };
  }

  let container: DIContainer | undefined;

  try {
    // Read appConfig from server side `data` (+layout.server.ts)
    const { appConfig } = data;

    // Fetch modules.json on the client
    const res = await fetch("/modules.json");
    if (!res.ok) throw new Error("Failed to fetch modules.json");
    const json = await res.json();
    const moduleConfigs = json.modules;

    // Initialize DI container
    container = new DIContainer(appConfig);

    // Initialize API client
    const apiClient = axios.create({ baseURL: `${env.PUBLIC_API_URL}` });

    // Register API client in DI container
    container.register("apiClient", apiClient);

    // Register DI container in app context
    setAppContainer(container);

    // Load modules
    await ModuleLoader.loadModules(container, moduleConfigs);
    logger.debug("ModuleLoader done");

    // Return modules and DI container
    return {
      modules: Array.from(registry.getWidgets().values()),
      appContainer: container,
    };
  } catch (e) {
    logger.error({ err: e }, "Failed to initialize app registry");
  }
};
