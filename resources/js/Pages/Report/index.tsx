import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss'
import L from 'leaflet'
import CreateBtn from '@/assets/icons/add-plus-svgrepo-com.svg?react'
import { useMap } from '@/common/hooks'
import { useEffect, useState } from 'react'
import { Head, router, } from '@inertiajs/react'
import { ContactUs, Loader } from '@/common/components';
import { ModalFormReport, ReportType, ReportTrackingBox, generateReportLayer } from '@/features/Report'
import { PageProps } from '@/types'

export default function Report({ datas }: PageProps & { datas: ReportType[] }) {
    const { map } = useMap()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isShowTracking, setIsShowTracking] = useState<boolean>(false)
    const [isShowAdd, setIsShowAdd] = useState<boolean>(true)
    const [reportId, setReportId] = useState<number>()

    useEffect(() => {
        const reportLayer = generateReportLayer(datas, (isShow, reportId) => {
            setIsShowTracking(isShow)
            setReportId(reportId)
        })

        if (map) {
            L.control.zoom({
                position: 'bottomleft'
            }).addTo(map)

            map.addLayer(reportLayer)
            setIsLoading(false)
        }

    }, [map, datas])


    return (
        <>
            <Head title='Laporan' />
            <Loader isShow={isLoading} />
            <div id="map"></div>
            <div className="header">
                <div className="header-box" onClick={() => router.visit(route('landing'))}><span>Si</span>lisda <span>laporan</span></div>
                <div className="header-actions">
                    <button onClick={() => setIsShowAdd(true)}>
                        <CreateBtn />
                    </button>
                </div>
            </div>

            <ModalFormReport
                isShow={isShowAdd}
                onClose={() => setIsShowAdd(false)}
            />

            <ReportTrackingBox
                isShow={isShowTracking}
                onClose={() => setIsShowTracking(false)}
                reportId={reportId}
            />

            <ContactUs />
        </>
    )
}
