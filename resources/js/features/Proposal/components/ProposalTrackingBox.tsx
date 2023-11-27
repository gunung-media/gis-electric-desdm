import { FC, useEffect, useState } from "react"
import { Card, CloseButton, Form, InputGroup } from "react-bootstrap"
import { getProposalDetail } from "../api"
import { ProposalType } from ".."

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
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Jenis Usulan</InputGroup.Text>
                            <Form.Control
                                value={proposal?.proposal_type}
                                disabled={true}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Pengusul</InputGroup.Text>
                            <Form.Control
                                value={proposal?.full_name}
                                disabled={true}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3" >
                            <InputGroup.Text id="basic-addon1">Tanggal Usulan</InputGroup.Text>
                            <Form.Control
                                value={proposal?.created_at}
                                disabled={true}
                            />
                        </InputGroup>
                        <InputGroup className="" style={{ marginBottom: '3rem' }}>
                            <InputGroup.Text id="basic-addon1">Status Akhir</InputGroup.Text>
                            <Form.Control
                                value={proposal?.latest_status}
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
                                    {proposal?.trackings.length === 0 ? (
                                        <tr>
                                            <td colSpan={3}>Tidak ada tracking</td>
                                        </tr>
                                    ) : proposal?.trackings.map((tracking) => (
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
