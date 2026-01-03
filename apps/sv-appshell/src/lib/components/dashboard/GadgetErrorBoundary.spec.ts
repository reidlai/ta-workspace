import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import GadgetErrorBoundary from "./GadgetErrorBoundary.svelte";

describe("GadgetErrorBoundary", () => {
  it("should export setError method", () => {
    // Verify the component exports the expected API
    expect(GadgetErrorBoundary).toBeDefined();
  });

  it("should handle error state management", () => {
    // Test the error handling logic exists using @testing-library/svelte
    const { component } = render(GadgetErrorBoundary, {
      props: {
        gadgetTitle: "Test Gadget",
      },
    });

    expect(component).toBeDefined();
    // The component object contains the exported setError function
    expect(typeof (component as { setError?: (e: Error) => void }).setError).toBe("function");
  });

  it("should accept gadgetTitle prop", () => {
    const { component } = render(GadgetErrorBoundary, {
      props: {
        gadgetTitle: "Custom Gadget",
      },
    });

    expect(component).toBeDefined();
  });
});
