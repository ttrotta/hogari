"use client";

import { Sparkles } from "lucide-react";
import { useSearch } from "../context/search-context";

export function AISummary() {
  const { results, query, hasSearched, isLoading } = useSearch();

  if (!hasSearched || isLoading || results.length === 0) return null;

  const topScore = results[0]?.score ?? 0;

  return (
    <div className="border-primary/20 from-primary-light/60 relative overflow-hidden rounded-xl border bg-linear-to-r via-white to-white p-4">
      <div className="bg-primary absolute top-0 left-0 h-full w-1" />
      <div className="flex items-start gap-3 pl-2">
        <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
          <Sparkles className="text-primary-dark h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">
            Encontré {results.length}{" "}
            {results.length === 1 ? "propiedad" : "propiedades"} para{" "}
            <span className="text-primary-dark">&quot;{query}&quot;</span>
          </p>
          <p className="mt-0.5 text-xs text-gray-500">
            Mejor coincidencia: {topScore}% de relevancia
          </p>
        </div>
      </div>
    </div>
  );
}
