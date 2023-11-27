import L from 'leaflet'
import { ReportType } from '..';
import { renderToString } from 'react-dom/server';
import { theMarker } from '@/common/utils';

export const generateReportLayer = (datas: ReportType[], onClick: (showTracking: boolean, reportId: number) => void) => {
    const reportMarker = []
    for (let i = 0; i < datas.length; i++) {
        const report = datas[i];
        const marker = theMarker(
            parseFloat(report.latitude ?? report.village.latitude ?? "0"),
            parseFloat(report.longitude ?? report.village.longitude ?? "0")
        )
        marker.bindPopup(renderToString(
            <>
                <h5>{report.report_type} </h5>
                <p> {report.created_at} </p>
            </>
        ))

        marker.on('click', () => {
            onClick(true, report.id)
        })
        reportMarker.push(marker)
    }
    return L.layerGroup(reportMarker)
}
