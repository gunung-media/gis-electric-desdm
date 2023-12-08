import { PriorityEnum } from "@/common/enums"

export interface ProposalDTO {
    full_name: string
    identity_number: string
    email: string
    phone_number: string
    village_code: string
    address: string
    latitude?: string | null
    longitude?: string | null
    proposal_type: string
    description?: string | null
    document_path: File
    estimated_cost?: number | null
    priority: PriorityEnum
    additional_note?: string | null
    nomor_surat_usulan?: string | null
    perihal?: string | null
    tgl_surat?: string | null
}

