"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  Suspense,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { hybridSearch } from "../actions/hybrid-search";
import type { HybridSearchResult } from "../types";

interface SearchContextValue {
  results: HybridSearchResult[];
  isLoading: boolean;
  query: string;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  executeSearch: (text: string) => void;
  cancelSearch: () => void;
  hasSearched: boolean;
}

const SearchContext = createContext<SearchContextValue | null>(null);

function QueryInitializer({
  executeSearch,
}: {
  executeSearch: (text: string) => void;
}) {
  const searchParams = useSearchParams();
  const prevQ = useRef<string | null>(null);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && q !== prevQ.current) {
      prevQ.current = q;
      executeSearch(q);
    }
  }, [searchParams, executeSearch]);

  return null;
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<HybridSearchResult[]>([]);
  const [query, setQuery] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchIdRef = useRef(0);

  useEffect(() => {
    const restoreCache = () => {
      try {
        const cached = sessionStorage.getItem("hogari_search_cache");
        if (cached) {
          const { results: cachedResults, query: cachedQuery, hasSearched: cachedHasSearched } = JSON.parse(cached);
          const urlParams = new URLSearchParams(window.location.search);
          const urlQ = urlParams.get("q");
          if (!urlQ || urlQ === cachedQuery) {
            setResults(cachedResults || []);
            setQuery(cachedQuery || "");
            setHasSearched(cachedHasSearched || false);
          }
        }
      } catch {}
    };

    requestAnimationFrame(restoreCache);
  }, []);

  useEffect(() => {
    if (query || results.length > 0 || hasSearched) {
      try {
        sessionStorage.setItem(
          "hogari_search_cache",
          JSON.stringify({ results, query, hasSearched })
        );
      } catch {}
    }
  }, [results, query, hasSearched]);

  const cancelSearch = useCallback(() => {
    searchIdRef.current += 1;
    setIsLoading(false);
  }, []);

  const executeSearch = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setQuery(trimmed);
    setHasSearched(true);
    setIsLoading(true);

    const currentSearchId = ++searchIdRef.current;

    (async () => {
      try {
        const data = await hybridSearch({ text: trimmed });
        if (currentSearchId === searchIdRef.current) {
          setResults(data);
          setIsLoading(false);
        }
      } catch {
        if (currentSearchId === searchIdRef.current) {
          setIsLoading(false);
        }
      }
    })();
  }, []);

  return (
    <SearchContext.Provider
      value={{
        results,
        isLoading,
        query,
        hoveredId,
        setHoveredId,
        executeSearch,
        cancelSearch,
        hasSearched,
      }}
    >
      <Suspense fallback={null}>
        <QueryInitializer executeSearch={executeSearch} />
      </Suspense>
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
