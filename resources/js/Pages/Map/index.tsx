import 'bootstrap/dist/css/bootstrap.min.css';
import '@/common/styles/map.scss'
import { useMap } from '@/common/hooks'
import { Loader } from '@/common/components'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import { generateKaltengVillageLayer } from '@/features/Territory'
import { Head, router } from '@inertiajs/react'
import { PageProps } from '@/types';
import { ElectricSubstationType, generateESLayerGroup } from '@/features/ElectricSubstation';

export default function Map({ electricSubstationData }: PageProps & { electricSubstationData: ElectricSubstationType[] }) {
    const { map } = useMap()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isShowVillageInfo, setIsShowVillageInfo] = useState<boolean>(false)

    useEffect(() => {
        let villages: L.LayerGroup = L.layerGroup()
        let electricSubstation: L.LayerGroup = L.layerGroup()

        if (map) {
            electricSubstation = generateESLayerGroup(electricSubstationData)
            map.addLayer(electricSubstation);
            (async () => {
                villages = await generateKaltengVillageLayer()
                map.addLayer(villages)
                setIsLoading(false)
            })()

            L.control.zoom({
                position: 'bottomleft'
            }).addTo(map)

            L.control.layers(undefined, {
                "Gardu Listrik": electricSubstation,
                "Desa": villages
            }, { position: 'topleft' }).addTo(map);
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
                    <button>
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.250004 0.25H22.75V2.75H0.250004V0.25Z" fill="#2A62A6" />
                            <path d="M0.249992 20.25H14V22.75H0.249992V20.25Z" fill="#2A62A6" />
                            <path d="M0.250004 10.25H22.75V12.75H0.250004V10.25Z" fill="#2A62A6" />
                        </svg>
                    </button>
                    <button>
                        <svg width="25" height="29" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M24.8084 12.4016C24.8084 5.60391 19.2978 0.0932617 12.5001 0.0932617C5.73196 0.0932617 0.260135 5.50755 0.192253 12.2754C0.141017 17.3868 3.20613 21.7879 7.60378 23.6967C8.33966 24.0161 8.96913 24.5389 9.42013 25.2024L11.6224 28.4422C12.0435 29.0617 12.9565 29.0617 13.3776 28.4422L15.5798 25.2024C16.0294 24.541 16.6555 24.0176 17.3894 23.6997C21.7544 21.8081 24.8084 17.4618 24.8084 12.4016ZM18.7678 12.4017C18.7678 15.8633 15.9616 18.6694 12.5 18.6694C9.03844 18.6694 6.23227 15.8633 6.23227 12.4017C6.23227 8.94009 9.03844 6.13391 12.5 6.13391C15.9616 6.13391 18.7678 8.94009 18.7678 12.4017Z"
                                fill="#2A62A6" />
                        </svg>
                    </button>
                </div>
            </div>

            {
                isShowVillageInfo && (
                    <div className="graphics">
                        <p>Grafik Desa</p>
                        <div id="pie-chart"></div>
                        <div id="bar-chart"></div>
                    </div>
                )
            }
        </>
    )
}
