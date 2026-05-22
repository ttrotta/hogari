"use client";

export function MapView() {
  // TODO: Initialize Mapbox GL JS instance
  // useEffect(() => {
  //   const map = new mapboxgl.Map({
  //     container: mapContainerRef.current,
  //     style: "mapbox://styles/mapbox/streets-v12",
  //     center: [-58.3816, -34.6037], // Buenos Aires
  //     zoom: 12,
  //   });
  //   return () => map.remove();
  // }, []);

  return (
    <div className="h-full w-full rounded-xl bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-gray-400">MapView — Mapbox GL JS</p>
      </div>
    </div>
  );
}
