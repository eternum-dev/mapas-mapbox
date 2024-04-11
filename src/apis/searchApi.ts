import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    country: "cl",
    language: 'es',
    access_token: 'pk.eyJ1IjoiZXRlcm51bS1kZXYiLCJhIjoiY2x1c2puMnp1MGo2YjJpbzk1cTA3YXlzcSJ9.Bbe2lbZG5gwcVUlPXstkvQ'
  },
});



export default searchApi;