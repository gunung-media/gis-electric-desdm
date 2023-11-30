import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss'
import { useMap } from '@/common/hooks'
import { Loader } from '@/common/components'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import { VillageType, generateKaltengVillageLayer } from '@/features/Territory'
import { Head, router } from '@inertiajs/react'
import { PageProps } from '@/types';
import { ElectricSubstationType, generateESLayerGroup } from '@/features/ElectricSubstation';
import { VillageElectricInfoBox } from '@/features/VillageElectricity/components';

export default function Map({ electricSubstationData }: PageProps & { electricSubstationData: ElectricSubstationType[] }) {
    const { map } = useMap()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isShowVillageInfo, setIsShowVillageInfo] = useState<boolean>(false)
    const [selectedVillage, setSelectedVillage] = useState<VillageType | null>(null)

    useEffect(() => {
        let villages: L.LayerGroup = L.layerGroup()
        let electricSubstation: L.LayerGroup = L.layerGroup()

        if (map) {
            electricSubstation = generateESLayerGroup(electricSubstationData)
            map.addLayer(electricSubstation);
            (async () => {
                villages = await generateKaltengVillageLayer((village) => {
                    setIsShowVillageInfo(true)
                    setSelectedVillage(village)
                })
                map.addLayer(villages)

                L.control.layers(undefined, {
                    "Gardu Listrik": electricSubstation,
                    "Desa": villages
                }, { position: 'topleft' }).addTo(map);

                setIsLoading(false)
            })()

            L.control.zoom({
                position: 'bottomleft'
            }).addTo(map)

        }
    }, [map])
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

            <VillageElectricInfoBox
                isShow={isShowVillageInfo}
                village={selectedVillage}
                onClose={() => {
                    setIsShowVillageInfo(false)
                    setSelectedVillage(null)
                }}
            />
        </>
    )
}
