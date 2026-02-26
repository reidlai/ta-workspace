import { schemas } from "../api-client"; // Zod Schema
import { z } from "zod";
type DemoStateType = z.infer<typeof schemas.DemoStateSchema>;

export class DemoState implements DemoStateType {
  private static instance: DemoState;

  // Initialize states with the current value logic
  status = $state<DemoStateType["status"]>(null); // Inherit status type defined in zod schema
  count = $state<DemoStateType["count"]>(0); // Inherit count type defined in zod schema

  public static getInstance(): DemoState {
    if (!DemoState.instance) {
      DemoState.instance = new DemoState();
    }
    return DemoState.instance;
  }

  /*
   * Get count
   */
  getCount() {
    return this.count;
  }

  /*
   * Get status
   */
  getStatus() {
    return this.status;
  }

  /*
   * Increment count
   */
  increment() {
    this.count++;
  }

  /*
   * Set status
   */
  setStatus(status: string) {
    try {
      schemas.DemoStateSchema.shape.status.parse(status);
      this.status = status;
    } catch (error) {
      console.error("Invalid status update:", error);
    }
  }
}

// Export a singleton instance for use in components
export const demoState = DemoState.getInstance();
