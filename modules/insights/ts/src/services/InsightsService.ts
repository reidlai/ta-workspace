import { BehaviorSubject } from 'rxjs';

export interface Insight {
    symbol: string;
    sentiment: 'bullish' | 'bearish' | 'neutral';
    summary: string;
    action: string;
}

export class InsightsService {
    private static instance: InsightsService;
    private userId = "demo-user";

    // RxJS BehaviorSubject for state management
    private _insights$ = new BehaviorSubject<Record<string, Insight>>({});

    // Expose as observable for read-only access
    public readonly insights$ = this._insights$.asObservable();

    private constructor() { }

    public static getInstance(): InsightsService {
        if (!InsightsService.instance) {
            InsightsService.instance = new InsightsService();
        }
        return InsightsService.instance;
    }

    /**
     * Svelte-compatible subscribe method.
     * Svelte auto-subscribes to any object with this signature.
     */
    public subscribe(run: (value: Record<string, Insight>) => void): () => void {
        const subscription = this._insights$.subscribe(run);
        return () => subscription.unsubscribe();
    }

    public async refresh(): Promise<void> {
        try {
            const res = await fetch('/api/insights', {
                headers: { 'X-User-ID': this.userId }
            });
            if (res.ok) {
                const list: Insight[] = await res.json();
                const map: Record<string, Insight> = {};
                list.forEach(i => {
                    map[i.symbol] = i;
                });
                this._insights$.next(map);
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export const insightsService = InsightsService.getInstance();
