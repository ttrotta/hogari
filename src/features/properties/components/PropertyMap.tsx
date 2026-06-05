"use client";

import { MapView } from "@/features/map/components/MapView";
import type { Property } from "@/features/properties/types";

interface PropertyMapProps {
  property: Property;
}

export function PropertyMap({ property }: PropertyMapProps) {
  return (
    <div className="h-72 w-full overflow-hidden rounded-2xl border border-gray-100 shadow-sm md:h-96">
      <MapView properties={[property]} hoveredId={property.id} />
    </div>
  );
}
