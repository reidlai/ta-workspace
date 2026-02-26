import { describe, it, expect, beforeEach, vi } from "vitest";
import { DemoState } from "./DemoState.svelte";

describe("DemoState (Runes)", () => {
  // Reset service before each test to ensure a clean state
  let demoState = DemoState.getInstance();

  beforeEach(() => {
    demoState.setStatus("Demo service is running");
  });

  it("should initialize with values from the service", () => {
    expect(demoState.status).toBe(demoState.getStatus());
    expect(demoState.count).toBe(demoState.getCount());
  });

  it("should update status when service emits new value", async () => {
    const newStatus = "Updated Status";
    demoState.setStatus(newStatus);

    expect(demoState.status).toBe(newStatus);
  });

  it("should update count when service increments", () => {
    const initialCount = demoState.count;
    demoState.increment();
    expect(demoState.count).toBe(initialCount + 1);
  });

  it("should update count when calling local increment method", () => {
    const initialCount = demoState.count;
    demoState.increment();
    expect(demoState.count).toBe(initialCount + 1);
  });

  it("should log error for invalid schema updates", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    (demoState as any).setStatus(123); // Invalid type for status (expects string)

    expect(consoleSpy).toHaveBeenCalledWith(
      "Invalid status update:",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });
});
