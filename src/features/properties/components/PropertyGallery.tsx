/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

interface PropertyGalleryProps {
  imageUrls: string[];
  title: string;
}

export function PropertyGallery({ imageUrls, title }: PropertyGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!imageUrls || imageUrls.length === 0) {
    return (
      <div className="from-primary-light to-section-orange flex h-96 w-full items-center justify-center rounded-2xl border border-gray-100 bg-linear-to-br shadow-xs">
        <MapPin className="text-primary-dark/30 h-12 w-12" />
      </div>
    );
  }

  const activeImageUrl = imageUrls[activeImageIndex];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-100 shadow-sm md:aspect-21/9">
        <img
          src={activeImageUrl}
          alt={`${title} - Principal`}
          className="h-full w-full object-cover"
        />
      </div>

      {imageUrls.length > 1 && (
        <div className="flex scrollbar-thin gap-2 overflow-x-auto pb-1">
          {imageUrls.map((url, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border transition-all ${
                index === activeImageIndex
                  ? "border-primary-dark ring-primary-light ring-2"
                  : "border-gray-200 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={url}
                alt={`${title} - Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
