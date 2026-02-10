import { render, fireEvent, cleanup, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import SearchForm from "../SearchForm";

const mockPush = vi.fn();
let mockPathname = "/";

vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
    usePathname: () => mockPathname,
}));

describe("SearchForm", () => {
    beforeEach(() => {
        mockPush.mockClear();
        mockPathname = "/";
    });

    afterEach(() => {
        cleanup();
    });

    it("renders the search input with correct placeholder", () => {
        const { container } = render(<SearchForm />);
        const view = within(container);
        expect(view.getByPlaceholderText("Search for a city...")).toBeInTheDocument();
    });

    it("renders the submit button", () => {
        const { container } = render(<SearchForm />);
        const view = within(container);
        const buttons = view.getAllByRole("button", { name: /get weather/i });
        expect(buttons.length).toBeGreaterThan(0);
    });

    it("navigates to /forecast with city query on submit", () => {
        const { container } = render(<SearchForm />);
        const view = within(container);
        const input = view.getByPlaceholderText("Search for a city...");
        fireEvent.change(input, { target: { value: "London" } });
        fireEvent.submit(view.getByRole("button", { name: /get weather/i }));
        expect(mockPush).toHaveBeenCalledWith("/forecast/London");
    });

    it("shows error when submitting empty input", () => {
        const { container } = render(<SearchForm />);
        const view = within(container);
        fireEvent.submit(view.getByRole("button", { name: /get weather/i }));
        expect(view.getByText("Please enter a city name")).toBeInTheDocument();
        expect(mockPush).not.toHaveBeenCalled();
    });

    it("shows error when city name contains numbers", () => {
        const { container } = render(<SearchForm />);
        const view = within(container);
        const input = view.getByPlaceholderText("Search for a city...");
        fireEvent.change(input, { target: { value: "London123" } });
        fireEvent.submit(view.getByRole("button", { name: /get weather/i }));
        expect(view.getByText("City name can only contain letters, spaces, hyphens and apostrophes")).toBeInTheDocument();
        expect(mockPush).not.toHaveBeenCalled();
    });

    it("clears input and error on successful submit", () => {
        const { container } = render(<SearchForm />);
        const view = within(container);
        const input = view.getByPlaceholderText("Search for a city...");

        // First trigger an error
        fireEvent.submit(view.getByRole("button", { name: /get weather/i }));
        expect(view.getByText("Please enter a city name")).toBeInTheDocument();

        // Now submit a valid city
        fireEvent.change(input, { target: { value: "London" } });
        fireEvent.submit(view.getByRole("button", { name: /get weather/i }));

        expect(mockPush).toHaveBeenCalledWith("/forecast/London");
        expect(input).toHaveValue("");
        expect(view.queryByText("Please enter a city name")).not.toBeInTheDocument();
    });
});
