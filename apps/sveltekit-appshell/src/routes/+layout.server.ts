import { env } from "$env/dynamic/private";
import type { LayoutServerLoad } from "./$types";
import type { IAppConfig } from "virtual-module-core/types";

export const load: LayoutServerLoad = async (): Promise<{ appConfig: IAppConfig }> => {
  console.log("DEBUG: +layout.server.ts load start");

  // App Config & Context
  const appConfig: IAppConfig = {
    apiBaseUrl: env.API_URL || "/",
    usingMockData: env.USE_MOCK_DATA === "true",
    logLevel: env.LOG_LEVEL || "info",
    featureFlags: {},
  };

  return {
    appConfig,
  };
};
