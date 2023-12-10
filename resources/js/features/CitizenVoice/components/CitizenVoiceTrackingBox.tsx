import { FC, useEffect, useState } from "react"
import { Card, CloseButton } from "react-bootstrap"
import { BootstrapInputGroup, TrackingTable } from "@/common/components"
import { ReportType } from "@/features/Report"
import { ProposalType } from "@/features/Proposal"
import { isProposalType } from "../utils"
import { getReportDetail } from "@/features/Report/api"
import { getProposalDetail } from "@/features/Proposal/api"

export const CitizenVoiceTrackingBox: FC<{
    isShow: boolean,
    theId?: number,
    onClose: () => void,
    isShowForm?: boolean,
    isShowTracking?: boolean,
    isProposal: boolean
}> = ({ theId, isShow, onClose, isShowForm = true, isShowTracking = true, isProposal }) => {
    const [data, setData] = useState<ProposalType | ReportType>()

    useEffect(() => {
        (async () => {
            if (theId) {
                const { data: { data: theData } } = isProposal ? await getProposalDetail(theId) : await getReportDetail(theId)
                setData(theData)
            }
        })();

    }, [theId])
    return (
        <>
            {isShow && (
                <Card className='tracking'>
                    <Card.Body className='content'>
                        <Card.Title style={{ display: 'flex', justifyContent: 'center' }}>
                            <p style={{ marginLeft: 'auto' }}>Tracking</p>
                            <CloseButton onClick={onClose} style={{ marginLeft: 'auto' }} />
                        </Card.Title>
                        {isShowForm && (
                            <>
                                {isProposalType(data) ? (
                                    <BootstrapInputGroup
                                        title="Jenis Usulan"
                                        value={data?.proposal_type}
                                        disabled={true}
                                        className="mb-3"
                                    />
                                ) : (
                                    <BootstrapInputGroup
                                        title="Jenis Laporan"
                                        value={data?.report_type}
                                        disabled={true}
                                        className="mb-3"
                                    />
                                )}
                                <BootstrapInputGroup
                                    title="Pengusul"
                                    value={data?.full_name}
                                    disabled={true}
                                    className="mb-3"
                                />
                                <BootstrapInputGroup
                                    title="Tanggal Usulan"
                                    value={data?.created_at}
                                    disabled={true}
                                    className="mb-3"
                                />
                                <BootstrapInputGroup
                                    title="Status Akhir"
                                    value={data?.latest_status}
                                    disabled={true}
                                    style={{ marginBottom: '3rem' }}
                                />
                            </>
                        )}
                        {isShowTracking && (
                            <TrackingTable trackings={data?.trackings} />
                        )}
                    </Card.Body>
                </Card >
            )}
        </>
    )
}
