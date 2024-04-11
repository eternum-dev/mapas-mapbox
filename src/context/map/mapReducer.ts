import { MapState } from "./MapProvider";
import { Map, Marker } from "mapbox-gl";

type mapAction = 
| { type: "setMap"; payload: Map }
| { type: "setMarkers"; payload: Marker[] }

export const mapReducer = (state: MapState, action: mapAction): MapState => {
  switch (action.type) {
    case "setMap":
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      };

      case "setMarkers":
        return {
          ...state,
          markers: action.payload,
        };
    default:
      return state;
  }
};
