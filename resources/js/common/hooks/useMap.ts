import { useEffect, useState } from 'react';
import L, { Map } from "leaflet"
import latLangKalteng from "@/common/constants/latLangKalteng"

export const useMap = (mapId: string = "map") => {
    const [map, setMap] = useState<Map>()

    useEffect(() => {
        const mapRef = L.map("map", { zoomControl: false }).setView(latLangKalteng as L.LatLngExpression, 8);
        mapRef.on('click', (e) => console.log(e.latlng.toString()));
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mapRef);

        setMap(mapRef)
        return () => {
            mapRef.remove()
        }
    }, [mapId])

    return {
        map, setMap
    }
}
