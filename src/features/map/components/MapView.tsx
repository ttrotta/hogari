"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { MapViewProps } from "../types";

export function MapView({
  properties,
  hoveredId,
  onMarkerClick,
}: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<{ [id: string]: maplibregl.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const defaultCenter: [number, number] = [-62.2663, -38.7183];

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: defaultCenter,
      zoom: 13,
      attributionControl: false,
    });

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right",
    );

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    if (properties.length === 0) return;

    const bounds = new maplibregl.LngLatBounds();

    properties.forEach((property) => {
      const el = document.createElement("div");

      const formattedPrice =
        property.price >= 1000
          ? `${property.currency === "USD" ? "u$s" : "$"}${Math.round(property.price / 1000)}k`
          : `${property.currency === "USD" ? "u$s" : "$"}${property.price}`;

      el.className = `px-2 py-1 rounded-md text-xs font-bold shadow-sm border border-gray-200 transition-all duration-150 cursor-pointer ${
        hoveredId === property.id
          ? "bg-amber-500 text-white border-amber-600 scale-110 z-10"
          : "bg-white text-gray-800 hover:bg-gray-50"
      }`;
      el.innerText = formattedPrice;

      el.addEventListener("click", () => {
        if (onMarkerClick) {
          onMarkerClick(property.id);
        }
      });

      const popup = new maplibregl.Popup({ offset: 15, closeButton: false })
        .setHTML(`
        <div style="font-family: var(--font-montserrat), sans-serif; padding: 4px;">
          <h4 style="margin: 0 0 4px; font-size: 13px; font-weight: 700; color: #111827;">${property.title}</h4>
          <p style="margin: 0 0 4px; font-size: 11px; color: #6b7280;">${property.address}</p>
          <p style="margin: 0; font-size: 12px; font-weight: 700; color: #e08a20;">
            ${property.currency === "USD" ? "u$s" : "$"} ${property.price.toLocaleString()}
          </p>
        </div>
      `);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([property.longitude, property.latitude])
        .setPopup(popup)
        .addTo(map);

      markersRef.current[property.id] = marker;
      bounds.extend([property.longitude, property.latitude]);
    });

    if (properties.length > 0) {
      map.fitBounds(bounds, {
        padding: 60,
        maxZoom: 15,
        duration: 800,
      });
    }
  }, [properties, hoveredId, onMarkerClick]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !hoveredId) return;

    const marker = markersRef.current[hoveredId];
    if (!marker) return;

    const property = properties.find((p) => p.id === hoveredId);
    if (!property) return;

    map.easeTo({
      center: [property.longitude, property.latitude],
      zoom: Math.max(map.getZoom(), 14),
      duration: 500,
    });

    Object.entries(markersRef.current).forEach(([id, m]) => {
      const el = m.getElement();
      const p = properties.find((prop) => prop.id === id);
      if (!p) return;

      const formattedPrice =
        p.price >= 1000
          ? `${p.currency === "USD" ? "u$s" : "$"}${Math.round(p.price / 1000)}k`
          : `${p.currency === "USD" ? "u$s" : "$"}${p.price}`;

      if (id === hoveredId) {
        el.className =
          "px-2 py-1 rounded-md text-xs font-bold shadow-sm border border-amber-600 transition-all duration-150 cursor-pointer bg-amber-500 text-white scale-110 z-10";
        m.togglePopup();
      } else {
        el.className =
          "px-2 py-1 rounded-md text-xs font-bold shadow-sm border border-gray-200 transition-all duration-150 cursor-pointer bg-white text-gray-800 hover:bg-gray-50";
        if (m.getPopup().isOpen()) {
          m.togglePopup();
        }
      }
      el.innerText = formattedPrice;
    });
  }, [hoveredId, properties]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-gray-100 shadow-md">
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
}
