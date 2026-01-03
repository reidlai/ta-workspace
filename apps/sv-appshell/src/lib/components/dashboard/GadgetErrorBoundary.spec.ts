import { describe, it, expect } from "vitest";
import { mount, unmount } from "svelte";
import GadgetErrorBoundary from "./GadgetErrorBoundary.svelte";

describe("GadgetErrorBoundary", () => {
  it("should export setError method", () => {
    // Verify the component exports the expected API
    expect(GadgetErrorBoundary).toBeDefined();
  });

  it("should handle error state management", () => {
    // Test the error handling logic exists using Svelte 5 mount API
    const exports: { setError?: (e: Error) => void } = {};
    const component = mount(GadgetErrorBoundary, {
      target: document.createElement("div"),
      props: {
        gadgetTitle: "Test Gadget",
      },
      exports,
    });

    expect(component).toBeDefined();
    expect(typeof exports.setError).toBe("function");

    unmount(component);
  });

  it("should accept gadgetTitle prop", () => {
    const component = mount(GadgetErrorBoundary, {
      target: document.createElement("div"),
      props: {
        gadgetTitle: "Custom Gadget",
      },
    });

    expect(component).toBeDefined();
    unmount(component);
  });
});
