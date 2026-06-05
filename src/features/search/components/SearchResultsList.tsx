"use client";

import { useSearch } from "../context/search-context";
import { SearchResultCard } from "./SearchResultCard";
import { SearchThinking } from "./SearchThinking";
import { Search } from "lucide-react";

export function SearchResultsList() {
  const { results, isLoading, hasSearched } = useSearch();

  if (isLoading) {
    return <SearchThinking />;
  }

  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50">
          <Search className="h-6 w-6 text-gray-300" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-400">
            Describí lo que buscás
          </p>
          <p className="mt-1 max-w-[260px] text-xs text-gray-400">
            Podés buscar por zona, universidad, cantidad de ambientes,
            presupuesto...
          </p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50">
          <Search className="h-6 w-6 text-gray-300" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-500">
            No encontré propiedades
          </p>
          <p className="mt-1 max-w-[260px] text-xs text-gray-400">
            Intentá con otra búsqueda o ampliá el área de búsqueda.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-medium text-gray-400">
        {results.length} {results.length === 1 ? "propiedad" : "propiedades"}{" "}
        encontradas
      </p>
      {results.map((result) => (
        <SearchResultCard key={result.id} result={result} />
      ))}
    </div>
  );
}
