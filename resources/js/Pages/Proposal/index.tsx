import './styles.scss'
import L from 'leaflet'
import { useMap } from '@/common/hooks'
import { useEffect, useState } from 'react'
import { Head, router, } from '@inertiajs/react'
import { Loader } from '@/common/components';
import { ModalFormProposal, ProposalType, ProposalTrackingBox } from '@/features/Proposal'
import { theMarker } from '@/common/utils'
import { PageProps } from '@/types'
import { renderToString } from 'react-dom/server'

export default function Proposal({ datas }: PageProps & { datas: ProposalType[] }) {
    const { map } = useMap()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isShowTracking, setIsShowTracking] = useState<boolean>(false)
    const [isShowAdd, setIsShowAdd] = useState<boolean>(false)
    const [proposalId, setProposalId] = useState<number>()

    useEffect(() => {
        const proposalMarker = []
        for (let i = 0; i < datas.length; i++) {
            const proposal = datas[i];
            const marker = theMarker(
                parseFloat(proposal.latitude ?? proposal.village.latitude ?? "0"),
                parseFloat(proposal.longitude ?? proposal.village.longitude ?? "0")
            )
            marker.bindPopup(renderToString(
                <>
                    <h5>{proposal.proposal_type}</h5>
                    <p>{proposal.created_at}</p>

                </>
            ))

            marker.on('click', () => {
                setIsShowTracking(true)
                setProposalId(proposal.id)
            })
            proposalMarker.push(marker)
        }
        const proposalLayer = L.layerGroup(proposalMarker)

        if (map) {
            L.control.zoom({
                position: 'bottomleft'
            }).addTo(map)

            map.addLayer(proposalLayer)
            setIsLoading(false)
        }

    }, [map])


    return (
        <>
            <Head title='Usulan' />
            <Loader isShow={isLoading} />
            <div id="map"></div>
            <div className="header">
                <div className="header-box" onClick={() => router.visit(route('landing'))}>Silisda <span>usulan</span></div>
                <div className="header-actions">
                    <button onClick={() => setIsShowAdd(true)}>
                    </button>
                    <button>
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
        </>
    )
}
