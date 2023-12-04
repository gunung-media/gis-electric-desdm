import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss'
import SearchBtn from '@/assets/icons/search-svgrepo-com.svg?react'
import { useMap } from '@/common/hooks'
import { Legend, Loader, OptionType } from '@/common/components'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import { CityInfoBox, CityType, DistrictType, TerritoryType, VillageType, generateKaltengCityLayer, generateKaltengVillageLayer, searchTerritory } from '@/features/Territory'
import { Head, router } from '@inertiajs/react'
import { PageProps } from '@/types';
import { ElectricSubstationType, generateESLayerGroup } from '@/features/ElectricSubstation';
import { VillageElectricInfoBox } from '@/features/VillageElectricity/components';
import { generateKaltengDistrictLayer } from '@/features/Territory/utils/getKaltengDistrictLayer';
import { DistrictInfoBox } from '@/features/Territory/components/DistrictInfoBox';
import AsyncSelect from 'react-select/async';
import { ActionMeta, SingleValue } from 'react-select';

export default function Map({ electricSubstationData }: PageProps & { electricSubstationData: ElectricSubstationType[] }) {
    const { map } = useMap()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isShowCityInfo, setIsShowCityInfo] = useState<boolean>(false)
    const [isSearchClick, setIsSearchClick] = useState<boolean>(false)
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
        if (map) {
            const electricSubstations = generateESLayerGroup(electricSubstationData);
            setEsLayer(electricSubstations)
            map.addLayer(electricSubstations);
            (async () => {
                const cities = await generateKaltengCityLayer((city) => {
                    handleCityChange(city)
                })
                setCitiesLayer(cities)
                map.addLayer(cities)

                L.control.layers(undefined, {
                    "Gardu Listrik": electricSubstations,
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
                    handleDistrictChange(district)
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
                    handleVillageChange(village)
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

    const handleCityChange = (city: CityType) => {
        setIsShowCityInfo(true)
        setSelectedCity(city)
        handleCloseDistrict()
        handleCloseVillage()
        if (map)
            map.setView([Number(city.latitude), Number(city.longitude) + .6], 9, { animate: true })
    }

    const handleCloseCity = (boxOnly?: boolean) => {
        setIsShowCityInfo(false)
        if (!boxOnly)
            setSelectedCity(null)
    }

    const handleDistrictChange = (district: DistrictType) => {
        setIsShowDistrictInfo(true)
        setSelectedDistrict(district)
        handleCloseCity(true)
        handleCloseVillage()
        if (map)
            map.setView([Number(district.latitude), Number(district.longitude) + .6], 10, { animate: true })
    }

    const handleCloseDistrict = (boxOnly?: boolean) => {
        setIsShowDistrictInfo(false)
        if (!boxOnly)
            setSelectedDistrict(null)
    }

    const handleVillageChange = (village: VillageType) => {
        setIsShowVillageInfo(true)
        setSelectedVillage(village)
        handleCloseDistrict(true)
    }

    const handleCloseVillage = () => {
        setIsShowVillageInfo(false)
        setSelectedVillage(null)
    }

    const handleSearchBox = async (inputValue: string): Promise<OptionType<TerritoryType>[]> => {
        try {
            const response = await searchTerritory(inputValue);
            const territories = response.data.data;

            return territories.map((territory) => ({
                value: territory,
                label: territory.name,
            }));
        } catch (error) {
            console.error('Error loading options:', error);
            return [];
        }
    };

    const handleSearchClick = (newValue: SingleValue<OptionType<TerritoryType>>) => {
        if (newValue) {
            if (newValue.value.province_code)
                handleCityChange(newValue.value as CityType)
            if (newValue.value.city_code)
                handleDistrictChange(newValue.value as DistrictType)
            if (newValue.value.district_code)
                handleVillageChange(newValue.value as VillageType)
        }
    };
    return (
        <>
            <Head title='Peta' />
            <Loader isShow={isLoading} />
            <div id="map"></div>
            <div className="header">
                <div className="header-box" onClick={() => router.visit(route('landing'))}>Silisda <span>peta</span></div>
                <div className="header-actions">
                    <div className="action-group">
                        <button onClick={() => setIsSearchClick(!isSearchClick)}>
                            <SearchBtn />
                        </button>
                        {isSearchClick && (
                            <AsyncSelect
                                className='search-box'
                                cacheOptions
                                loadOptions={handleSearchBox}
                                defaultOptions
                                placeholder="Search for territories..."
                                onChange={handleSearchClick}
                            />
                        )}
                    </div>
                </div>
            </div>

            <Legend />

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
