import { IFeatureBundle, ModuleInit, IContext } from '@ts/types';
import DemoPage from './DemoPage.svelte';

export default async function init(context: IContext): Promise<IFeatureBundle> {
    console.log('[DemoFeature] Initializing with context:', context);
    return {
        id: 'demo-feature',
        routes: [
            {
                path: '/demo',
                component: DemoPage
            }
        ],
        services: {
            'DemoService': { sayHello: () => 'Hello from Demo!' }
        }
    };
};
