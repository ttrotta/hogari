"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { MapPin, BedDouble, Bath, Maximize2, ExternalLink } from "lucide-react";
import { useSearch } from "../context/search-context";
import type { HybridSearchResult } from "../types";

interface SearchResultCardProps {
  result: HybridSearchResult;
}

export function SearchResultCard({ result }: SearchResultCardProps) {
  const { hoveredId, setHoveredId } = useSearch();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = hoveredId === result.id;

  const formattedPrice =
    result.price >= 1000
      ? `${result.currency === "USD" ? "u$s" : "$"}${Math.round(result.price / 1000)}k`
      : `${result.currency === "USD" ? "u$s" : "$"}${result.price.toLocaleString()}`;

  const scoreColor =
    result.score >= 80
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : result.score >= 50
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-gray-50 text-gray-600 border-gray-200";

  const imageUrl =
    result.imageUrls && result.imageUrls.length > 0
      ? result.imageUrls[0]
      : null;

  return (
    <div
      ref={cardRef}
      id={`result-${result.id}`}
      onMouseEnter={() => setHoveredId(result.id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={() => router.push(`/property/${result.id}`)}
      className={`group relative flex cursor-pointer gap-4 rounded-xl border bg-white p-3 transition-all duration-200 ${
        isHovered
          ? "border-primary/40 ring-primary/10 shadow-md ring-1"
          : "border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md"
      }`}
    >
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={result.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="from-primary-light to-section-orange flex h-full w-full items-center justify-center bg-linear-to-br">
            <MapPin className="text-primary-dark/40 h-6 w-6" />
          </div>
        )}
        <div
          className={`absolute top-1.5 left-1.5 rounded-md border px-1.5 py-0.5 text-[10px] font-bold ${scoreColor}`}
        >
          {result.score}%
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-sm font-bold text-gray-900">
              {result.title}
            </h3>
            <span className="text-primary-dark shrink-0 text-sm font-bold">
              {formattedPrice}
            </span>
          </div>

          <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{result.address}</span>
          </div>

          {result.aiJustification && (
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-500 italic">
              &quot;{result.aiJustification}&quot;
            </p>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5" />
              {result.rooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              {result.bathrooms}
            </span>
            <span className="flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5" />
              {result.area}m²
            </span>
          </div>
          <a
            href={result.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="hover:text-primary-dark flex items-center gap-1 text-xs text-gray-400 transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
