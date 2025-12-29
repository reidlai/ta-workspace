import DemoPage from './DemoPage.svelte';
import DemoWidget from './DemoWidget.svelte';
import { DemoService } from './DemoService';
import { gadgetRegistry } from '@core/registry';

// Module Initialization
import type { IContext, IModuleBundle, ModuleInit, IWidget } from '@core/types';

// Register routes (conceptually, though SvelteKit handles file-based routing primarily, 
// this could be for dynamic validation or metadata)
export const routes = {
    '/demo': DemoPage
};

// Removed side-effect gadget registration. Service registration removed in favor of bundle return.

export const init: ModuleInit = async (context: IContext): Promise<IModuleBundle> => {
    // Instantiate services
    const demoService = new DemoService();

    return {
        id: 'demo-module',
        routes: [
            { path: '/demo', component: DemoPage }
        ],
        services: {
            'DemoService': demoService
        },
        widgets: [
            {
                id: 'demo-widget',
                title: 'Demo Widget',
                description: 'A sample widget from the demo feature module.',
                component: DemoWidget,
                location: 'dashboard',
                size: 'medium'
            }
        ]
    };
};

export { DemoPage, DemoWidget, DemoService };
