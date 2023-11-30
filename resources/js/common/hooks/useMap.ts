import { useEffect, useState } from 'react';
import L, { Map } from "leaflet"
import latLangKalteng from "@/common/constants/latLangKalteng"

export const useMap = (mapId: string = "map") => {
    const [map, setMap] = useState<Map>()

    useEffect(() => {
        const mapRef = L.map("map").setView(latLangKalteng as L.LatLngExpression, 8);
        var popup = L.popup();

        function onMapClick(e: any) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(mapRef);
        }

        mapRef.on('click', onMapClick);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
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
