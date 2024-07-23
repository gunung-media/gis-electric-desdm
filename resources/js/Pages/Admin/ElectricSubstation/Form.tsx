import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { FormEventHandler, useEffect, useState } from "react"
import L from "leaflet"
import { FormGroup, Input, InputError, OptionType } from "@/common/components"
import latLangKalteng from "@/common/constants/latLangKalteng"
import { DistrictType, CityType, SelectCity, SelectDistrict } from "@/features/Territory"
import { Head, router, useForm, usePage } from "@inertiajs/react"
import { ElectricSubstationDTO, ElectricSubstationType } from "@/features/ElectricSubstation"
import { PageProps } from "@/types"
import { useMap } from "@/common/hooks"
import { electricIcon, swalError, swalSuccess } from "@/common/utils"

export default function Form({ electricSubstation }: PageProps & { electricSubstation?: ElectricSubstationType }) {
    const { errors } = usePage<PageProps>().props
    const { map } = useMap()
    const [marker, setMarker] = useState<L.Marker>()
    const { data: dto, setData, post, put } = useForm<ElectricSubstationDTO>()
    const [selectedCityId, setSelectedCityId] = useState<string | number>()

    useEffect(() => {
        if (!electricSubstation) return;
        const { description, name, district: { code: district_code, city_code }, latitude, longitude } = electricSubstation
        setData(data => ({
            ...data,
            description,
            city_id: city_code,
            name,
            district_code,
            latitude, longitude
        }))
        setSelectedCityId(city_code)
    }, [])

    useEffect(() => {
        if (map) {
            const marker = L.marker((electricSubstation ? [electricSubstation.latitude, electricSubstation.longitude] : latLangKalteng) as L.LatLngExpression, {
                draggable: true,
                icon: electricIcon
            }).addTo(map);

            marker.on('dragend', function () {
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
        setData("district_code", null)
        setSelectedCityId(e.value.code)
    }

    const handleDistrictChange = async (e: OptionType<DistrictType>) => {
        setData("district_code", e.value.code)
        const latLang = [Number(e.value.latitude), Number(e.value.longitude)]
        map!.panTo(latLang as L.LatLngExpression)
        marker!.setLatLng(latLang as L.LatLngExpression)
        setData(data => ({ ...data, latitude: latLang[0], longitude: latLang[1] }))
    }

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        if (electricSubstation) {
            put(route('admin.gardu_listrik.update', { gardu_listrik: electricSubstation.id }), {
                onError: (e) => {
                    swalError(e.error)
                },
                onSuccess: () => {
                    swalSuccess('Sukses Mengupdate')
                }
            })
            return
        }
        post(route('admin.gardu_listrik.store'), {
            onError: (e) => {
                swalError(e.error)
            },
            onSuccess: () => {
                swalSuccess()
            }
        })
    }

    const handleLatLangChange = (name: 'latitude' | 'longitude', val: string) => {
        try {
            setData(name, val)
            if (!map || !marker) return
            let latLang
            if (name === 'latitude') {
                latLang = [Number(val), Number(dto.latitude)] as L.LatLngExpression
            } else {
                latLang = [Number(dto.longitude), Number(val)] as L.LatLngExpression
            }
            map.setView(latLang)
            marker.setLatLng(latLang)
        } catch (error) {
            return
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Gardu Listrik Form" />
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
                                <SelectCity handleCityChange={handleCityChange} selectedCity={dto.city_id} />
                                <SelectDistrict handleDistrictChange={handleDistrictChange} selectedDistrict={dto.district_code} selectedCityId={selectedCityId} />
                                <InputError message={errors.district_code} />
                                <Input title="Nama Gardu Listrik" onChange={(e) => setData("name", e.target.value)} value={dto.name} />
                                <InputError message={errors.name} />
                                <FormGroup
                                    title="Deskripsi"
                                    name="description"
                                    errorMsg={errors.energy_potential}
                                    onChange={(e) => setData('description', e as string)}
                                    value={dto.description}
                                    type="textarea"
                                />
                                <Input title="latitude" value={dto.latitude} onChange={(e) => handleLatLangChange('latitude', e.target.value)} />
                                <InputError message={errors.latitude} />
                                <Input title="longitude" value={dto.longitude} onChange={(e) => handleLatLangChange('longitude', e.target.value)} />
                                <InputError message={errors.longitude} />
                                <button type="submit" className="btn btn-primary me-2">Submit</button>
                                <button type="button" className="btn btn-light" onClick={() => router.visit(route('admin.gardu_listrik.index'))}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
