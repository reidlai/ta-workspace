import { describe, it, expect, beforeEach, vi } from "vitest";
import { demoRxService } from "@modules/demo-ts";
import { demoState } from "./DemoState.svelte";

describe("DemoState (Runes)", () => {
  // Reset service before each test to ensure a clean state
  beforeEach(() => {
    demoRxService.setStatus("Demo service is running");
    // Resetting count is harder since it's only manipulated via increment,
    // but for integration tests we can just assert relative changes or value.
    // Or we can rely on `demoState` reflecting whatever the service has.
  });

  it("should initialize with values from the service", () => {
    expect(demoState.status).toBe(demoRxService.getStatus());
    expect(demoState.count).toBe(demoRxService.getCount());
  });

  it("should update status when service emits new value", async () => {
    const newStatus = "Updated Status";
    demoRxService.setStatus(newStatus);

    // Runes are synchronous in this context often, but if there's any async scheduling
    // we might wait. However, RxJS subscription runs synchronously if behavior subject emits.
    expect(demoState.status).toBe(newStatus);
  });

  it("should update count when service increments", () => {
    const initialCount = demoState.count;
    demoRxService.increment();
    expect(demoState.count).toBe(initialCount + 1);
  });

  it("should update count when calling local increment method", () => {
    // This validates the outgoing flow: UI -> Method -> Service -> Stream -> UI
    const initialCount = demoState.count;
    demoState.increment();
    expect(demoState.count).toBe(initialCount + 1);
  });

  it("should log error for invalid schema updates", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // Force an invalid status update via the service (if we could bypass TS)
    // Since we are in TS, we might cast to any to simulate bad data from an unchecked source
    (demoRxService as any).setStatus(123); // Invalid type for status (expects string)

    expect(consoleSpy).toHaveBeenCalledWith(
      "Invalid status update:",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });
});
