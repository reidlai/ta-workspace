import { describe, it, expect, vi, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { moduleState } from './moduleState';

describe('ModuleStateStore', () => {
    beforeEach(() => {
        // Reset or clear store if needed logic existed, currently channels persist in memory instance
        // For unit tests, we're testing the instance behavior
    });

    it('should create a channel with initial value', () => {
        const store = moduleState.getChannel<string>('test.channel', 'initial');
        expect(get(store)).toBe('initial');
    });

    it('should update state immediately without contention', async () => {
        const store = moduleState.getChannel<number>('test.count', 0);

        moduleState.updateState('test.count', 1, 'module-A');

        // Wait for next animation frame (simulated or real)
        await new Promise(resolve => setTimeout(resolve, 50));

        expect(get(store)).toBe(1);
    });

    it('should apply last-writer-wins for simultaneous updates', async () => {
        const store = moduleState.getChannel<string>('test.conflict', 'start');

        // Simulate simultaneous updates
        moduleState.updateState('test.conflict', 'update-1', 'module-A');
        moduleState.updateState('test.conflict', 'update-2', 'module-B');
        moduleState.updateState('test.conflict', 'update-3', 'module-C');

        // Wait for queue processing
        await new Promise(resolve => setTimeout(resolve, 50));

        // Expect only the last update
        expect(get(store)).toBe('update-3');
    });

    it('should handle different channels independently', async () => {
        const storeA = moduleState.getChannel('channel-A', 0);
        const storeB = moduleState.getChannel('channel-B', 0);

        moduleState.updateState('channel-A', 10, 'mod-1');
        moduleState.updateState('channel-B', 20, 'mod-1');

        await new Promise(resolve => setTimeout(resolve, 50));

        expect(get(storeA)).toBe(10);
        expect(get(storeB)).toBe(20);
    });

    it('should handle Last-Writer-Wins with high contention (edge case)', async () => {
        const store = moduleState.getChannel<number>('high-contention', 0);

        // Simulate rapid-fire updates from multiple sources
        for (let i = 1; i <= 10; i++) {
            moduleState.updateState('high-contention', i, `module-${i % 3}`);
        }

        // Wait for queue processing
        await new Promise(resolve => setTimeout(resolve, 100));

        // Should have the last value (10)
        expect(get(store)).toBe(10);
    });

    it('should maintain atomicity during concurrent updates', async () => {
        const store = moduleState.getChannel<string>('atomic-test', 'initial');

        // Simulate concurrent updates
        const updates = ['A', 'B', 'C', 'D', 'E'];
        updates.forEach((value, index) => {
            setTimeout(() => {
                moduleState.updateState('atomic-test', value, `source-${index}`);
            }, index * 5);
        });

        // Wait for all updates to process
        await new Promise(resolve => setTimeout(resolve, 150));

        // Should have one of the values (last one to be processed)
        const finalValue = get(store);
        expect(updates).toContain(finalValue);
    });
});
