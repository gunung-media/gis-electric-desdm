import { CommonTableInterface } from "@/common/interface/CommonTableInterface";

export interface ProposalTracking extends CommonTableInterface {
    id: number
    description: string
    status: 'Diterima' | 'Diproses' | 'Ditolak' | 'Diterima dengan catatan'
    proposal_id: number
}
