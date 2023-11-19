import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { useEffect, useState } from "react"
import L from "leaflet"
import { Input, OptionType, Select } from "@/common/components"
import latLangKalteng from "@/common/constants/latLangKalteng"
import { DistrictType, getCities, getDistricts, CityType } from "@/features/Territory"
import { useForm } from "@inertiajs/react"
import { ElectricSubstationDTO } from "@/features/ElectricSubstation"

export default function Form() {
    const [cities, setCities] = useState<CityType[]>([])
    const [districts, setDistricts] = useState<DistrictType[]>([])
    const [selectedDistrict, setSelectedDistrict] = useState<OptionType<DistrictType> | null>(null)
    const [map, setMap] = useState<L.Map>()
    const [marker, setMarker] = useState<L.Marker>()
    const [latitude, setLatitude] = useState<number>(latLangKalteng[0])
    const { data: dto, setData } = useForm<ElectricSubstationDTO>()

    useEffect(() => {
        (async () => {
            const { data: { data } } = await getCities()
            setCities(data)
        })()
        const mapRef = L.map("map").setView(latLangKalteng as L.LatLngExpression, 7);
        const marker = L.marker(latLangKalteng as L.LatLngExpression, {
            draggable: true
        }).addTo(mapRef);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mapRef);

        marker.on('dragend', function() {
            const position = marker.getLatLng();
            setLatitude(position.lat)
            setData('longitude', position.lng)
        });

        setMap(mapRef)
        setMarker(marker)
        return () => {
            mapRef.remove()
            marker.remove()
        }
    }, [])

    const handleCityChange = async (e: OptionType<CityType>) => {
        setData("city_id", e.value.code)
        setSelectedDistrict(null)
        setData("district_id", null)
        const { data: { data } } = await getDistricts(e.value.code)
        setDistricts(data)
    }

    const handleDistrictChange = async (e: OptionType<DistrictType>) => {
        setData("district_id", e.value.code)
        setSelectedDistrict(e)
        const { data: { data } } = await getDistricts(e.value.city_code)
        setDistricts(data)
        const latLang = [parseInt(e.value.latitude), parseInt(e.value.longitude)] as L.LatLngExpression
        map!.panTo(latLang)
        marker!.setLatLng(latLang)
        setLatitude(parseInt(e.value.latitude))
        setData('longitude', e.value.longitude)
    }

    return (
        <AuthenticatedLayout>
            <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Gardu Listik</h4>
                            <div id="map" style={{ height: "95%" }}></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Additional Data</h4>
                            <form className="forms-sample">
                                <Select title="Kabupaten/Kota" data={cities} onChange={(e) => handleCityChange(e as OptionType<CityType>)} />
                                <Select title="Kecamatan" data={districts} onChange={(e) => handleDistrictChange(e as OptionType<DistrictType>)} value={selectedDistrict} />
                                <Input title="Nama Gardu Listrik" onChange={(e) => setData("name", e.target.value)} />
                                <Input title="Deskripsi" onChange={(e) => setData("description", e.target.value)} />
                                <Input title="latitude" readOnly={true} value={latitude} />
                                <Input title="longitude" readOnly={true} value={dto.longitude ?? latLangKalteng[1]} />
                                <button type="submit" className="btn btn-primary me-2">Submit</button>
                                <button className="btn btn-light">Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
