"use client";

export default function SearchForm() {
  return (
    <form className="flex">
      <input
        type="text"
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
