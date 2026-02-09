import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SearchForm from "../SearchForm";

describe("SearchForm", () => {
  it("renders the search input with correct placeholder", () => {
    render(<SearchForm />);
    expect(
      screen.getByPlaceholderText("Search for a city..."),
    ).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<SearchForm />);
    const buttons = screen.getAllByRole("button", { name: /get weather/i });
    expect(buttons.length).toBeGreaterThan(0);
  });
});
