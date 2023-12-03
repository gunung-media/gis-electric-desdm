import { InputError, FormGroup, OptionType, Loader } from "@/common/components";
import { useMap } from "@/common/hooks";
import { swalError, swalSuccess, swalToast } from "@/common/utils";
import { CityType, DistrictType, SelectCity, SelectDistrict, SelectVillage, VillageType, generateKaltengCityLayer, generateKaltengDistrictLayer, generateKaltengVillageLayer } from '@/features/Territory'
import { VillageElectricityDTO, VillageElectricityType } from "@/features/VillageElectricity";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import L from "leaflet";
import "leaflet-draw";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";


type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export default function Form({ villageElectricity }: PageProps & { villageElectricity?: VillageElectricityType }) {
    const { map } = useMap()
    const { errors } = usePage<PageProps>().props
    const { data: dto, setData, post, put } = useForm<VillageElectricityDTO>()
    const [cityCode, setCityCode] = useState<string | number>()
    const [districtCode, setDistrictCode] = useState<string | number>()
    const [villageCode, setVillageCode] = useState<string | number>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [citiesLayer, setCitiesLayer] = useState<L.LayerGroup>(L.layerGroup())
    const [districtsLayer, setDistrictsLayer] = useState<L.LayerGroup>(L.layerGroup())
    const [villagesLayer, setVillagesLayer] = useState<L.LayerGroup>(L.layerGroup())
    const drawnItems = new L.FeatureGroup();
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

    useEffect(() => {
        if (!villageElectricity || !(villageElectricity!.village)) return;
        const {
            village: {
                code: village_code,
                district: {
                    code: districtCode,
                    city_code,
                }
            },
            kk,
            households_without_electricity,
            households_with_electricity,
            households_with_electricity_non_pln,
            network_length,
            village_potential,
            energy_potential
        } = villageElectricity
        setVillageCode(village_code)
        setDistrictCode(districtCode)
        setCityCode(city_code)
        setData(() => ({
            village_code,
            kk,
            households_with_electricity,
            households_with_electricity_non_pln,
            households_without_electricity,
            network_length,
            village_potential,
            energy_potential
        }))
    }, [])

    useEffect(() => {
        if (map) {
            (async () => {
                const cities = await generateKaltengCityLayer((city) => {
                    setCityCode(city.code)
                    map.setView([Number(city.latitude), Number(city.longitude)], 9, { animate: true })
                })
                setCitiesLayer(cities)
                map.addLayer(cities)
                setIsLoading(false)
            })()

            map.addLayer(drawnItems);
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

            if (villageElectricity && villageElectricity.village) {
                const {
                    village: {
                        latitude,
                        longitude,
                        borders
                    },
                } = villageElectricity
                try {
                    if (!borders) throw 'error'
                    const bordersArray = JSON.parse(borders)
                    mapZoom(bordersArray[0][1], bordersArray[0][0], 3)
                } catch (error) {
                    mapZoom(latitude, longitude, 3)
                }
            }
        }
    }, [map])

    useEffect(() => {
        let districts = L.layerGroup()
        if (map && cityCode) {
            (async () => {
                districts = await generateKaltengDistrictLayer(cityCode, (district) => {
                    setDistrictCode(district.code)
                    map.setView([Number(district.latitude), Number(district.longitude)], 10, { animate: true })
                })
                setDistrictsLayer(districts)
                map.addLayer(districts)

            })()

        }

        return (() => {
            districts.remove()
        })
    }, [cityCode])

    useEffect(() => {
        let villages = L.layerGroup()
        if (map && districtCode) {
            (async () => {
                villages = await generateKaltengVillageLayer(districtCode, (village) => {
                    setVillageCode(village.code)
                    setData('village_code', village.code)
                })
                setVillagesLayer(villages)
                map.addLayer(villages)
            })()
        }

        return (() => {
            villages.remove()
        })
    }, [districtCode])

    const handleCityChange = (e: OptionType<CityType>) => {
        setCityCode(e.value.code)
    }

    const handleDistrictChange = (e: OptionType<DistrictType>) => {
        setDistrictCode(e.value.code)
        mapZoom(e.value.latitude, e.value.longitude, 2)
    }

    const handleVillageChange = (e: OptionType<VillageType>) => {
        setVillageCode(e.value.code)
        setData('village_code', e.value.code.toString())
        console.log(e.value.borders)
        if (!e.value.borders) {
            swalToast.fire({
                icon: 'info',
                title: 'Desa tidak memiliki arsiran, silahkan tambah arsir',
            })
            mapZoom(e.value.latitude, e.value.longitude, 3)
            return
        }
        const bordersArray = JSON.parse(e.value.borders)
        mapZoom(bordersArray[0][1], bordersArray[0][0], 3)
    }

    const mapZoom = (latitude: string | number | null, longitude: string | number | null, mapZoomLevel: number) => {
        try {
            const latLang = [Number(latitude), Number(longitude)]
            console.log(map?.getZoom())
            map?.setView(latLang as L.LatLngExpression, 7 + mapZoomLevel, { animate: true })
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

    const handleFormGroupChange = (name: keyof VillageElectricityDTO, e: ChangeEvent<HTMLInputElement> | string | ChangeEvent<FormControlElement>, isNumber: boolean = false) => {
        if (typeof e === 'string') {
            setData(name, e)
        } else {
            setData(name, isNumber ? Number(e.target.value) : e.target.value)
        }
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
                                        title="Jumlah KK"
                                        name="kk"
                                        errorMsg={errors.kk}
                                        type="number"
                                        onChange={(e) => handleFormGroupChange("kk", e, true)}
                                        value={dto.kk}
                                    />
                                    <FormGroup
                                        title="Jumlah KK Berlistrik (PLN)"
                                        name="households_with_electricity"
                                        errorMsg={errors.households_with_electricity}
                                        type="number"
                                        onChange={(e) => handleFormGroupChange('households_with_electricity', e, true)}
                                        value={dto.households_with_electricity}
                                    />
                                    <FormGroup
                                        title="Jumlah KK Berlistrik (Non PLN)"
                                        name="households_with_electricity_non_pln"
                                        errorMsg={errors.households_with_electricity_non_pln}
                                        type="number"
                                        onChange={(e) => handleFormGroupChange('households_with_electricity_non_pln', e, true)}
                                        value={dto.households_with_electricity_non_pln}
                                    />
                                    <FormGroup
                                        title="Jumlah KK Tidak Berlistrik"
                                        name="households_without_electricity"
                                        errorMsg={errors.households_without_electricity}
                                        type="number"
                                        onChange={(e) => handleFormGroupChange('households_without_electricity', e, true)}
                                        value={dto.households_without_electricity}
                                    />
                                    <FormGroup
                                        title="Panjang Jaringan"
                                        name="network_length"
                                        errorMsg={errors.network_length}
                                        type="number"
                                        onChange={(e) => handleFormGroupChange('network_length', e, true)}
                                        value={dto.network_length}
                                    />
                                    <FormGroup
                                        title="Potensi Desa"
                                        name="village_potential"
                                        errorMsg={errors.village_potential}
                                        onChange={(e) => handleFormGroupChange('village_potential', e)}
                                        value={dto.village_potential}
                                        type="textarea"
                                    />
                                    <FormGroup
                                        title="Potensi Energi"
                                        name="energy_potential"
                                        errorMsg={errors.energy_potential}
                                        onChange={(e) => handleFormGroupChange('energy_potential', e)}
                                        value={dto.energy_potential}
                                        type="textarea"
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
