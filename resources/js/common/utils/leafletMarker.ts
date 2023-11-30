import { icon, marker } from 'leaflet'
import electricPng from '@/assets/images/electric.png'
export const electricIcon = icon({
    iconUrl: electricPng,
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});

export const theMarker = (latitude: number, longitude: number) => marker([latitude, longitude], { icon: electricIcon })
