"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SavedProperty, SavedSearch } from "@/features/profile/types";

interface ProfileTabsProps {
  properties: SavedProperty[];
  searches: SavedSearch[];
}

type Tab = "properties" | "searches";

export function ProfileTabs({ properties, searches }: ProfileTabsProps) {
  const [tab, setTab] = useState<Tab>("properties");

  return (
    <div>
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setTab("properties")}
          className={`px-4 py-3 text-sm font-medium transition-colors ${
            tab === "properties"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Propiedades guardadas
        </button>
        <button
          onClick={() => setTab("searches")}
          className={`px-4 py-3 text-sm font-medium transition-colors ${
            tab === "searches"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Búsquedas guardadas
        </button>
      </div>

      <div className="py-6">
        {tab === "properties" &&
          (properties.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 px-6 py-12 text-center">
              <p className="text-sm text-gray-400">
                No guardaste propiedades aún.
              </p>
              <Link
                href="/search"
                className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
              >
                Explorar propiedades
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((p) => (
                <Link
                  key={p.id}
                  href={`/property/${p.propertyId}`}
                  className="group overflow-hidden rounded-xl border border-gray-200 transition-shadow hover:shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        width={400}
                        height={300}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-300">
                        Sin imagen
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="truncate text-sm font-semibold">{p.title}</p>
                    <p className="truncate text-xs text-gray-500">
                      {p.address}
                    </p>
                    <p className="mt-1 text-sm font-bold text-primary">
                      {new Intl.NumberFormat("es-AR", {
                        style: "currency",
                        currency: p.currency,
                        maximumFractionDigits: 0,
                      }).format(p.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ))}

        {tab === "searches" &&
          (searches.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 px-6 py-12 text-center">
              <p className="text-sm text-gray-400">
                No guardaste búsquedas aún.
              </p>
              <Link
                href="/search"
                className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
              >
                Buscar propiedades
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {searches.map((s) => (
                <Link
                  key={s.id}
                  href={`/search?q=${encodeURIComponent(s.query)}`}
                  className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 transition-colors hover:bg-gray-50"
                >
                  <div>
                    <p className="text-sm font-medium">{s.query}</p>
                    {Object.keys(s.filters).length > 0 && (
                      <p className="text-xs text-gray-400">
                        {Object.entries(s.filters)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(" · ")}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(s.createdAt).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </Link>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
