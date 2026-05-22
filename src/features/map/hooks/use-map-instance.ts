import { useRef, useCallback } from "react";

export function useMapInstance() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  const setMapRef = useCallback((map: unknown) => {
    mapRef.current = map;
  }, []);

  return { mapRef, setMapRef };
}
