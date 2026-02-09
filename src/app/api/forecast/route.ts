import { NextRequest, NextResponse } from "next/server";
import { fetchForecast } from "@/lib/fetchForecast";

//TODO: better error handling, e.g. distinguish between city not found and API errors
export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city");

  if (!city) {
    return NextResponse.json(
      { error: "Missing city parameter" },
      { status: 400 },
    );
  }

  const result = await fetchForecast(city);

  if ("error" in result) {
    const status = result.error.includes("not found") ? 404 : 500;
    return NextResponse.json(result, { status });
  }

  return NextResponse.json(result);
}
