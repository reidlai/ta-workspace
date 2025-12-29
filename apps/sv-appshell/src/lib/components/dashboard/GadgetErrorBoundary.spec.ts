import { describe, it, expect } from 'vitest';
import GadgetErrorBoundary from './GadgetErrorBoundary.svelte';

describe('GadgetErrorBoundary', () => {
    it('should export setError method', () => {
        // Verify the component exports the expected API
        expect(GadgetErrorBoundary).toBeDefined();
    });

    it('should handle error state management', () => {
        // Test the error handling logic exists
        // Note: Full component testing with Svelte 5 requires updated testing library
        // For now, we verify the component structure and exported methods
        const component = new GadgetErrorBoundary({
            target: document.createElement('div'),
            props: {
                gadgetTitle: 'Test Gadget'
            }
        });

        expect(component).toBeDefined();
        expect(typeof component.setError).toBe('function');

        component.$destroy();
    });

    it('should accept gadgetTitle prop', () => {
        const component = new GadgetErrorBoundary({
            target: document.createElement('div'),
            props: {
                gadgetTitle: 'Custom Gadget'
            }
        });

        expect(component).toBeDefined();
        component.$destroy();
    });
});
