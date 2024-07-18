import { CommonTableInterface } from "@/common/interface/CommonTableInterface"
import { VillageType } from "@/features/Territory"
import { ProposalTracking } from "./ProposalTrackingType"

export interface BusinessReportType extends CommonTableInterface {
    name: string
    nib: string
    npwp: string
    email: string
    phone_number: string
    village_code: string
    address: string
    latitude: string | null
    longitude: string | null
    description: string | null
    request_path: string | null
    ktp_path: string | null
    nib_path: string | null
    npwp_path: string | null
    diagram_path: string | null
    location_path: string | null
    specification_path: string | null
    village: VillageType
}
