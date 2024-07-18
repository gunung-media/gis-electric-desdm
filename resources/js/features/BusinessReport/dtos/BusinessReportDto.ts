export interface BusinessReportDTO {
    name: string
    nib: string
    npwp: string
    email: string
    phone_number: string
    village_code: string
    address: string
    latitude?: string | null
    longitude?: string | null
    description?: string | null
    reuquest_path: File
    ktp_path: File
    nib_path: File
    npwp_path: File
    diagram_path: File
    location_path: File
    specification_path: File
    bap_path: File
}

