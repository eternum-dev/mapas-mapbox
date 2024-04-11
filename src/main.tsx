import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { MapsApp } from './MapsApp.tsx'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZXRlcm51bS1kZXYiLCJhIjoiY2x1c2puMnp1MGo2YjJpbzk1cTA3YXlzcSJ9.Bbe2lbZG5gwcVUlPXstkvQ';

console.log(mapboxgl);


if(!navigator.geolocation) {
  alert('tu navegador no tiene soporte a la geolocalizacion');
  throw new Error('tu navegador no tiene soporte a la geolocalizacion');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapsApp/>
  </React.StrictMode>,
)
