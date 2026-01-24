import { describe, it, expect } from "vitest";
import { DemoRxService } from "./DemoRxService";

describe("DemoService", () => {
  it("should be a singleton", () => {
    const instance1 = DemoRxService.getInstance();
    const instance2 = DemoRxService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it("should manage status", () => {
    const service = DemoRxService.getInstance();
    const initialStatus = service.getStatus();
    expect(initialStatus).toBe("Demo service is running");

    service.setStatus("New Status");
    expect(service.getStatus()).toBe("New Status");
  });
});
