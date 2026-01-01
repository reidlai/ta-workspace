
export type RollbackAction = () => Promise<void>;

export class RollbackStack {
    private actions: RollbackAction[] = [];

    add(action: RollbackAction) {
        this.actions.push(action);
    }

    async execute(): Promise<void> {
        // Execute in reverse order (LIFO)
        for (const action of this.actions.reverse()) {
            try {
                await action();
            } catch (error) {
                console.error('Failed to execute rollback action:', error);
                // Continue attempting other rollbacks
            }
        }
        this.actions = [];
    }

    clear() {
        this.actions = [];
    }
}
