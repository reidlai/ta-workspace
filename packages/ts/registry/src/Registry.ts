import { IFeatureBundle } from '@ts/types';

export class Registry {
    private static instance: Registry;
    private modules = new Map<string, IFeatureBundle>();

    private constructor() { }

    static getInstance(): Registry {
        if (!Registry.instance) {
            Registry.instance = new Registry();
        }
        return Registry.instance;
    }

    register(bundle: IFeatureBundle): void {
        if (this.modules.has(bundle.id)) {
            console.warn(`[Registry] Module '${bundle.id}' is already registered. Skipping.`);
            return;
        }
        console.log(`[Registry] Registered module: ${bundle.id}`);
        this.modules.set(bundle.id, bundle);
    }

    getModules(): IFeatureBundle[] {
        return Array.from(this.modules.values());
    }

    getModule(id: string): IFeatureBundle | undefined {
        return this.modules.get(id);
    }

    clear(): void {
        this.modules.clear();
    }
}
