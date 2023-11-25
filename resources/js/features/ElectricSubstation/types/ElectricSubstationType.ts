import { CommonTableInterface } from "@/common/interface/CommonTableInterface";
import { DistrictType } from "@/features/Territory";

export interface ElectricSubstationType extends CommonTableInterface {
    name: string
    district: DistrictType
    city_name: string
    description?: string
}
