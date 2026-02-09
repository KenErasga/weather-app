import Link from "next/link";
import SearchForm from "./SearchForm";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-orange-500 px-6 py-4">
      <Link href="/" className="text-xl font-bold text-white">
        Weather App
      </Link>
      <SearchForm />
    </nav>
  );
}
