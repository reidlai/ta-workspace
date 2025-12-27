import { Registry } from '@ts/registry';
import { DIContainer } from '@ts/di';
import type { LayoutLoad } from './$types';
import type { IAppConfig, ModuleInit } from '@ts/types';

export const ssr = false; // Disable SSR for MVP to avoid singleton state issues across requests for now

export const load: LayoutLoad = async ({ fetch }) => {
    const registry = Registry.getInstance();

    // Only load if empty? Or reload? Singleton persists in client navigation.
    if (registry.getModules().length > 0) {
        return { modules: registry.getModules() };
    }

    try {
        const res = await fetch('/modules.json');
        if (res.ok) {
            const config = await res.json();

            // App Config & Context
            const appConfig: IAppConfig = {
                apiBaseUrl: import.meta.env.VITE_API_URL || '/',
                debugMode: import.meta.env.DEV,
                featureFlags: {}
            };
            const container = new DIContainer(appConfig);

            for (const modConfig of config.modules) {
                if (modConfig.enabled) {
                    try {
                        // Dynamic import of feature package
                        // Vite needs semantic imports or globs. 
                        // For MVP, we catch specific known modules or rely on Vite's handling if configured.
                        // We'll trust that @features/demo-feature is installable/resolvable.

                        // Note: In a real dynamic system we might fetch JS files. 
                        // Here we use monorepo workspace packages.

                        let mod;
                        if (modConfig.src === '@svelte/demo') {
                            mod = await import('@svelte/demo');
                        } else {
                            // Fallback or error
                            console.warn(`Unknown module source: ${modConfig.src}`);
                            continue;
                        }

                        if (mod.default && typeof mod.default === 'function') {
                            const init = mod.default as ModuleInit;
                            const bundle = await init(container);
                            registry.register(bundle);
                        }
                    } catch (e) {
                        console.error(`Failed to load module ${modConfig.id}`, e);
                    }
                }
            }
        }
    } catch (e) {
        console.error("Failed to initialize app registry", e);
    }

    return {
        modules: registry.getModules()
    };
};
