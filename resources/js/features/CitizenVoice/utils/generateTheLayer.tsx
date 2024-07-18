import L from 'leaflet'
import { renderToString } from 'react-dom/server';
import { theMarker } from '@/common/utils';
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { ProposalType } from '@/features/Proposal';
import { ReportType } from '@/features/Report';
import { isProposalType } from '.';
import { BpblProposalType } from '@/features/BpblProposal';
import { BusinessReportType } from '@/features/BusinessReport';
import { PeriodicReportType } from '@/features/PeriodicReport';

export const generateTheLayer = (datas: (ProposalType | ReportType | BpblProposalType | BusinessReportType | PeriodicReportType)[], onClick: (showTracking: boolean, theId: number) => void) => {
    const markerArray = []
    const markers = L.markerClusterGroup();
    for (let i = 0; i < datas.length; i++) {
        const data = datas[i];
        const marker = theMarker(
            parseFloat(data.latitude ?? data.village.latitude ?? "0"),
            parseFloat(data.longitude ?? data.village.longitude ?? "0")
        )
        marker.bindPopup(renderToString(
            <>
                <h2>{isProposalType(data) ? 'Usulan' : 'Laporan'}</h2>
                <h5>{isProposalType(data) ? data.proposal_type : data.description}</h5>
                <p> {data.created_at} </p>
            </>
        ))

        marker.on('click', () => {
            onClick(true, data.id)
        })
        markers.addLayer(marker)
        markerArray.push(marker)
    }
    return { layerGroup: L.layerGroup(markerArray), clusters: markers }
}
