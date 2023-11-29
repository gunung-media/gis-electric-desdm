import { FC, useEffect, useState } from "react"
import { Card, CloseButton } from "react-bootstrap"
import { getReportDetail } from "../api"
import { ReportType } from ".."
import { BootstrapInputGroup, TrackingTable } from "@/common/components"

export const ReportTrackingBox: FC<{
    isShow: boolean,
    reportId?: number,
    onClose: () => void
}> = ({ reportId, isShow, onClose }) => {
    const [report, setReport] = useState<ReportType>()

    useEffect(() => {
        (async () => {
            if (reportId) {
                const { data: { data: proposal } } = await getReportDetail(reportId)
                setReport(proposal)
            }
        })();

    }, [reportId])
    return (
        <>
            {isShow && (
                <Card className='tracking'>
                    <Card.Body className='content'>
                        <Card.Title style={{ display: 'flex', justifyContent: 'center' }}>
                            <p style={{ marginLeft: 'auto' }}>Tracking</p>
                            <CloseButton onClick={onClose} style={{ marginLeft: 'auto' }} />
                        </Card.Title>
                        <BootstrapInputGroup
                            title="Jenis Laporan"
                            value={report?.report_type}
                            disabled={true}
                            className="mb-3"
                        />
                        <BootstrapInputGroup
                            title="Pelapor"
                            value={report?.full_name}
                            disabled={true}
                            className="mb-3"
                        />
                        <BootstrapInputGroup
                            title="Tanggal Laporan"
                            value={report?.created_at}
                            disabled={true}
                            className="mb-3"
                        />
                        <BootstrapInputGroup
                            title="Status Akhir"
                            value={report?.latest_status}
                            disabled={true}
                            style={{ marginBottom: '3rem' }}
                        />
                        <TrackingTable trackings={report?.trackings} />
                    </Card.Body>
                </Card >
            )}
        </>
    )
}
