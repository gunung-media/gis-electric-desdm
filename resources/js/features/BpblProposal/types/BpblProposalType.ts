import { CommonTableInterface } from "@/common/interface/CommonTableInterface"
import { VillageType } from "@/features/Territory"
import { BpblProposalTracking } from "./BpblProposalTrackingType"

export interface BpblProposalType extends CommonTableInterface {
    full_name: string
    identity_number: string
    email: string
    phone_number: string
    village_code: string
    address: string
    latitude: string | null
    longitude: string | null
    description: string | null
    statement_path: string | null
    ktp_path: string | null
    house_path: string | null
    nearest_path: string | null
    letter_path: string | null
    village: VillageType
    trackings: BpblProposalTracking[],
    latest_status?: string | null
}
