import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import ContactPage from "./+page.svelte";

describe("ContactPage", () => {
    it("renders the contact us title", () => {
        render(ContactPage);

        expect(screen.getByText("Contact Us")).toBeInTheDocument();
        expect(
            screen.getByText((content) => content.includes("/routing/basic/contact")),
        ).toBeInTheDocument();
    });
});
