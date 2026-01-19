import { schemas, demoRxService } from "@modules/demo-ts"; // Zod Schema
import { z } from "zod";
type DemoStateType = z.infer<typeof schemas.DemoStateSchema>;

class DemoStateRune implements DemoStateType {
  private static instance: DemoStateRune;

  // Initialize runes with the current value logic
  status = $state<DemoStateType['status']>(null); // Inherit status type defined in zod schema
  count = $state<DemoStateType['count']>(0); // Inherit count type defined in zod schema

  constructor() {
    // -------------------------------------------------------------------------
    // INCOMING DATA FLOW: Service -> Zod Validation -> UI State
    // -------------------------------------------------------------------------

    // 1. Subscribe to the RxJS stream
    demoRxService.status$.subscribe((value) => {
      // 2. Runtime Validation: Ensure data matches the Schema contract
      try {
        schemas.DemoStateSchema.shape.status.parse(value);

        // 3. Update State: If valid, update the rune to trigger UI re-renders
        this.status = value;
      } catch (e) {
        console.error("Invalid status update:", e);
      }
    });

    demoRxService.count$.subscribe((value) => {
      try {
        schemas.DemoStateSchema.shape.count.parse(value);
        this.count = value;
      } catch (e) {
        console.error("Invalid count update:", e);
      }
    });
  }

  public static getInstance(): DemoStateRune {
      if (!DemoStateRune.instance) {
          DemoStateRune.instance = new DemoStateRune();
      }
      return DemoStateRune.instance;
  }

  // -------------------------------------------------------------------------
  // OUTGOING ACTION FLOW: UI Action -> Service Method
  // -------------------------------------------------------------------------

  increment() {
    demoRxService.increment();
  }

  setStatus(status: string) {
    demoRxService.setStatus(status);
  }
}

// Export a singleton instance to be used by components
export const demoState = DemoStateRune.getInstance();
