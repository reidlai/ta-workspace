import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import AboutPage from "./+page.svelte";

describe("AboutPage", () => {
    it("renders the about us title", () => {
        render(AboutPage);

        expect(screen.getByText("About Us")).toBeInTheDocument();
        expect(
            screen.getByText((content) => content.includes("/routing/basic/about")),
        ).toBeInTheDocument();
    });
});
