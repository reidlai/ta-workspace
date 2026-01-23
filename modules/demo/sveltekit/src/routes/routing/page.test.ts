import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import RoutingPage from "./+page.svelte";

describe("RoutingPage", () => {
  it("renders the routing examples menu", () => {
    render(RoutingPage);

    expect(screen.getByText("SvelteKit Routing Examples")).toBeInTheDocument();

    // Check for Basic Routing section
    expect(screen.getByText("Basic Routing")).toBeInTheDocument();
    expect(
      screen.getByText("Sub-route (/routing/basic/hello)"),
    ).toBeInTheDocument();

    // Check for Advanced Routing section
    expect(screen.getByText("Advanced Routing")).toBeInTheDocument();
    expect(screen.getByText("Dynamic Param ([id])")).toBeInTheDocument();
  });
});
