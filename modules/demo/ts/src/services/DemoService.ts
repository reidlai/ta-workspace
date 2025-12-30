import { BehaviorSubject } from 'rxjs';

export class DemoService {
    private static instance: DemoService;

    // RxJS BehaviorSubject for reactive status
    private _status$ = new BehaviorSubject<string>('Demo service is running');

    // Expose as observable
    public readonly status$ = this._status$.asObservable();

    private constructor() { }

    public static getInstance(): DemoService {
        if (!DemoService.instance) {
            DemoService.instance = new DemoService();
        }
        return DemoService.instance;
    }

    /**
     * Svelte-compatible subscribe method.
     */
    public subscribe(run: (value: string) => void): () => void {
        const subscription = this._status$.subscribe(run);
        return () => subscription.unsubscribe();
    }

    public greet(name: string): string {
        return `Hello, ${name}!`;
    }

    public getStatus(): string {
        return this._status$.getValue();
    }

    public setStatus(status: string): void {
        this._status$.next(status);
    }
}

export const demoService = DemoService.getInstance();
