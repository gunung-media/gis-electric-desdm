import { FC, useEffect, useState } from "react"
import { Card, CloseButton } from "react-bootstrap"
import { getProposalDetail } from "../api"
import { ProposalType } from ".."
import { BootstrapInputGroup, TrackingTable } from "@/common/components"

export const ProposalTrackingBox: FC<{
    isShow: boolean,
    proposalId?: number,
    onClose: () => void
}> = ({ proposalId, isShow, onClose }) => {
    const [proposal, setProposal] = useState<ProposalType>()

    useEffect(() => {
        (async () => {
            if (proposalId) {
                const { data: { data: proposal } } = await getProposalDetail(proposalId)
                setProposal(proposal)
            }
        })();

    }, [proposalId])
    return (
        <>
            {isShow && (
                <Card className='tracking'>
                    <Card.Body>
                        <Card.Title style={{ display: 'flex', justifyContent: 'center' }}>
                            <p style={{ marginLeft: 'auto' }}>Tracking</p>
                            <CloseButton onClick={onClose} style={{ marginLeft: 'auto' }} />
                        </Card.Title>
                        <BootstrapInputGroup
                            title="Jenis Usulan"
                            value={proposal?.proposal_type}
                            disabled={true}
                            className="mb-3"
                        />
                        <BootstrapInputGroup
                            title="Pengusul"
                            value={proposal?.full_name}
                            disabled={true}
                            className="mb-3"
                        />
                        <BootstrapInputGroup
                            title="Tanggal Usulan"
                            value={proposal?.created_at}
                            disabled={true}
                            className="mb-3"
                        />
                        <BootstrapInputGroup
                            title="Status Akhir"
                            value={proposal?.latest_status}
                            disabled={true}
                            style={{ marginBottom: '3rem' }}
                        />
                        <TrackingTable trackings={proposal?.trackings} />
                    </Card.Body>
                </Card >
            )}
        </>
    )
}
