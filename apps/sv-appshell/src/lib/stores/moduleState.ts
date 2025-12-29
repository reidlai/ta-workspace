import { writable, type Writable } from 'svelte/store';
import type { IModuleState } from '@core/types';

class ModuleStateStore {
    private channels: Map<string, Writable<any>> = new Map();
    private updateQueue: Array<{ channel: string, value: any, timestamp: number }> = [];
    private isProcessing = false;

    // Get or create a state channel
    getChannel<T>(channelId: string, initialValue?: T): Writable<T> {
        if (!this.channels.has(channelId)) {
            this.channels.set(channelId, writable<T>(initialValue));
        }
        return this.channels.get(channelId) as Writable<T>;
    }

    // Atomic update with last-writer-wins strategy
    updateState<T>(channelId: string, value: T, source: string) {
        const update = {
            channel: channelId,
            value,
            timestamp: Date.now()
        };

        this.updateQueue.push(update);
        this.processQueue();
    }

    private processQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;

        requestAnimationFrame(() => {
            // Last-writer-wins: deduplicate by channel, keeping last update
            const updates = new Map();
            this.updateQueue.forEach(u => updates.set(u.channel, u));
            this.updateQueue = [];

            updates.forEach((update) => {
                const store = this.getChannel(update.channel);
                store.set(update.value);
            });

            this.isProcessing = false;
        });
    }
}

export const moduleState = new ModuleStateStore();
