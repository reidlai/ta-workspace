import { PUBLIC_API_URL } from '$env/static/public';
import { dev } from '$app/environment';
import { Registry } from '@core/registry';
import { DIContainer } from '@core/di';
import type { LayoutLoad } from './$types';
import type { IAppConfig } from '@core/types';
import { ModuleLoader } from '$lib/loader/ModuleLoader';

export const ssr = false; // Disable SSR for MVP to avoid singleton state issues across requests for now

export const load: LayoutLoad = async ({ fetch }) => {
    console.log("DEBUG: +layout.ts load start");
    const registry = Registry.getInstance();

    // Check if already loaded (client-side nav)
    if (registry.getModules().length > 0) {
        console.log("DEBUG: Modules already loaded");
        // return { modules: registry.getModules() };
        return {}; // Return empty to bypass serialization check
    }

    try {
        // Fetch modules.json from server (static folder)
        const res = await fetch('/modules.json');

        if (res.ok) {
            const config = await res.json();
            console.log("DEBUG: Loaded modules.json", config);

            // App Config & Context
            const appConfig: IAppConfig = {
                apiBaseUrl: PUBLIC_API_URL || '/',
                debugMode: dev,
                featureFlags: {}
            };

            const container = new DIContainer(appConfig);

            // Use ModuleLoader to dynamic load
            await ModuleLoader.loadModules(container, config.modules);
            console.log("DEBUG: ModuleLoader done");
        }
    } catch (e) {
        console.error("Failed to initialize app registry", e);
    }

    return {
        modules: registry.getModules()
    };
};
