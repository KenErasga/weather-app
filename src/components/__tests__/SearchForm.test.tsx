import { render, fireEvent, cleanup, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import SearchForm from "../SearchForm";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("SearchForm", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the search input with correct placeholder", () => {
    const { container } = render(<SearchForm />);
    const view = within(container);
    expect(
      view.getByPlaceholderText("Search for a city..."),
    ).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    const { container } = render(<SearchForm />);
    const view = within(container);
    const buttons = view.getAllByRole("button", { name: /get weather/i });
    expect(buttons.length).toBeGreaterThan(0);
  });

  // TODO: add tests for error handling, e.g. submitting empty input, submitting non-existent city, etc. This will require mocking the API response in the ForecastPage tests.
  it("navigates to /forecast with city query on submit", () => {
    const { container } = render(<SearchForm />);
    const view = within(container);
    const input = view.getByPlaceholderText("Search for a city...");
    fireEvent.change(input, { target: { value: "London" } });
    fireEvent.submit(view.getByRole("button", { name: /get weather/i }));
    expect(mockPush).toHaveBeenCalledWith("/forecast/London");
  });
});
