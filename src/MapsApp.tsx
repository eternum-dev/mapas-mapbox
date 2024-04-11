import { MapProvider, PlacesProvider } from "./context"
import { HomePage } from "./screen/HomePage"



export const MapsApp = () => {
    return (
        <PlacesProvider>
            <MapProvider>
                <HomePage />
            </MapProvider>
        </PlacesProvider>
    )
}