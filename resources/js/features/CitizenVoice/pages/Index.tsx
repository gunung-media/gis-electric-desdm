import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss'
import L from 'leaflet'
import CreateBtn from '@/assets/icons/add-plus-svgrepo-com.svg?react'
import { useMap } from '@/common/hooks'
import { useEffect, useState } from 'react'
import { Head, router, } from '@inertiajs/react'
import { ContactUs, InputType, Loader } from '@/common/components';
import { ProposalType, ProposalDTO } from '@/features/Proposal'
import { ReportDTO, ReportType } from '@/features/Report';
import { generateTheLayer } from '../utils/generateTheLayer';
import { CitizenVoiceTrackingBox, ModalFormAddCitizenVoice } from '../components';

type CitizenVoice = {
    datas: (ProposalType | ReportType)[],
    isProposal?: boolean,
    additionalFields: InputType<ProposalDTO>[] | InputType<ReportDTO>[],
    title: string,
    showAdd?: boolean,
    showForm?: boolean,
    showTrack?: boolean
}

export default function CitizenVoicePage({ datas, title, isProposal = false, additionalFields, showAdd = true, showForm = true, showTrack = false }: CitizenVoice) {
    const { map } = useMap()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isShowTracking, setIsShowTracking] = useState<boolean>(false)
    const [isShowAdd, setIsShowAdd] = useState<boolean>(showAdd)
    const [idClicked, setIdClocked] = useState<number>()
    const saveRoute = isProposal ? route('proposal.store') : route('report.store')

    useEffect(() => {
        const { clusters } = generateTheLayer(datas, (isShow, theId) => {
            setIsShowTracking(isShow)
            setIdClocked(theId)
        })

        if (map) {
            L.control.zoom({
                position: 'bottomleft'
            }).addTo(map)

            map.addLayer(clusters)
            setIsLoading(false)
        }

    }, [map, datas])

    return (
        <>
            <Head title={title} />
            <Loader isShow={isLoading} />
            <div id="map"></div>
            <div className="header">
                <div className="header-box" onClick={() => router.visit(route('landing'))}><span>Si</span>lisda <span>{title.toLowerCase()}</span></div>
                <div className="header-actions">
                    {showAdd && (
                        <button onClick={() => setIsShowAdd(true)}>
                            <CreateBtn />
                        </button>
                    )}
                </div>
            </div>

            {showAdd && (
                <ModalFormAddCitizenVoice
                    isShow={isShowAdd}
                    onClose={() => setIsShowAdd(false)}
                    additionalFields={additionalFields}
                    title={title}
                    route={saveRoute}
                    isProposal={isProposal}
                />
            )}

            <CitizenVoiceTrackingBox
                isShow={isShowTracking}
                onClose={() => setIsShowTracking(false)}
                theId={idClicked}
                isProposal={isProposal}
                isShowForm={showForm}
                isShowTracking={showTrack}
            />

            <ContactUs />
        </>
    )
}
