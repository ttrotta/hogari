"use client";

import { useEffect, useState } from "react";
import { Sparkles, Brain, MapPin, Search as SearchIcon } from "lucide-react";
import { useSearch } from "../context/search-context";
import Image from "next/image";

const THINKING_MESSAGES = [
  { text: "Analizando tu búsqueda...", icon: SearchIcon },
  { text: "Buscando propiedades cercanas...", icon: MapPin },
  { text: "La IA está evaluando cada opción...", icon: Brain },
  { text: "Rankeando por relevancia...", icon: Sparkles },
  { text: "Preparando recomendaciones...", icon: Sparkles },
];

export function SearchThinking() {
  const { cancelSearch } = useSearch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % THINKING_MESSAGES.length);
        setIsVisible(true);
      }, 300);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  const current = THINKING_MESSAGES[currentIndex];
  const Icon = current.icon;

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16">
      <div className="relative">
        <div className="from-primary-light to-section-orange flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br">
          <Image
            src="/minilogosimple.png"
            alt="Hogarí Mini Logo"
            width={40}
            height={40}
            className="animate-pulse object-contain"
          />
        </div>
        <div className="bg-primary absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <div
          className={`flex items-center gap-2 transition-all duration-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <Icon className="text-primary-dark h-4 w-4" />
          <span className="text-sm font-semibold text-gray-700">
            {current.text}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="bg-primary/60 h-1.5 w-1.5 animate-bounce rounded-full"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>

      <div className="mt-2 flex gap-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 w-full max-w-[180px] animate-pulse rounded-xl bg-gray-100"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={cancelSearch}
        className="mt-4 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-xs font-semibold text-gray-500 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:text-gray-700 active:scale-95 cursor-pointer"
      >
        Cancelar búsqueda
      </button>
    </div>
  );
}
