import type {
  OpenWeatherForecastResponse,
  OpenWeatherInterval,
  DayForecast,
  ForecastData,
  ForecastError,
} from "@/types/weather";

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
      Math.max(...dayIntervals.map((interval) => interval.main.temp_max))
    );
    const lowTemp = Math.round(
      Math.min(...dayIntervals.map((interval) => interval.main.temp_min))
    );

    // Prefer the 12:00 forecast for description/icon, fallback to first interval
    const middayInterval =
      dayIntervals.find((interval) => interval.dt_txt.includes("12:00")) || dayIntervals[0];

    days.push({
      date,
      highTemp,
      lowTemp,
      description: middayInterval.weather[0].description,
      icon: middayInterval.weather[0].icon,
    });
  }

  return days;
}

export async function fetchForecast(
  city: string,
): Promise<ForecastData | ForecastError> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return { error: "Server configuration error: missing API key" };
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  const res = await fetch(url);

  // TODO: better error handling, e.g. distinguish between city not found and API errors
  if (!res.ok) {
    if (res.status === 404) {
      return { error: `City "${city}" not found` };
    }
    return { error: "Failed to fetch forecast data" };
  }

  const data: OpenWeatherForecastResponse = await res.json();
  const days = groupByDay(data.list);

  return {
    city: data.city.name,
    country: data.city.country,
    days,
  };
}
