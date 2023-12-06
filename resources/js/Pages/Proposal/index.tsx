import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss'
import L from 'leaflet'
import CreateBtn from '@/assets/icons/add-plus-svgrepo-com.svg?react'
import { useMap } from '@/common/hooks'
import { useEffect, useState } from 'react'
import { Head, router, } from '@inertiajs/react'
import { ContactUs, Loader } from '@/common/components';
import { ModalFormProposal, ProposalType, ProposalTrackingBox, generateProposalLayer } from '@/features/Proposal'
import { PageProps } from '@/types'

export default function Proposal({ datas }: PageProps & { datas: ProposalType[] }) {
    const { map } = useMap()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isShowTracking, setIsShowTracking] = useState<boolean>(false)
    const [isShowAdd, setIsShowAdd] = useState<boolean>(true)
    const [proposalId, setProposalId] = useState<number>()

    useEffect(() => {
        const proposalLayer = generateProposalLayer(datas, (isShow, proposalId) => {
            setIsShowTracking(isShow)
            setProposalId(proposalId)
        })

        if (map) {
            L.control.zoom({
                position: 'bottomleft'
            }).addTo(map)

            map.addLayer(proposalLayer)
            setIsLoading(false)
        }

    }, [map, datas])

    return (
        <>
            <Head title='Usulan' />
            <Loader isShow={isLoading} />
            <div id="map"></div>
            <div className="header">
                <div className="header-box" onClick={() => router.visit(route('landing'))}><span>Si</span>lisda <span>usulan</span></div>
                <div className="header-actions">
                    <button onClick={() => setIsShowAdd(true)}>
                        <CreateBtn />
                    </button>
                </div>
            </div>

            <ModalFormProposal
                isShow={isShowAdd}
                onClose={() => setIsShowAdd(false)}
            />

            <ProposalTrackingBox
                isShow={isShowTracking}
                onClose={() => setIsShowTracking(false)}
                proposalId={proposalId}
            />

            <ContactUs />
        </>
    )
}
