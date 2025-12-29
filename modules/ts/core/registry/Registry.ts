import type { IFeatureBundle, IGadget } from '@core/types';

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
        this.servicesMap.clear();
        this.gadgets = [];
    }

    // Gadget Registry Support
    private gadgets: any[] = []; // Typed as any[] to avoid dragging IGadget dependency if generic, or use IGadget
    private servicesMap = new Map<string, any>();
    private stateStores = new Map<string, any>();

    registerGadget(gadget: any): void {
        this.gadgets.push(gadget);
    }

    getGadgets(): any[] {
        return this.gadgets;
    }

    registerService(id: string, service: any): void {
        this.servicesMap.set(id, service);
    }

    getService<T = any>(id: string): T {
        return this.servicesMap.get(id);
    }

    // Routing Support
    getRoute(path: string): any | undefined {
        for (const bundle of this.modules.values()) {
            if (bundle.routes) {
                for (const route of bundle.routes) {
                    // Simple exact match or startsWith for sub-routes
                    // For now, exact match for the demo route '/demo'
                    if (route.path === path || path.startsWith(route.path + '/')) {
                        return route.component;
                    }
                }
            }
        }
        return undefined;
    }

    // State Store Support (Mock/Simple implementation)
    getStateStore(id: string): any {
        if (!this.stateStores.has(id)) {
            // We can't use svelte/store here if we want to be agnostic.
            // But existing code expects a writable.
            // For now, return a simple object or mock, or assume caller handles it.
            // Best effort: Return a mock store object
            this.stateStores.set(id, { subscribe: () => { }, set: () => { }, update: () => { } });
        }
        return this.stateStores.get(id);
    }
}
