import L from 'leaflet'
import { ProposalType } from '..';
import { renderToString } from 'react-dom/server';
import { theMarker } from '@/common/utils';

export const generateProposalLayer = (datas: ProposalType[], onClick: (showTracking: boolean, proposalId: number) => void) => {
    const proposalMarker = []
    for (let i = 0; i < datas.length; i++) {
        const proposal = datas[i];
        const marker = theMarker(
            parseFloat(proposal.latitude ?? proposal.village.latitude ?? "0"),
            parseFloat(proposal.longitude ?? proposal.village.longitude ?? "0")
        )
        marker.bindPopup(renderToString(
            <>
                <h5>{proposal.proposal_type} </h5>
                <p> {proposal.created_at} </p>
            </>
        ))

        marker.on('click', () => {
            onClick(true, proposal.id)
        })
        proposalMarker.push(marker)
    }
    return L.layerGroup(proposalMarker)
}
