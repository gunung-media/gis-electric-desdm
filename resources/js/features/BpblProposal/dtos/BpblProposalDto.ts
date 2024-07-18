export interface BpblProposalDTO {
    full_name: string
    identity_number: string
    email: string
    phone_number: string
    village_code: string
    address: string
    latitude?: string | null
    longitude?: string | null
    description?: string | null
    statement_path: File
    ktp_path: File
    nearest_path: File
    letter_path: File
}

