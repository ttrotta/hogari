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
      style: {
        version: 8,
        sources: {
          "raster-tiles": {
            type: "raster",
            tiles: [
              "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
              "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
              "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
              "https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        },
        layers: [
          {
            id: "simple-tiles",
            type: "raster",
            source: "raster-tiles",
            minzoom: 0,
            maxzoom: 20,
          },
        ],
      },
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

      el.className =
        "w-fit whitespace-nowrap px-2 py-1 rounded-md text-xs font-bold shadow-sm border border-gray-200 transition-all duration-150 cursor-pointer bg-white text-gray-800 hover:bg-gray-50";
      el.innerText = formattedPrice;

      el.addEventListener("click", () => {
        if (onMarkerClick) {
          onMarkerClick(property.id);
        }
      });

      const imageUrl =
        property.imageUrls && property.imageUrls.length > 0
          ? property.imageUrls[0]
          : null;
      const imgHtml = imageUrl
        ? `<div style="width: 100%; height: 90px; position: relative; overflow: hidden; border-radius: 6px; margin-bottom: 6px;">
             <img src="${imageUrl}" alt="${property.title}" style="width: 100%; height: 100%; object-fit: cover;" />
           </div>`
        : "";

      const popup = new maplibregl.Popup({
        offset: 15,
        closeButton: false,
        maxWidth: "200px",
        focusAfterOpen: false,
      }).setHTML(`
        <div style="font-family: var(--font-montserrat), sans-serif; padding: 4px; display: flex; flex-direction: column;">
          ${imgHtml}
          <h4 style="margin: 0 0 2px; font-size: 12px; font-weight: 700; color: #111827; line-height: 1.3;">${property.title}</h4>
          <p style="margin: 0 0 4px; font-size: 10px; color: #6b7280;">${property.address}</p>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 4px;">
            <span style="font-size: 11px; font-weight: 700; color: #e08a20;">
              ${property.currency === "USD" ? "u$s" : "$"} ${property.price.toLocaleString()}
            </span>
            <a href="/property/${property.id}" style="font-size: 10px; font-weight: 600; color: #FFAD4E; text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.15s;" onmouseover="this.style.borderColor='#FFAD4E'" onmouseout="this.style.borderColor='transparent'">Ver detalle →</a>
          </div>
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
  }, [properties, onMarkerClick]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (hoveredId) {
      const marker = markersRef.current[hoveredId];
      const property = properties.find((p) => p.id === hoveredId);
      if (marker && property) {
        map.easeTo({
          center: [property.longitude, property.latitude],
          zoom: Math.max(map.getZoom(), 14),
          duration: 500,
        });
      }
    }

    Object.entries(markersRef.current).forEach(([id, m]) => {
      const el = m.getElement();
      const isSelected = id === hoveredId;

      if (isSelected) {
        el.style.display = "block";
        el.className =
          "w-fit whitespace-nowrap px-2 py-1 rounded-md text-xs font-bold shadow-sm border border-amber-600 transition-all duration-150 cursor-pointer bg-amber-500 text-white scale-110 z-10";
        if (!m.getPopup().isOpen()) {
          m.togglePopup();
        }
      } else {
        if (hoveredId) {
          el.style.display = "none";
          if (m.getPopup().isOpen()) {
            m.togglePopup();
          }
        } else {
          el.style.display = "block";
          el.className =
            "w-fit whitespace-nowrap px-2 py-1 rounded-md text-xs font-bold shadow-sm border border-gray-200 transition-all duration-150 cursor-pointer bg-white text-gray-800 hover:bg-gray-50";
          if (m.getPopup().isOpen()) {
            m.togglePopup();
          }
        }
      }
    });
  }, [hoveredId, properties]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-gray-100 shadow-md">
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
}
