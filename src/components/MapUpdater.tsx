import { useMap } from "react-leaflet";
import { useEffect } from "react";

interface MapUpdaterProps {
  position: [number, number];
}

function MapUpdater({ position }: MapUpdaterProps) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, map.getZoom(), { animate: true });
  }, [position, map]);

  return null; // this component only controls the map
}

export default MapUpdater;
