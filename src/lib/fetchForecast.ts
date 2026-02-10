import type {
  OpenWeatherInterval,
  DayForecast,
  ForecastData,
  ForecastError,
} from "@/types/weather";
import { fetchRawForecast, OpenWeatherError } from "./openWeatherService";

export function groupByDay(intervals: OpenWeatherInterval[]): DayForecast[] {
  // Group intervals by date (YYYY-MM-DD)
  const intervalsByDate = new Map<string, OpenWeatherInterval[]>();

  for (const interval of intervals) {
    // Extract date part from dt_txt (format: 'YYYY-MM-DD HH:MM:SS')
    const date = interval.dt_txt.split(" ")[0];
    if (!intervalsByDate.has(date)) {
      intervalsByDate.set(date, []);
    }
    intervalsByDate.get(date)!.push(interval);
  }

  const days: DayForecast[] = [];

  // Get days
  for (const [date, dayIntervals] of intervalsByDate) {
    // Find the highest and lowest temperature for the day
    const highTemp = Math.round(
      Math.max(...dayIntervals.map((interval) => interval.main.temp_max)),
    );
    const lowTemp = Math.round(
      Math.min(...dayIntervals.map((interval) => interval.main.temp_min)),
    );

    // Prefer the 12:00 forecast for description/icon, fallback to first interval
    const middayInterval =
      dayIntervals.find((interval) => interval.dt_txt.includes("12:00")) ||
      dayIntervals[0];

    days.push({
      date,
      highTemp,
      lowTemp,
      description: middayInterval.weather[0]?.description,
      icon: middayInterval.weather[0]?.icon,
      humidity: middayInterval.main?.humidity,
    });
  }

  return days;
}

export async function fetchForecast(
  city: string,
): Promise<ForecastData | ForecastError> {
  try {
    const data = await fetchRawForecast(city);
    const days = groupByDay(data.list);

    return {
      city: data.city.name,
      country: data.city.country,
      days,
    };
  } catch (error) {
    if (error instanceof OpenWeatherError) {
      return { error: error.message };
    }
    return { error: "Failed to fetch forecast data" };
  }
}
