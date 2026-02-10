import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Navbar from "../Navbar";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Navbar", () => {
  it("renders the app title", () => {
    render(<Navbar />);
    expect(screen.getByText("My Weather App")).toBeInTheDocument();
  });

  it("renders a SearchForm inside the nav", () => {
    render(<Navbar />);
    const inputs = screen.getAllByPlaceholderText("Search for a city...");
    expect(inputs.length).toBeGreaterThan(0);
  });
});
