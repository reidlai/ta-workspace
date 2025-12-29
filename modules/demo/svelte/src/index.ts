import DemoPage from './DemoPage.svelte';
import DemoGadget from './DemoGadget.svelte';
import { DemoService } from './DemoService';
import { gadgetRegistry } from '@core/registry';

// Module Initialization
import type { IContext, IFeatureBundle, ModuleInit } from '@core/types';

// Register routes (conceptually, though SvelteKit handles file-based routing primarily, 
// this could be for dynamic validation or metadata)
export const routes = {
    '/demo': DemoPage
};

// Register Gadget immediately upon module import
gadgetRegistry.registerGadget({
    id: 'demo-gadget',
    title: 'Demo Gadget',
    description: 'A sample gadget from the demo feature module.',
    component: DemoGadget,
    icon: 'Zap',
    priority: 10,
    size: 'medium'
});

// Register Service
const demoService = new DemoService();
gadgetRegistry.registerService('DemoService', demoService);

export const init: ModuleInit = async (context: IContext): Promise<IFeatureBundle> => {
    // Services are already registered by side-effect above, or we can explicit register here if we move logic
    // For now, adhering to bundle interface
    return {
        id: 'demo-feature',
        routes: [
            { path: '/demo', component: DemoPage }
        ],
        services: {
            'DemoService': demoService
        }
    };
};

export { DemoPage, DemoGadget, DemoService };
