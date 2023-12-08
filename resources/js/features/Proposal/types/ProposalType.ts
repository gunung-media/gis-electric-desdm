import { CommonTableInterface } from "@/common/interface/CommonTableInterface"
import { VillageType } from "@/features/Territory"
import { ProposalTracking } from "./ProposalTrackingType"

export interface ProposalType extends CommonTableInterface {
    full_name: string
    identity_number: string
    email: string
    phone_number: string
    village_code: string
    address: string
    latitude: string | null
    longitude: string | null
    proposal_type: string
    description: string | null
    document_path: string
    estimated_cost: number | null
    priority: 'Tinggi' | 'Sedang' | 'Rendah'
    additional_note: string | null
    latest_status: string
    nomor_surat_usulan: string | null
    perihal: string | null
    tgl_surat: string | null
    village: VillageType
    trackings: ProposalTracking[]
}
