"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { validateCity } from "@/lib/validateCity";

export default function SearchForm() {
    const [city, setCity] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const [prevPathname, setPrevPathname] = useState(pathname);

    if (pathname !== prevPathname) {
        setPrevPathname(pathname);
        setError(null);
        setCity("");
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = city.trim();
        const validationError = validateCity(trimmed);
        if (validationError) {
            setError(validationError);
            return;
        }
        setError(null);
        setCity("");
        router.push(`/forecast/${encodeURIComponent(trimmed)}`);
    }

    return (
        <div>
            <form className="flex" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search for a city..."
                    aria-invalid={!!error}
                    aria-describedby={error ? "search-error" : undefined}
                    className={`rounded-l-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${error ? "border-red-500" : "border-gray-300"}`}
                />
                <button type="submit" className="rounded-r-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    Get Weather
                </button>
            </form>
            {error && (
                <p id="search-error" className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}
