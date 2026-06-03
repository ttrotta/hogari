"use client";

import { Map, List } from "lucide-react";

interface MobileMapToggleProps {
  showMap: boolean;
  onToggle: () => void;
}

export function MobileMapToggle({ showMap, onToggle }: MobileMapToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-bold text-white shadow-xl transition-all duration-200 hover:scale-105 hover:bg-gray-800 active:scale-95 md:hidden"
    >
      {showMap ? (
        <>
          <List className="h-4 w-4" />
          Ver lista
        </>
      ) : (
        <>
          <Map className="h-4 w-4" />
          Ver mapa
        </>
      )}
    </button>
  );
}
