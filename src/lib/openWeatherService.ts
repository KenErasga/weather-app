import type { OpenWeatherForecastResponse } from "@/types/weather";
import { openWeatherConfig } from "./config";

export class OpenWeatherError extends Error {
    constructor(
        message: string,
        public readonly statusCode?: number,
    ) {
        super(message);
        this.name = "OpenWeatherError";
    }
}

export async function fetchRawForecast(city: string): Promise<OpenWeatherForecastResponse> {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        throw new OpenWeatherError("Server configuration error: missing API key");
    }

    const { baseUrl, units } = openWeatherConfig;
    const url = `${baseUrl}/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${apiKey}`;

    const res = await fetch(url);

    if (!res.ok) {
        if (res.status === 404) {
            throw new OpenWeatherError(`City "${city}" not found`, res.status);
        }

        if (res.status === 429) {
            throw new OpenWeatherError("Rate limit exceeded. Please try again later.", res.status);
        }

        throw new OpenWeatherError("Failed to fetch forecast data", res.status);
    }

    return res.json();
}
