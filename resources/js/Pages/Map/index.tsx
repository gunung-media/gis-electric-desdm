import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss'
import { useMap } from '@/common/hooks'
import { Loader } from '@/common/components'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import { CityInfoBox, CityType, DistrictType, VillageType, generateKaltengCityLayer, generateKaltengVillageLayer } from '@/features/Territory'
import { Head, router } from '@inertiajs/react'
import { PageProps } from '@/types';
import { ElectricSubstationType, generateESLayerGroup } from '@/features/ElectricSubstation';
import { VillageElectricInfoBox } from '@/features/VillageElectricity/components';
import { generateKaltengDistrictLayer } from '@/features/Territory/utils/getKaltengDistrictLayer';
import { DistrictInfoBox } from '@/features/Territory/components/DistrictInfoBox';

export default function Map({ electricSubstationData }: PageProps & { electricSubstationData: ElectricSubstationType[] }) {
    const { map } = useMap()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isShowCityInfo, setIsShowCityInfo] = useState<boolean>(false)
    const [selectedCity, setSelectedCity] = useState<CityType | null>(null)
    const [isShowDistrictInfo, setIsShowDistrictInfo] = useState<boolean>(false)
    const [selectedDistrict, setSelectedDistrict] = useState<DistrictType | null>(null)
    const [isShowVillageInfo, setIsShowVillageInfo] = useState<boolean>(false)
    const [selectedVillage, setSelectedVillage] = useState<VillageType | null>(null)
    const [citiesLayer, setCitiesLayer] = useState<L.LayerGroup>(L.layerGroup())
    const [districtsLayer, setDistrictsLayer] = useState<L.LayerGroup>(L.layerGroup())
    const [villagesLayer, setVillagesLayer] = useState<L.LayerGroup>(L.layerGroup())
    const [esLayer, setEsLayer] = useState<L.LayerGroup>(L.layerGroup())

    useEffect(() => {
        const electricSubstations = generateESLayerGroup(electricSubstationData);
        setEsLayer(electricSubstations)
        if (map) {
            map.addLayer(electricSubstations);
            (async () => {
                const cities = await generateKaltengCityLayer((city) => {
                    setIsShowCityInfo(true)
                    setSelectedCity(city)
                    handleCloseDistrict()
                    handleCloseVillage()
                    map.setView([Number(city.latitude), Number(city.longitude) + .6], 9, { animate: true })
                })
                setCitiesLayer(cities)
                map.addLayer(cities)

                L.control.layers(undefined, {
                    "Gardu Listrik": esLayer,
                    "Kota": cities,
                }, { position: 'topleft' }).addTo(map);
                setIsLoading(false)
            })()

            L.control.zoom({
                position: 'bottomleft'
            }).addTo(map)
        }
    }, [map])

    useEffect(() => {
        let districts = L.layerGroup()
        if (map && selectedCity) {
            (async () => {
                districts = await generateKaltengDistrictLayer(selectedCity.code, (district) => {
                    setIsShowDistrictInfo(true)
                    setSelectedDistrict(district)
                    handleCloseCity(true)
                    handleCloseVillage()
                    map.setView([Number(district.latitude), Number(district.longitude) + .6], 10, { animate: true })
                })
                setDistrictsLayer(districts)
                map.addLayer(districts)

                L.control.layers(undefined, {
                    "Gardu Listrik": esLayer,
                    "Kota": citiesLayer,
                    "Kecamatan": districts,
                }, { position: 'topleft' }).addTo(map);
            })()

        }

        return (() => {
            districts.remove()
        })
    }, [selectedCity])

    useEffect(() => {
        let villages = L.layerGroup()
        if (map && selectedDistrict) {
            (async () => {
                villages = await generateKaltengVillageLayer(selectedDistrict.code, (village) => {
                    setIsShowVillageInfo(true)
                    setSelectedVillage(village)
                    handleCloseDistrict(true)
                })
                setVillagesLayer(villages)
                map.addLayer(villages)

                L.control.layers(undefined, {
                    "Gardu Listrik": esLayer,
                    "Kota": citiesLayer,
                    "Kecamatan": districtsLayer,
                    "Desa": villages,
                }, { position: 'topleft' }).addTo(map);
            })()

        }

        return (() => {
            villages.remove()
        })
    }, [selectedDistrict])

    const handleCloseCity = (boxOnly?: boolean) => {
        setIsShowCityInfo(false)
        if (!boxOnly)
            setSelectedCity(null)
    }

    const handleCloseDistrict = (boxOnly?: boolean) => {
        setIsShowDistrictInfo(false)
        if (!boxOnly)
            setSelectedDistrict(null)
    }

    const handleCloseVillage = () => {
        setIsShowVillageInfo(false)
        setSelectedVillage(null)
    }
    return (
        <>
            <Head title='Peta' />
            <Loader isShow={isLoading} />
            <div id="map"></div>
            <div className="header">
                <div className="header-box" onClick={() => router.visit(route('landing'))}>Silisda <span>peta</span></div>
                <div className="header-actions">
                </div>
            </div>

            <CityInfoBox
                isShow={isShowCityInfo}
                city={selectedCity}
                onClose={handleCloseCity}
            />

            <DistrictInfoBox
                isShow={isShowDistrictInfo}
                district={selectedDistrict}
                onClose={handleCloseDistrict}
            />

            <VillageElectricInfoBox
                isShow={isShowVillageInfo}
                village={selectedVillage}
                onClose={handleCloseVillage}
            />
        </>
    )
}
