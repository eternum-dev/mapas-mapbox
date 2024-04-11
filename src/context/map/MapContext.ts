import { createContext } from "react";
import { Map } from "mapbox-gl";

interface MapsContextProp {
  isMapReady: boolean;
  map?: Map;
  setMap: (map: Map) => void;
  getRouteBetweenPoint: (start: [number, number], end: [number, number]) => Promise<void>
}

export const MapContext = createContext({} as MapsContextProp);
