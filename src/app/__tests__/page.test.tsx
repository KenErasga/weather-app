import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "../page";

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
