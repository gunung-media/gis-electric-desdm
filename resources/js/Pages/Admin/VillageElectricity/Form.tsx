import { InputError, FormGroup, OptionType, Loader } from "@/common/components";
import { useMap } from "@/common/hooks";
import { swalError, swalSuccess } from "@/common/utils";
import { CityType, DistrictType, SelectCity, SelectDistrict, VillageType, getKaltengBorderLayer } from "@/features/Territory";
import { SelectVillage } from "@/features/Territory/components/SelectVillage";
import { VillageElectricityDTO, VillageElectricityType } from "@/features/VillageElectricity";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import L from "leaflet";
import "leaflet-draw";
import { FormEventHandler, useEffect, useState } from "react";

export default function Form({ villageElectricity }: PageProps & { villageElectricity?: VillageElectricityType }) {
    const { map } = useMap()
    const { errors } = usePage<PageProps>().props
    const { data: dto, setData, post, put } = useForm<VillageElectricityDTO>()
    const [cityCode, setCityCode] = useState<string | number>()
    const [districtCode, setDistrictCode] = useState<string | number>()
    const [villageCode, setVillageCode] = useState<string | number>()
    const [borders, setBorders] = useState<number[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!villageElectricity) return;
        const {
            village: {
                code: village_code,
                borders,
                district: {
                    code: districtCode,
                    city_code,
                }
            },
            households_without_electricity,
            households_with_electricity,
            network_length,
            village_potential
        } = villageElectricity
        setBorders(JSON.parse(borders ?? "[]"))
        setVillageCode(village_code)
        setDistrictCode(districtCode)
        setCityCode(city_code)
        setData(data => ({
            ...data,
            village_code,
            households_with_electricity,
            households_without_electricity,
            network_length,
            village_potential,
        }))
    }, [])

    useEffect(() => {
        let villages = L.layerGroup()
        if (map) {
            (async () => {
                villages = await getKaltengBorderLayer()
                map.addLayer(villages)
                setIsLoading(false)
            })()

            const drawnItems = new L.FeatureGroup();
            map.addLayer(drawnItems);
            const drawControl = new L.Control.Draw({
                draw: {
                    marker: false,
                    circle: false,
                    circlemarker: false,
                    rectangle: false,
                    polyline: false,
                },
                edit: {
                    featureGroup: drawnItems
                }
            });
            map.addControl(drawControl);

            map.on('draw:created', function(event) {
                const { layer } = event;
                drawnItems.addLayer(layer);
                setData('borders', JSON.stringify(layer.toGeoJSON().geometry.coordinates))
            });

            map.on('draw:edited', function(e) {
                const { layer } = e;
                setData('borders', JSON.stringify(layer.toGeoJSON().geometry.coordinates))
            });

            if (villageElectricity) {
                const {
                    village: {
                        latitude,
                        longitude,
                        district: {
                            latitude: districtLatitude,
                            longitude: districtLongitude
                        }
                    },
                } = villageElectricity
                try {
                    mapZoom(latitude, longitude, 3)
                } catch (error) {
                    mapZoom(districtLatitude, districtLongitude, 2)
                }
            }
        }
    }, [map])

    const handleCityChange = (e: OptionType<CityType>) => {
        setCityCode(e.value.code)
    }

    const handleDistrictChange = (e: OptionType<DistrictType>) => {
        setDistrictCode(e.value.code)
        const latLang = [Number(e.value.latitude), Number(e.value.longitude)]
        mapZoom(e.value.latitude, e.value.longitude, 2)
    }

    const handleVillageChange = (e: OptionType<VillageType>) => {
        setVillageCode(e.value.code)
        setData('village_code', e.value.code.toString())
        mapZoom(e.value.latitude, e.value.longitude, 3)
    }

    const mapZoom = (latitude: string | null, longitude: string | null, mapZoomLevel: number) => {
        try {
            const latLang = [Number(latitude), Number(longitude)]
            map?.zoomIn(mapZoomLevel, { animate: true })
            map?.panTo(latLang as L.LatLngExpression)
        } catch (error) {
            return;
        }
    }

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        if (villageElectricity) {
            put(route('admin.village_electricity.update', { village_electricity: villageElectricity.id }), {
                onError: (e) => {
                    swalError(e.error)
                },
                onSuccess: () => {
                    swalSuccess('Sukses Mengupdate')
                }
            })
            return
        }
        post(route('admin.village_electricity.store'), {
            onError: (e) => {
                swalError(e.error)
            },
            onSuccess: () => {
                swalSuccess('Sukses Menambah')
            }
        })
    }

    return (
        <>
            <Loader isShow={isLoading} />
            <AuthenticatedLayout>
                <Head title="Kelistrikan Desa Form" />
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Desa</h4>
                                <div id="map" style={{ height: "95%" }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Kelistrikan Desa Form</h4>
                                <InputError message={errors.error} />
                                <form className="forms-sample" onSubmit={handleSubmit}>
                                    <SelectCity
                                        handleCityChange={handleCityChange}
                                        selectedCity={cityCode}
                                    />
                                    <SelectDistrict
                                        handleDistrictChange={handleDistrictChange}
                                        selectedCityId={cityCode}
                                        selectedDistrict={districtCode}
                                    />
                                    <SelectVillage
                                        handleVillageChange={handleVillageChange}
                                        selectedDistrictId={districtCode}
                                        selectedVillage={villageCode}
                                    />
                                    <InputError message={errors.village_code} />
                                    <FormGroup
                                        title="Jumlah KK Berlistrik"
                                        name="households_with_electricity"
                                        errorMsg={errors.households_with_electricity}
                                        type="number"
                                        onChange={(e) => setData('households_with_electricity', Number(e.target.value))}
                                        value={dto.households_with_electricity}
                                    />
                                    <FormGroup
                                        title="Jumlah KK Tidak Berlistrik"
                                        name="households_without_electricity"
                                        errorMsg={errors.households_without_electricity}
                                        type="number"
                                        onChange={(e) => setData('households_without_electricity', Number(e.target.value))}
                                        value={dto.households_without_electricity}
                                    />
                                    <FormGroup
                                        title="Panjang Jaringan"
                                        name="network_length"
                                        errorMsg={errors.network_length}
                                        type="number"
                                        onChange={(e) => setData('network_length', Number(e.target.value))}
                                        value={dto.network_length}
                                    />
                                    <FormGroup
                                        title="Potensi Desa"
                                        name="village_potential"
                                        errorMsg={errors.village_potential}
                                        onChange={(e) => setData('village_potential', e.target.value)}
                                        value={dto.village_potential}
                                    />
                                    <button type="submit" className="btn btn-primary me-2">Submit</button>
                                    <button type="button" className="btn btn-light" onClick={() => router.visit(route('admin.village_electricity.index'))}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout >

        </>
    )
}
