import Image from "next/image";
import Link from "next/link";
import { fetchForecast } from "@/lib/fetchForecast";

function ordinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "long" });
  const year = date.getFullYear();
  return `${weekday}, ${day}${ordinalSuffix(day)} of ${month} ${year}`;
}

export default async function ForecastDetailPage({
  params,
}: {
  params: Promise<{ city: string; date: string }>;
}) {
  const { city, date } = await params;
  const decodedCity = decodeURIComponent(city);
  const result = await fetchForecast(decodedCity);

  if ("error" in result) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-lg text-red-600">{result.error}</p>
      </main>
    );
  }

  const day = result.days.find((d) => d.date === date);

  if (!day) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-lg text-red-600">
          No forecast data found for {date}
        </p>
        <Link
          href={`/forecast/${encodeURIComponent(city)}`}
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          &larr; Back to forecast
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href={`/forecast/${encodeURIComponent(city)}`}
        className="mb-6 inline-block text-blue-600 hover:underline"
      >
        &larr; Back to forecast
      </Link>

      <div className="flex flex-col items-center text-center">
        <Image
          src={`https://openweathermap.org/img/wn/${day.icon}@4x.png`}
          alt={day.description}
          width={128}
          height={128}
        />
        <p className="mt-2 text-lg text-gray-600">{formatDate(date)}</p>
        <h1 className="text-3xl font-bold">{result.city}</h1>
        <p className="mt-2 text-lg capitalize text-gray-600">
          {day.description}
        </p>
        <div className="mt-4 space-y-1 text-lg">
          <p>
            Min temp: <span className="font-semibold">{`${day.lowTemp}`}</span>{" "}
            degrees celcius
          </p>
          <p>
            Max temp: <span className="font-semibold">{`${day.highTemp}`}</span>{" "}
            degrees celcius
          </p>
          <p>
            Humidity: <span className="font-semibold">{day.humidity}</span>
          </p>
        </div>
      </div>
    </main>
  );
}
