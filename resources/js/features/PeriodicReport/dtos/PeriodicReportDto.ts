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
    latitude?: string | number | null
    longitude?: string | number | null
    description?: string | null
    report_type?: string | null
    sk_path: File
    certificate_path: File
    condition_path: File
    periodic_path: File
}

