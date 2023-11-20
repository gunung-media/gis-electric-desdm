import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { FormEventHandler, useEffect, useState } from "react"
import L from "leaflet"
import { Input, InputError, OptionType, Select } from "@/common/components"
import latLangKalteng from "@/common/constants/latLangKalteng"
import { DistrictType, getCities, getDistricts, CityType } from "@/features/Territory"
import { useForm, usePage } from "@inertiajs/react"
import { ElectricSubstationDTO } from "@/features/ElectricSubstation"
import Swal from "sweetalert2"
import { PageProps } from "@/types"
import { useMap } from "@/common/hooks"

export default function Form() {
    const { errors } = usePage<PageProps>().props
    const [cities, setCities] = useState<CityType[]>([])
    const [districts, setDistricts] = useState<DistrictType[]>([])
    const [selectedDistrict, setSelectedDistrict] = useState<OptionType<DistrictType> | null>(null)
    const { map } = useMap()
    const [marker, setMarker] = useState<L.Marker>()
    const { data: dto, setData, post } = useForm<ElectricSubstationDTO>()

    useEffect(() => {
        (async () => {
            const { data: { data } } = await getCities()
            setCities(data)
        })()
    }, [])

    useEffect(() => {
        if (map) {
            const marker = L.marker(latLangKalteng as L.LatLngExpression, {
                draggable: true
            }).addTo(map);

            marker.on('dragend', function() {
                const position = marker.getLatLng();
                setData(data => ({ ...data, latitude: position.lat, longitude: position.lng }))
            });

            setMarker(marker)
            return () => {
                marker.remove()
            }
        }
    }, [map])

    const handleCityChange = async (e: OptionType<CityType>) => {
        setData("city_id", e.value.code)
        setSelectedDistrict(null)
        setData("district_code", null)
        const { data: { data } } = await getDistricts(e.value.code)
        setDistricts(data)
    }

    const handleDistrictChange = async (e: OptionType<DistrictType>) => {
        setData("district_code", e.value.code)
        setSelectedDistrict(e)
        const { data: { data } } = await getDistricts(e.value.city_code)
        setDistricts(data)
        const latLang = [parseInt(e.value.latitude), parseInt(e.value.longitude)]
        map!.panTo(latLang as L.LatLngExpression)
        marker!.setLatLng(latLang as L.LatLngExpression)
        setData(data => ({ ...data, latitude: latLang[0], longitude: latLang[1] }))
    }

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        post(route('admin.gardu_listrik.store'), {
            onError: (e) => {
                if (e.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: e.error,
                    });
                }
            },
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Sukses",
                    text: "Sukses Menambah",
                });
            }
        })
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
                            <InputError message={errors.error} />
                            <form className="forms-sample" onSubmit={handleSubmit}>
                                <Select title="Kabupaten/Kota" data={cities} onChange={(e) => handleCityChange(e as OptionType<CityType>)} />
                                <Select title="Kecamatan" data={districts} onChange={(e) => handleDistrictChange(e as OptionType<DistrictType>)} value={selectedDistrict} />
                                <InputError message={errors.district_code} />
                                <Input title="Nama Gardu Listrik" onChange={(e) => setData("name", e.target.value)} />
                                <InputError message={errors.name} />
                                <Input title="Deskripsi" onChange={(e) => setData("description", e.target.value)} />
                                <Input title="latitude" readOnly={true} value={dto.latitude} />
                                <InputError message={errors.latitude} />
                                <Input title="longitude" readOnly={true} value={dto.longitude} />
                                <InputError message={errors.longitude} />
                                <button type="submit" className="btn btn-primary me-2">Submit</button>
                                <button className="btn btn-light">Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
