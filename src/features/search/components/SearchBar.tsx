"use client";

import {
  useState,
  useCallback,
  type KeyboardEvent,
  type FormEvent,
} from "react";
import { Search, Send, Loader2 } from "lucide-react";
import { useSearch } from "../context/search-context";

export function SearchBar() {
  const { executeSearch, isLoading } = useSearch();
  const [input, setInput] = useState("");

  const handleSubmit = useCallback(
    (e?: FormEvent) => {
      e?.preventDefault();
      if (!input.trim() || isLoading) return;
      executeSearch(input);
    },
    [input, isLoading, executeSearch],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="focus-within:border-primary/40 relative flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus-within:shadow-md">
        <Search className="h-5 w-5 shrink-0 text-gray-400" />
        <textarea
          id="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar departamento cerca de la UTN, 2 ambientes..."
          rows={1}
          className="max-h-20 min-h-6 flex-1 resize-none bg-transparent text-sm leading-relaxed text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-primary hover:bg-primary-dark flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>
    </form>
  );
}
