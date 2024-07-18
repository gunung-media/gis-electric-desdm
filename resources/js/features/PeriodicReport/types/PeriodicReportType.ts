import { CommonTableInterface } from "@/common/interface/CommonTableInterface"
import { VillageType } from "@/features/Territory"
import { ProposalTracking } from "./ProposalTrackingType"

export interface BpblProposalType extends CommonTableInterface {
    name: string
    type: string
    nib: string
    npwp: string
    permit_number: string
    email: string
    phone_number: string
    village_code: string
    address: string
    latitude: string | null
    longitude: string | null
    description: string | null
    report_path: string | null
    certificate_path: string | null
    condition_path: string | null
    periodic_path: string | null
    village: VillageType
}
