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
import { BpblProposalDTO, BpblProposalType } from '@/features/BpblProposal';
import { BusinessReportDTO, BusinessReportType } from '@/features/BusinessReport';
import { PeriodicReportDTO, PeriodicReportType } from '@/features/PeriodicReport';

type CitizenVoice = {
    datas: (ProposalType | ReportType | BpblProposalType | BusinessReportType | PeriodicReportType)[],
    isProposal?: boolean,
    additionalFields: InputType<ProposalDTO>[] | InputType<ReportDTO>[] | InputType<BpblProposalDTO>[] | InputType<BusinessReportDTO>[] | InputType<PeriodicReportDTO>[],
    title: string,
    showAdd?: boolean,
    showForm?: boolean,
    showTrack?: boolean,
    overrideRoute?: string,
    isWithJenisLaporan?: boolean,
    isWithPriority?: boolean,
    overrideIdentityProposal?: InputType<ProposalDTO | ReportDTO>[] | InputType<BpblProposalDTO>[] | InputType<BusinessReportDTO>[] | InputType<PeriodicReportDTO>[]
}

export default function CitizenVoicePage(
    {
        datas, title, isProposal = false, additionalFields, showAdd = true, showForm = true, showTrack = false, overrideRoute, isWithJenisLaporan = true, isWithPriority = true, overrideIdentityProposal
    }: CitizenVoice) {
    const { map } = useMap()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isShowTracking, setIsShowTracking] = useState<boolean>(false)
    const [isShowAdd, setIsShowAdd] = useState<boolean>(showAdd)
    const [idClicked, setIdClocked] = useState<number>()
    const saveRoute = !overrideRoute ? (isProposal ? route('proposal.store') : route('report.store')) : overrideRoute

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
                    isWithJenisLaporan={isWithJenisLaporan}
                    isWithPriority={isWithPriority}
                    overrideIdentityProposal={overrideIdentityProposal}
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
