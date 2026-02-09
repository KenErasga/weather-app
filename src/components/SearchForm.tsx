"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const [city, setCity] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) return;
    router.push(`/forecast/${encodeURIComponent(trimmed)}`);
  }

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city..."
        className="rounded-l-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        className="rounded-r-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Get Weather
      </button>
    </form>
  );
}
