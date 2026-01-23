import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import HelloPage from "./+page.svelte";

describe("HelloPage", () => {
  it("renders the hello world message", () => {
    render(HelloPage);

    expect(screen.getByText("Hello World")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("/routing/basic/hello")),
    ).toBeInTheDocument();
  });
});
