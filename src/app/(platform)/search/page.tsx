"use client";

import { useState } from "react";
import {
  SearchProvider,
  useSearch,
} from "@/features/search/context/search-context";
import { SearchPanel } from "@/features/search/components/SearchPanel";
import { MobileMapToggle } from "@/features/search/components/MobileMapToggle";
import { MapView } from "@/features/map/components/MapView";

function SearchPageContent() {
  const { results, hoveredId } = useSearch();
  const [showMobileMap, setShowMobileMap] = useState(false);

  return (
    <div className="flex h-[calc(100vh-72px)] overflow-hidden">
      <div
        className={`flex w-full flex-col md:w-[55%] lg:w-1/2 ${
          showMobileMap ? "hidden md:flex" : "flex"
        }`}
      >
        <SearchPanel />
      </div>

      <div
        className={`w-full md:block md:w-[45%] lg:w-1/2 ${
          showMobileMap ? "block" : "hidden"
        }`}
      >
        <div className="h-full">
          <MapView properties={results} hoveredId={hoveredId} />
        </div>
      </div>

      <MobileMapToggle
        showMap={showMobileMap}
        onToggle={() => setShowMobileMap((prev) => !prev)}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <SearchProvider>
      <SearchPageContent />
    </SearchProvider>
  );
}
