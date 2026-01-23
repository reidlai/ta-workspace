import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import UserProfilePage from "./+page.svelte";

describe("UserProfilePage", () => {
  describe("component", () => {
    it("renders the user id", () => {
      const data = { id: "456" };
      render(UserProfilePage, { data });

      expect(screen.getByText("User Profile")).toBeInTheDocument();
      expect(screen.getByText("456")).toBeInTheDocument();
      expect(
        screen.getByText((content) =>
          content.includes("/routing/advanced/users/[id]"),
        ),
      ).toBeInTheDocument();
    });
  });
});
