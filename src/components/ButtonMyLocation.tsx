import { useContext } from "react"
import { MapContext, PlacesContext } from "../context"



export const ButtonMyLocation = () => {

    const { map, isMapReady } = useContext(MapContext);
    const { userLocaion } = useContext(PlacesContext);

    const onClick = () => {
        if (!isMapReady) throw new Error('El mapa aún no está listo');
        if (!userLocaion) throw new Error('No esta la ubicación del usuario');

        map?.flyTo({
            zoom: 14,
            center: userLocaion
        })
    }

    return (
        <button className="btn btn-primary"
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 100,
            }}
            onClick={onClick}
        >
            volver a mi ubicación
        </button>
    )
}