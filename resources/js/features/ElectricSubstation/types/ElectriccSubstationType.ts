import { DistrictType } from "@/features/Territory";

export interface ElectricSubstationType {
    id: number
    name: string
    district: DistrictType
    city_name: string
    description?: string
}
