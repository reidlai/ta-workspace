import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import DemoWidget from './DemoWidget.svelte';

// Mock the Registry to return null stateStore, forcing the component into fallback mode
vi.mock('virtual-module-core/registry', () => ({
    Registry: {
        getInstance: () => ({
            getStateStore: () => null
        })
    }
}));

describe('DemoWidget', () => {
    it('renders the initial state', () => {
        render(DemoWidget);
        expect(screen.getByText('Shared State Demo')).toBeInTheDocument();
        expect(screen.getByText('Global Count:')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('increments the counter (fallback)', async () => {
        render(DemoWidget);
        const button = screen.getByRole('button', { name: /Increment Global Counter/i });

        await fireEvent.click(button);

        // Since we are mocking/not providing the registry, it goes to fallback
        // We expect the visible count to update because the local 'count' variable is incremented
        // However, looking at the code:
        // if (stateStore) { ... } else { console.warn; count++; }
        // The display binds to {count}. So it should update.
        expect(await screen.findByText('1')).toBeInTheDocument();
    });
});
