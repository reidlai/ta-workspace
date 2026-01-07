import { BehaviorSubject } from "rxjs";

export interface TickerItem {
  symbol: string;
  on_hand: boolean;
  created_at?: string;
}

export class WatchlistService {
  private static instance: WatchlistService;
  private userId = "demo-user";

  // RxJS BehaviorSubject for state management
  private _tickers$ = new BehaviorSubject<TickerItem[]>([]);

  // Expose as observable for read-only access
  public readonly tickers$ = this._tickers$.asObservable();

  private constructor() {
    this.fetchTickers();
  }

  public static getInstance(): WatchlistService {
    if (!WatchlistService.instance) {
      WatchlistService.instance = new WatchlistService();
    }
    return WatchlistService.instance;
  }

  /**
   * Svelte-compatible subscribe method.
   * Svelte auto-subscribes to any object with this signature.
   */
  public subscribe(run: (value: TickerItem[]) => void): () => void {
    const subscription = this._tickers$.subscribe(run);
    return () => subscription.unsubscribe();
  }

  public async fetchTickers(): Promise<void> {
    try {
      const res = await fetch("/api/watchlist", {
        headers: { "X-User-ID": this.userId },
      });
      if (res.ok) {
        const data = await res.json();
        this._tickers$.next(data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  public async addTicker(symbol: string, onHand: boolean): Promise<void> {
    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": this.userId,
        },
        body: JSON.stringify({ symbol, on_hand: onHand, user_id: this.userId }),
      });
      if (res.ok) {
        await this.fetchTickers();
      }
    } catch (e) {
      console.error(e);
    }
  }

  public async removeTicker(symbol: string): Promise<void> {
    try {
      const res = await fetch(`/api/watchlist/${symbol}`, {
        method: "DELETE",
        headers: { "X-User-ID": this.userId },
      });
      if (res.ok) {
        await this.fetchTickers();
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export const watchlistService = WatchlistService.getInstance();
