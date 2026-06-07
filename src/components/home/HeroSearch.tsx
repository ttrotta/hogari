"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Search } from "lucide-react";

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      action={handleSearch}
      className="relative mt-10 flex w-full flex-col items-center gap-4 sm:flex-row md:w-auto"
    >
      <div className="border-brand-light hover:border-primary focus-within:border-primary-dark focus-visible:ring-brand-light flex w-full items-center rounded-full border-4 bg-white px-8 py-4 text-lg font-bold shadow-lg transition-all focus-within:scale-105 hover:scale-105 focus:outline-none focus-visible:ring-4 sm:w-auto md:min-w-100">
        <Search className="mr-3 h-5 w-5 shrink-0 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-base font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
          placeholder="Buscar depto cerca de UTN..."
        />
      </div>
      <button
        type="submit"
        disabled={!query.trim()}
        className="bg-primary hover:bg-primary-dark focus-visible:ring-brand-light flex w-full items-center justify-center rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-4 disabled:opacity-50 sm:w-auto"
      >
        <Send className="mr-2 h-5 w-5" />
        Buscar
      </button>
    </form>
  );
}
