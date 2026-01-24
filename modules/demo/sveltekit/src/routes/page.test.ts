import { render, screen, fireEvent } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import DemoPage from "./+page.svelte";
import { goto } from "$app/navigation";

// Mock $app/navigation
vi.mock("$app/navigation", () => ({
  goto: vi.fn(),
}));

describe("DemoPage", () => {
  it("renders the first step correctly", () => {
    render(DemoPage);

    expect(
      screen.getByText("Demo Feature - Multi-Step Journey"),
    ).toBeInTheDocument();
    expect(screen.getByText("Welcome to AppShell")).toBeInTheDocument();
    expect(
      screen.getByText("This is a demonstration of the modular architecture."),
    ).toBeInTheDocument();

    const prevButton = screen.getByText("Previous");
    const nextButton = screen.getByText("Next");

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeInTheDocument();
  });

  it("navigates to the next step when Next is clicked", async () => {
    render(DemoPage);

    const nextButton = screen.getByText("Next");
    await fireEvent.click(nextButton);

    // Step 2
    expect(screen.getByText("Feature Modules")).toBeInTheDocument();
    expect(
      screen.getByText("Self-contained units of functionality."),
    ).toBeInTheDocument();

    const prevButton = screen.getByText("Previous");
    expect(prevButton).not.toBeDisabled();
  });

  it("navigates back when Previous is clicked", async () => {
    render(DemoPage);

    const nextButton = screen.getByText("Next");
    await fireEvent.click(nextButton);

    // Verify we are on Step 2
    expect(screen.getByText("Feature Modules")).toBeInTheDocument();

    const prevButton = screen.getByText("Previous");
    await fireEvent.click(prevButton);

    // Verify we are back on Step 1
    expect(screen.getByText("Welcome to AppShell")).toBeInTheDocument();
  });

  it('calls goto("/") when Finish is clicked on the last step', async () => {
    render(DemoPage);

    const nextButton = screen.getByText("Next");

    // Step 1 -> Step 2
    await fireEvent.click(nextButton);

    // Step 2 -> Step 3
    await fireEvent.click(nextButton);

    // Verify we are on the last step
    expect(screen.getByText("Ready to Build")).toBeInTheDocument();
    const finishButton = screen.getByText("Finish");
    expect(finishButton).toBeInTheDocument();

    // Click Finish
    await fireEvent.click(finishButton);

    expect(goto).toHaveBeenCalledWith("/");
  });
  it("renders the routing examples link", () => {
    render(DemoPage);

    expect(screen.getByText("SvelteKit Routing Examples")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "View Routing Examples" }),
    ).toHaveAttribute("href", "/routing");
  });
});
