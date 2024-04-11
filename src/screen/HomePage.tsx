import { MapView, SearchBar } from '../components';
import { ButtonMyLocation } from '../components/ButtonMyLocation';
import { ReactLogo } from '../components/ReactLogo';



export const HomePage = () => {
    return (
        <div>
            <MapView />
            <ButtonMyLocation />
            <ReactLogo />
            <SearchBar />
        </div>
    )
}