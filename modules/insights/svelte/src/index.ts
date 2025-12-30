import type { IModuleBundle } from '@core/types';
import StrategySummaryWidget from './widgets/StrategySummaryWidget.svelte';

const bundle: IModuleBundle = {
    id: 'insights-module',
    widgets: [
        {
            id: 'strategy-summary',
            title: 'Strategy Summary',
            component: StrategySummaryWidget,
            location: 'dashboard',
            size: 'large'
        }
    ]
};

export function register(registry: any) {
    registry.register(bundle);
}
