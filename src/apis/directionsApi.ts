import axios from "axios";

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    language: 'es',
    access_token: 'pk.eyJ1IjoiZXRlcm51bS1kZXYiLCJhIjoiY2x1c2puMnp1MGo2YjJpbzk1cTA3YXlzcSJ9.Bbe2lbZG5gwcVUlPXstkvQ'
  },
});



export default directionsApi;