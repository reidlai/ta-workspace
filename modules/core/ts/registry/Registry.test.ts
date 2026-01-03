import { describe, it, expect, beforeEach, vi } from "vitest";
import { Registry } from "./Registry";
import type { IModuleBundle, IWidget } from "@core/types";

describe("Registry", () => {
  let registry: Registry;

  beforeEach(() => {
    registry = Registry.getInstance();
    registry.clear();
    vi.unstubAllGlobals();
  });

  it("should retrieve a widget by ID", () => {
    const widget: IWidget = {
      id: "test-widget",
      title: "Test Widget",
      component: {} as any,
    };

    const bundle: IModuleBundle = {
      id: "test-module",
      widgets: [widget],
    };

    registry.register(bundle);

    const retrieved = registry.getWidget("test-widget");
    expect(retrieved).toBeDefined();
    expect(retrieved?.id).toBe("test-widget");
    expect(retrieved?.title).toBe("Test Widget");
  });

  it("should return undefined for non-existent widget", () => {
    const retrieved = registry.getWidget("non-existent");
    expect(retrieved).toBeUndefined();
  });

  it("should warn and ignore duplicate widget IDs", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const widget1: IWidget = {
      id: "duplicate-widget",
      title: "Original",
      component: {} as any,
    };

    const widget2: IWidget = {
      id: "duplicate-widget",
      title: "Duplicate",
      component: {} as any,
    };

    registry.register({ id: "mod1", widgets: [widget1] });
    registry.register({ id: "mod2", widgets: [widget2] });

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Duplicate widget ID found: duplicate-widget"),
    );

    const retrieved = registry.getWidget("duplicate-widget");
    expect(retrieved?.title).toBe("Original");
  });

  it("should auto-populate getWidgets() via the map", () => {
    const widget: IWidget = {
      id: "map-widget",
      title: "Map Widget",
      component: {} as any,
    };

    registry.register({ id: "mod", widgets: [widget] });

    const allWidgets = registry.getWidgets();
    expect(allWidgets).toHaveLength(1);
    expect(allWidgets[0].id).toBe("map-widget");
  });
});
