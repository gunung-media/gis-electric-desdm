import { CommonTableInterface } from "@/common/interface/CommonTableInterface"
import { VillageType } from "@/features/Territory"
import { ReportTrackingType } from "./ReportTrackingType"

export interface ReportType extends CommonTableInterface {
    full_name: string
    identity_number: string
    email: string
    phone_number: string
    village_code: string
    address: string
    latitude: string | null
    longitude: string | null
    date_happen: string;
    report_type: string;
    description: string | null
    document_path: string
    priority: 'Tinggi' | 'Sedang' | 'Rendah'
    latest_status: string
    village: VillageType
    trackings: ReportTrackingType[]
}
