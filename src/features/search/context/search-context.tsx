"use client";

import {
  createContext,
  useContext,
  useState,
  useTransition,
  useCallback,
  type ReactNode,
} from "react";
import { hybridSearch } from "../actions/hybrid-search";
import type { HybridSearchResult } from "../types";

interface SearchContextValue {
  results: HybridSearchResult[];
  isLoading: boolean;
  query: string;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  executeSearch: (text: string) => void;
  hasSearched: boolean;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<HybridSearchResult[]>([]);
  const [query, setQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isPending, startTransition] = useTransition();

  const executeSearch = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setQuery(trimmed);
    setHasSearched(true);

    startTransition(async () => {
      const data = await hybridSearch({ text: trimmed });
      setResults(data);
    });
  }, []);

  return (
    <SearchContext.Provider
      value={{
        results,
        isLoading: isPending,
        query,
        hoveredId,
        setHoveredId,
        executeSearch,
        hasSearched,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return ctx;
}
