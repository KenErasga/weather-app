import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ForecastDetailPage from "../page";
import type { ForecastData } from "@/types/weather";

vi.mock("@/lib/fetchForecast", () => ({
    fetchForecast: vi.fn(),
}));

import { fetchForecast } from "@/lib/fetchForecast";
const mockFetchForecast = vi.mocked(fetchForecast);

const mockData: ForecastData = {
    city: "London",
    country: "GB",
    days: [
        {
            date: "2025-03-07",
            highTemp: 46,
            lowTemp: 41,
            description: "light rain",
            icon: "10d",
            humidity: 71,
        },
    ],
};

describe("ForecastDetailPage", () => {
    beforeEach(() => {
        mockFetchForecast.mockReset();
    });

    it("renders city name", async () => {
        mockFetchForecast.mockResolvedValue(mockData);

        const page = await ForecastDetailPage({
            params: Promise.resolve({ city: "London", date: "2025-03-07" }),
        });
        render(page);

        expect(screen.getByText("London")).toBeInTheDocument();
    });

    it("renders description, min/max temps, and humidity", async () => {
        mockFetchForecast.mockResolvedValue(mockData);

        const page = await ForecastDetailPage({
            params: Promise.resolve({ city: "London", date: "2025-03-07" }),
        });
        render(page);

        expect(screen.getByText("light rain")).toBeInTheDocument();
        expect(screen.getByText(/Min temp:/)).toBeInTheDocument();
        expect(screen.getByText("41")).toBeInTheDocument();
        expect(screen.getByText(/Max temp:/)).toBeInTheDocument();
        expect(screen.getByText("46")).toBeInTheDocument();
        expect(screen.getByText(/Humidity:/)).toBeInTheDocument();
        expect(screen.getByText("71")).toBeInTheDocument();
    });
});
