import { createContext } from "react";
import { Feature } from "../../interfaces/places";

export interface PlacesContextProp {
  isLoading: boolean;
  userLocaion?: [number, number];
  searchPlacesByTerm:  (query: string) => Promise<Feature[]>;
  isLoadingPLaces?: boolean; 
  places: Feature[]; 
}
export const PlacesContext = createContext<PlacesContextProp>(
  {} as PlacesContextProp
);
