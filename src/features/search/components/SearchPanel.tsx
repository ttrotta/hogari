"use client";

import { SearchBar } from "./SearchBar";
import { AISummary } from "./AISummary";
import { SearchResultsList } from "./SearchResultsList";

export function SearchPanel() {
  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 border-b border-gray-100 bg-white px-5 pb-4 pt-5">
        <SearchBar />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="flex flex-col gap-4">
          <AISummary />
          <SearchResultsList />
        </div>
      </div>
    </div>
  );
}
