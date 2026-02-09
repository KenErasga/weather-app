import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ForecastPage from "../page";
import type { ForecastData } from "@/types/weather";

vi.mock("@/lib/fetchForecast", () => ({
  fetchForecast: vi.fn(),
}));

import { fetchForecast } from "@/lib/fetchForecast";
const mockFetchForecast = vi.mocked(fetchForecast);

describe("ForecastPage", () => {
  beforeEach(() => {
    mockFetchForecast.mockReset();
  });

  it("renders forecast data for a valid city", async () => {
    const mockData: ForecastData = {
      city: "London",
      country: "GB",
      days: [
        {
          date: "2025-01-10",
          highTemp: 12,
          lowTemp: 5,
          description: "clear sky",
          icon: "01d",
          humidity: 65,
        },
        {
          date: "2025-01-11",
          highTemp: 10,
          lowTemp: 3,
          description: "light rain",
          icon: "10d",
          humidity: 80,
        },
      ],
    };
    mockFetchForecast.mockResolvedValue(mockData);

    const page = await ForecastPage({
      params: Promise.resolve({ city: "London" }),
    });
    render(page);

    expect(screen.getByText("London, GB")).toBeInTheDocument();
    expect(screen.getByText(/12° \/ 5°/)).toBeInTheDocument();
    expect(screen.getByText(/clear sky/)).toBeInTheDocument();
    expect(screen.getByText(/10° \/ 3°/)).toBeInTheDocument();
    expect(screen.getByText(/light rain/)).toBeInTheDocument();
  });

  it("renders day items as links to detail pages", async () => {
    const mockData: ForecastData = {
      city: "London",
      country: "GB",
      days: [
        {
          date: "2025-01-10",
          highTemp: 12,
          lowTemp: 5,
          description: "clear sky",
          icon: "01d",
          humidity: 65,
        },
      ],
    };
    mockFetchForecast.mockResolvedValue(mockData);

    const page = await ForecastPage({
      params: Promise.resolve({ city: "London" }),
    });
    render(page);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "/forecast/London/2025-01-10");
  });
});
