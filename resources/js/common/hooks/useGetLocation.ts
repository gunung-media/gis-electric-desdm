import { useEffect, useState } from "react"

export const useGetLocation = () => {
    const [latLang, setLatLang] = useState<{
        latitude: string | null,
        longitude: string | null
    }>({
        latitude: null,
        longitude: null
    })

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatLang(() => ({
                            latitude: position.coords.latitude.toString(),
                            longitude: position.coords.longitude.toString(),
                        }))
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        getLocation();
    }, [])

    return { latLang, setLatLang }
}
