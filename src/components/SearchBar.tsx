import { ChangeEvent, useContext, useRef } from "react"
import { PlacesContext } from "../context";
import { SearchResult } from './SearchResult';



export const SearchBar = () => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const debounceRef = useRef<any>();

    const { searchPlacesByTerm } = useContext(PlacesContext);

    const onQueryeChanged = (event: ChangeEvent<HTMLInputElement>) => {

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            searchPlacesByTerm(event.target.value);
        }, 1000);
    }

    return (
        <div className="search-cotainer">
            <input
                type="text"
                className="form-control"
                placeholder="buscar lugar"
                onChange={onQueryeChanged}
            />
            <SearchResult />
        </div>
    )
}