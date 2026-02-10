"use client";

import Link from "next/link";

export default function ForecastError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-4">
            <h1 className="mb-4 text-3xl font-bold">Something went wrong</h1>
            <p className="mb-6 text-gray-600">{error.message}</p>
            <div className="flex gap-4">
                <button onClick={reset} className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    Try again
                </button>
                <Link href="/" className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50">
                    Back to home
                </Link>
            </div>
        </main>
    );
}
