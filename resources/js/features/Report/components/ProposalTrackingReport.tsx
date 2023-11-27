import { FC, useEffect, useState } from "react"
import { Card, CloseButton, Form, InputGroup } from "react-bootstrap"
import { getReportDetail } from "../api"
import { ReportType } from ".."

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
                    <Card.Body>
                        <Card.Title style={{ display: 'flex', justifyContent: 'center' }}>
                            <p style={{ marginLeft: 'auto' }}>Tracking</p>
                            <CloseButton onClick={onClose} style={{ marginLeft: 'auto' }} />
                        </Card.Title>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Jenis Laporan</InputGroup.Text>
                            <Form.Control
                                value={report?.report_type}
                                disabled={true}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Pelapor</InputGroup.Text>
                            <Form.Control
                                value={report?.full_name}
                                disabled={true}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3" >
                            <InputGroup.Text id="basic-addon1">Tanggal Laporan</InputGroup.Text>
                            <Form.Control
                                value={report?.created_at}
                                disabled={true}
                            />
                        </InputGroup>
                        <InputGroup className="" style={{ marginBottom: '3rem' }}>
                            <InputGroup.Text id="basic-addon1">Status Akhir</InputGroup.Text>
                            <Form.Control
                                value={report?.latest_status}
                                disabled={true}
                            />
                        </InputGroup>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Deskripsi</th>
                                        <th>Status</th>
                                        <th>Tanggal</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {report?.trackings.length === 0 ? (
                                        <tr>
                                            <td colSpan={3}>Tidak ada tracking</td>
                                        </tr>
                                    ) : report?.trackings.map((tracking) => (
                                        <tr>
                                            <td>{tracking.status}</td>
                                            <td>{tracking.description}</td>
                                            <td className="text-danger">{tracking.created_at}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card.Body>
                </Card >
            )}
        </>
    )
}
