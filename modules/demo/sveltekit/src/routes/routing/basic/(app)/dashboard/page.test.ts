import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import DashboardPage from "./+page.svelte";

describe("DashboardPage", () => {
  it("renders the dashboard title", () => {
    render(DashboardPage);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("(app)/+layout.svelte")),
    ).toBeInTheDocument();
  });
});
