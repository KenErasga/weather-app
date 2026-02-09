import { describe, it, expect } from "vitest";
import { groupByDay } from "../fetchForecast";
import type { OpenWeatherInterval } from "@/types/weather";

function makeInterval(
  dt_txt: string,
  temp: number,
  temp_min: number,
  temp_max: number,
  description = "clear sky",
  icon = "01d",
): OpenWeatherInterval {
  return {
    dt: 0,
    dt_txt,
    main: { temp, temp_min, temp_max },
    weather: [{ description, icon }],
  };
}

describe("groupByDay", () => {
  it("groups intervals by date", () => {
    const intervals = [
      makeInterval("2025-01-10 06:00:00", 5, 4, 6),
      makeInterval("2025-01-10 12:00:00", 10, 8, 12),
      makeInterval("2025-01-11 06:00:00", 3, 2, 4),
    ];

    const days = groupByDay(intervals);
    expect(days).toHaveLength(2);
    expect(days[0].date).toBe("2025-01-10");
    expect(days[1].date).toBe("2025-01-11");
  });

  it("computes high and low temps across intervals", () => {
    const intervals = [
      makeInterval("2025-01-10 06:00:00", 5, 3, 7),
      makeInterval("2025-01-10 12:00:00", 10, 8, 15),
      makeInterval("2025-01-10 18:00:00", 6, 4, 9),
    ];

    const days = groupByDay(intervals);
    expect(days[0].highTemp).toBe(15);
    expect(days[0].lowTemp).toBe(3);
  });

  it("picks midday interval for description and icon", () => {
    const intervals = [
      makeInterval("2025-01-10 06:00:00", 5, 4, 6, "morning fog", "50d"),
      makeInterval("2025-01-10 12:00:00", 10, 8, 12, "sunny", "01d"),
      makeInterval("2025-01-10 18:00:00", 7, 5, 9, "cloudy", "04d"),
    ];

    const days = groupByDay(intervals);
    expect(days[0].description).toBe("sunny");
    expect(days[0].icon).toBe("01d");
  });

  it("falls back to first interval when no midday exists", () => {
    const intervals = [
      makeInterval("2025-01-10 06:00:00", 5, 4, 6, "morning fog", "50d"),
      makeInterval("2025-01-10 09:00:00", 8, 6, 10, "partly cloudy", "03d"),
    ];

    const days = groupByDay(intervals);
    expect(days[0].description).toBe("morning fog");
    expect(days[0].icon).toBe("50d");
  });

  it("rounds temps to integers", () => {
    const intervals = [makeInterval("2025-01-10 12:00:00", 10.7, 8.3, 15.6)];

    const days = groupByDay(intervals);
    expect(days[0].highTemp).toBe(16);
    expect(days[0].lowTemp).toBe(8);
  });
});
