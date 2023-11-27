import { PriorityEnum } from "@/common/enums"

export interface ReportDTO {
    full_name: string
    identity_number: string
    email: string
    phone_number: string
    village_code: string
    address: string
    latitude?: string | null
    longitude?: string | null
    date_happen: string;
    report_type: string;
    description?: string | null
    document_path: File
    priority: PriorityEnum
}

