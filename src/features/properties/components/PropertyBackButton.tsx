"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function PropertyBackButton() {
  const [label, setLabel] = useState("Volver a la búsqueda");

  useEffect(() => {
    const updateLabel = () => {
      try {
        const cached = sessionStorage.getItem("hogari_search_cache");
        if (cached) {
          const { query } = JSON.parse(cached);
          if (query) {
            setLabel(`Volver a las recomendaciones de "${query}"`);
          }
        }
      } catch {}
    };

    requestAnimationFrame(updateLabel);
  }, []);

  return (
    <Link
      href="/search"
      className="hover:text-primary-dark inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors"
    >
      <ChevronLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}
