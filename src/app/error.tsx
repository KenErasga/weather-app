"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-4">
            <h1 className="mb-4 text-3xl font-bold">Something went wrong</h1>
            <p className="mb-6 text-gray-600">{error.message}</p>
            <button onClick={reset} className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                Try again
            </button>
        </main>
    );
}
