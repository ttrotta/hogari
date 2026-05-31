import type { Property } from "@/features/properties/types";

export interface MapViewProps {
  properties: Property[];
  hoveredId?: string | null;
  onMarkerClick?: (id: string) => void;
}
