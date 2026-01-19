import { BehaviorSubject } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";
import { z } from "zod";
import { schemas } from "../lib/api-client";

export type DemoStateType = z.infer<typeof schemas.DemoStateSchema>;
export class DemoRxService {
  private static instance: DemoRxService;

  /**
   * Initialize RxJS BehaviorSubject based on zod schema
   */
  
  private _state$ = new BehaviorSubject<DemoStateType>({
    status: "Demo service is running",
    count: 0
  });

  private _usingMockData$ = new BehaviorSubject<boolean>(false);

  /**
   * Initialize RxJS Observable based on zod schema
   */

  public readonly state$ = this._state$.asObservable();

  public readonly usingMockData$ = this._usingMockData$.asObservable();

  // These are "Derived State" streams. They strictly emit ONLY when their specific slice of state changes.

  public readonly status$ = this._state$.pipe(
    // 1. Selector: Extract only the 'status' property from the full state object
    map(state => state.status),
    // 2. Optimization: Only emit if the new status is different from the previous one
    //    (Prevents unnecessary re-renders in consumers if other parts of state change)
    distinctUntilChanged()
  );

  public readonly count$ = this._state$.pipe(
    // 1. Selector: Extract only the 'count' property
    map(state => state.count),
    // 2. Optimization: Only emit if the count actually changes
    distinctUntilChanged()
  );

  private constructor() { }

  public static getInstance(): DemoRxService {
    if (!DemoRxService.instance) {
      DemoRxService.instance = new DemoRxService();
    }
    return DemoRxService.instance;
  }

  /**
   * Svelte-compatible subscribe method for state.
   */
  public subscribe(run: (value: DemoStateType) => void): () => void {
    // 1. Subscribe to the BehaviorSubject (_state$)
    //    - 'run' callback is invoked immediately with the current state (BehaviorSubject always holds a value)
    //    - 'run' is invoked again whenever _state$.next() emits a new value
    const subscription = this._state$.subscribe(run);

    // 2. Return an unsubscribe function
    //    - Svelte (or React useEffect) calls this when the component unmounts
    //    - Crucial for preventing memory leaks by detaching the listener
    return () => subscription.unsubscribe();
  }

  public get currentState() {
    return this._state$.getValue();
  }

  public getStatus(): DemoStateType['status'] {
    return this._state$.getValue().status;
  }

  /**
   * Updates the state with new data, ensuring contract validity.
   * Reference: Developer Guide Phase 2 (Data Contract & Mock State)
   */
  public updateState(newState: DemoStateType) {
    try {
      // 1. Validate: Strict Zod parsing ensures data integrity
      const validState = schemas.DemoStateSchema.parse(newState);

      // 2. Publish: Emit the validated state to all subscribers
      this._state$.next(validState);
    } catch (error) {
      console.error("Invalid status update:", error);
    }
  }

  // Convenience methods that leverage the strict updateState
  public setStatus(status: DemoStateType['status']): void {
    const current = this.currentState;
    this.updateState({ ...current, status });
  }

  public getCount(): DemoStateType['count'] {
    return this._state$.getValue().count;
  }

  public increment(): void {
    const current = this.currentState;
    this.updateState({ ...current, count: current.count + 1 });
  }
}

export const demoRxService = DemoRxService.getInstance();
