import { env } from "$env/dynamic/private";
import type { LayoutServerLoad } from "./$types";
import type { IAppConfig } from "virtual-module-core/types";

export const load: LayoutServerLoad = async (): Promise<{
  appConfig: IAppConfig;
}> => {
  console.log("DEBUG: +layout.server.ts load start");

  // App Config & Context
  const appConfig: IAppConfig = {
    logLevel: env.LOG_LEVEL || "info",
  };

  return {
    appConfig,
  };
};
