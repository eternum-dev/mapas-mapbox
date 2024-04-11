import { useContext, useEffect, useReducer } from "react";
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { mapReducer } from "./mapReducer";
import { MapContext } from "./MapContext";
import { PlacesContext } from "../places/PlacesContext";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
}

interface Props {
    children: JSX.Element | JSX.Element[]
}
const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
}

export const MapProvider = ({ children }: Props) => {

    const { places } = useContext(PlacesContext);
    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

    useEffect(() => {
        state.markers.forEach((marker) => marker.remove());

        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [lng, lat] = place.center;
            const popup = new Popup()
                .setHTML(`
                    <h6>${place.text_es}</h6>
                    <p>${place.place_name_es}</p>
                `)

            const newMarker = new Marker()
                .setPopup(popup)
                .setLngLat([lng, lat])
                .addTo(state.map!)

            newMarkers.push(newMarker);

            dispatch({ type: 'setMarkers', payload: newMarkers })
        }
    }, [places])


    const setMap = (map: Map) => {

        const myLocationPopup = new Popup()
            .setHTML(`
            <h4> HOLA MUNDO! </h4>
            <p> Me ecuentro justo aquí </p>`)

        new Marker()
            .setLngLat(map.getCenter())
            .setPopup(myLocationPopup)
            .addTo(map);

        dispatch({ type: 'setMap', payload: map });
    }

    const getRouteBetweenPoint = async (start: [number, number], end: [number, number]) => {
        const resp = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);

        console.log(resp);
        const { geometry } = resp.data.routes[0];
        const { coordinates } = geometry;
        const bounds = new LngLatBounds(start, start);

        for (const coord of coordinates) {
            const newCoord: [number, number] = [coord[0], coord[1]];
            bounds.extend(newCoord)
        }
        state.map?.fitBounds(bounds, { padding: 300 });


        // polilines 
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coordinates
                        }
                    }
                ]
            }
        }
        if(state.map?.getLayer('RouteString')){
            state.map?.removeLayer('RouteString');
            state.map?.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData);

        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                "line-cap": "round",
                "line-join": "round",
            },
            paint: {
                "line-color": 'rgba(0,0,0, 0.6)',
                "line-width": 3
            }
        })
    }

    return (
        <MapContext.Provider value={{
            ...state,

            // methods
            setMap,
            getRouteBetweenPoint
        }}>
            {children}
        </MapContext.Provider>
    )
}