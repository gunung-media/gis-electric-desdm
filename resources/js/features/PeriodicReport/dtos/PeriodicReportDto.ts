export interface PeriodicReportDTO {
    name: string
    type: string
    nib: string
    npwp: string
    permit_number: string
    email: string
    phone_number: string
    village_code: string
    address: string
    latitude?: string | null
    longitude?: string | null
    description?: string | null
    sk_path: File
    certificate_path: File
    condition_path: File
    periodic_path: File
}

