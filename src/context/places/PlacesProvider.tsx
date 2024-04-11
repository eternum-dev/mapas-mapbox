import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducers";
import { getUserLocation } from "../../helpers";
import { searchApi } from "../../apis";
import { Feature, PlacesResponce } from "../../interfaces/places";



export interface PlacesState {
    isLoading: boolean;
    userLocaion?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[];
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocaion: undefined,
    isLoadingPlaces: false,
    places: [],
}

export const PlacesProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE)

    
    useEffect(() => {
        getUserLocation()
            .then(lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }));
    }, []);

    const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
        if (query.length === 0) {
            dispatch({ type: 'setPlaces', payload: [] });
            return [];
        }
        
        if (!state.userLocaion) throw new Error('no hay una ubicacion del usuario');

        dispatch({ type: 'setLoadingPlaces' });

        const resp = await searchApi.get<PlacesResponce>(`/${query}.json`, {
            params: {
                proximity: state.userLocaion.join(','),
            }
        });

        dispatch({ type: 'setPlaces', payload: resp.data.features })

        return resp.data.features;
    }

    return (
        <PlacesContext.Provider
            value={{
                ...state,

                // methods
                searchPlacesByTerm,
            }}>
            {children}
        </PlacesContext.Provider>
    )
}