import { useContext, useLayoutEffect, useRef } from 'react';
import { Map } from 'mapbox-gl';
import {  MapContext, PlacesContext } from '../context';
import { Loading } from './Loading';




export const MapView = () => {

    const { isLoading, userLocaion } = useContext(PlacesContext);

    const mapDiv = useRef<HTMLDivElement>(null);
    const { setMap } = useContext(MapContext)

    useLayoutEffect(() => {
        if (!isLoading) {
            const map = new Map({
                container: mapDiv.current!,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: userLocaion,
                zoom: 14,

            });
            setMap(map);
        }
    }, [isLoading]);


    if (isLoading) {
        return (<Loading />)
    }


    return (
        <div ref={mapDiv}
            style={{
                height: '100vh',
                width: '100vw',
                top: 0,
                right: 0,
                position: 'fixed',
            }}
        >
            {userLocaion?.join(',')}
        </div>
    )
}