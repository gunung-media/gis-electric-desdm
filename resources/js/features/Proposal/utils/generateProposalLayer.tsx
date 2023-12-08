import L from 'leaflet'
import { ProposalType } from '..';
import { renderToString } from 'react-dom/server';
import { theMarker } from '@/common/utils';
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

export const generateProposalLayer = (datas: ProposalType[], onClick: (showTracking: boolean, proposalId: number) => void) => {
    const proposalMarker = []
    const markers = L.markerClusterGroup();
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
        markers.addLayer(marker)
        proposalMarker.push(marker)
    }
    return { layerGroup: L.layerGroup(proposalMarker), clusters: markers }
}
