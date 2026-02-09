import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "../page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Home", () => {
  it("renders the heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /my weather app/i }),
    ).toBeInTheDocument();
  });

  it("renders a SearchForm", () => {
    render(<Home />);
    const inputs = screen.getAllByPlaceholderText("Search for a city...");
    expect(inputs.length).toBeGreaterThan(0);
  });
});
