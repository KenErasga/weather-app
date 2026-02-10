import Image from "next/image";
import Link from "next/link";
import { fetchForecast } from "@/lib/fetchForecast";
import { openWeatherConfig } from "@/lib/config";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

export default async function ForecastPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city);
  const result = await fetchForecast(decodedCity);

  // TODO: better error handling, e.g. distinguish between city not found and API errors
  if ("error" in result) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-lg text-red-600">{result.error}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">
        {result.city}, {result.country}
      </h1>
      <ul className="space-y-4">
        {result.days.map((day) => (
          <li key={day.date}>
            <Link
              href={`/forecast/${decodedCity}/${day.date}`}
              className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 cursor-pointer"
            >
              <Image
                src={openWeatherConfig.iconUrl(day.icon)}
                alt={day.description}
                width={64}
                height={64}
              />
              <div>
                <p className="font-semibold">{formatDate(day.date)}</p>
                <p className="text-gray-600">
                  {day.highTemp}° / {day.lowTemp}° &mdash; {day.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
