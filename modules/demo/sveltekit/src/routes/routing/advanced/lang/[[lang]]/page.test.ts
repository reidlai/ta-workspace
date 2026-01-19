import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import LangPage from "./+page.svelte";

describe("LangPage", () => {
    it("renders with default language when no param provided", () => {
        const data = { lang: "default" };
        render(LangPage, { data });

        expect(screen.getByText("Language Selection")).toBeInTheDocument();
        expect(screen.getByText("default")).toBeInTheDocument();
        expect(
            screen.getByText("No language specified, defaulting to English."),
        ).toBeInTheDocument();
    });

    it("renders with specific language when param provided", () => {
        const data = { lang: "fr" };
        render(LangPage, { data });

        expect(screen.getByText("fr")).toBeInTheDocument();
        expect(
            screen.queryByText("No language specified, defaulting to English."),
        ).not.toBeInTheDocument();
    });
});
