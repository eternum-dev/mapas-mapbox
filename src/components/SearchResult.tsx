import { useContext, useState } from "react"
import { MapContext, PlacesContext } from "../context"
import { Feature } from "../interfaces/places";



export const SearchResult = () => {

    const { places, isLoadingPLaces, userLocaion } = useContext(PlacesContext);
    const { map, getRouteBetweenPoint } = useContext(MapContext);

    const [activeId, setActiveId] = useState('');

    const onPlaceClicked = (place: Feature) => {
        const [lng, lat] = place.center;

        setActiveId(place.id);

        map?.flyTo({
            zoom: 14,
            center: [lng, lat]
        })
    }

    const getRoute = (place: Feature) => {
        const [lng, lat] = place.center;
        if(!userLocaion) return;

        getRouteBetweenPoint(userLocaion, [lng, lat]);


    }


    if (isLoadingPLaces) {
        return (<h4> cargando espere porfavor </h4>);
    }

    return (
        <ul className="list-group mt-3">
            {
                places.map((place) => (
                    <li
                        className={`list-group-item list-group-item-action ${activeId === place.id && 'active'}`}
                        key={place.id}
                        onClick={() => onPlaceClicked(place)}
                    >
                        <h6>{place.text_es}</h6>
                        <p className=""
                            style={{ fontSize: '1rem' }}
                        >
                            {place.place_name}
                        </p>
                        <button
                            className={`btn btn-sm ${activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary'}`}
                                onClick={() => getRoute(place)}
                            >
                            Direcciones
                        </button>
                    </li>
                ))
            }

        </ul>
    )
}