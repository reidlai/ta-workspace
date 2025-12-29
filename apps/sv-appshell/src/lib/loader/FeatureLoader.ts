import type { IAppConfig, IContext, IFeatureBundle, ModuleInit } from '@core/types';
import { Registry } from '@core/registry'; // For typing, though we might not use it directly

export class FeatureLoader {
    // Glob pattern to find feature entry points across the workspace
    // Adjust depth based on file location: src/lib/loader/FeatureLoader.ts
    // ../../../../../modules/*/*/src/index.ts -> workspace/modules/<domain>/<lang>/src/index.ts
    // Matches modules/demo/svelte/src/index.ts
    private static featureGlob = import.meta.glob('../../../../../modules/*/*/src/index.ts');

    static async loadFeatures(context: IContext, config: IAppConfig[]): Promise<void> {
        console.log('FeatureLoader: discoverable modules', Object.keys(this.featureGlob));

        const registry = Registry.getInstance(); // Singleton access if needed, or we just init

        for (const moduleConfig of config) {
            if (!moduleConfig.enabled) continue;

            const featureId = moduleConfig.id;
            // Config usually specifies 'src' or 'package'. 
            // e.g. "src": "demo" or "src": "modules/features/demo"
            // We need a heuristic to match the config 'src' to the glob path.

            // Assume moduleConfig.src is like "features/demo" or just "demo"
            // We search for a key in glob that includes this string.
            // Start with simplest match heuristic: matches /<src>/ segment in path
            // e.g. src="demo" -> matches .../modules/demo/svelte/src/...
            const matchedKey = Object.keys(this.featureGlob).find(key =>
                key.includes(`/${moduleConfig.src}/`) && key.includes('/src/index.ts')
            );

            if (matchedKey) {
                console.log(`Loading feature: ${featureId} from ${matchedKey}`);
                try {
                    const module = await this.featureGlob[matchedKey]() as { default: any, init?: ModuleInit };

                    // Support both default export object or init function
                    const initFn = module.init || (module.default && module.default.init);

                    if (typeof initFn === 'function') {
                        const bundle = await initFn(context);
                        // Registry internally uses singleton, so we might just let init register?
                        // Or we explicitly register? Registry.ts has register(bundle).
                        // If init returns bundle, we register it.
                        if (bundle) {
                            registry.register(bundle);
                        }
                    } else {
                        // Fallback: Check if the module "just works" via side-effects (like demo)
                        // The demo module registers itself in its top-level code.
                        // So just importing it might be enough.
                        console.warn(`Feature ${featureId} loaded. check side-effects.`);
                    }
                } catch (e) {
                    console.error(`Failed to load feature ${featureId}:`, e);
                }
            } else {
                console.warn(`Feature source not found for: ${featureId} (${moduleConfig.src})`);
            }
        }
    }
}
