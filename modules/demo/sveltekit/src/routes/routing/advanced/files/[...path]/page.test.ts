import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import FileViewerPage from "./+page.svelte";

describe("FileViewerPage", () => {
    describe("component", () => {
        it("renders the path and breadcrumbs", () => {
            const data = {
                path: "a/b/c",
                segments: ["a", "b", "c"],
            };
            render(FileViewerPage, { data });

            expect(screen.getByText("File Viewer")).toBeInTheDocument();
            expect(screen.getByText("a/b/c")).toBeInTheDocument();

            // Check breadcrumbs
            const breadcrumbs = screen.getAllByRole("listitem");
            expect(breadcrumbs).toHaveLength(3);
            expect(breadcrumbs[0]).toHaveTextContent("a");
            expect(breadcrumbs[1]).toHaveTextContent("b");
            expect(breadcrumbs[2]).toHaveTextContent("c");
        });
    });
});
