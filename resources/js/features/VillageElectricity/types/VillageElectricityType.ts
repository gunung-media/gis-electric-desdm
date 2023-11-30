import { CommonTableInterface } from "@/common/interface";
import { VillageType } from "@/features/Territory";

export interface VillageElectricityType extends CommonTableInterface {
    village?: VillageType
    kk?: number
    households_with_electricity: number
    households_with_electricity_non_pln: number
    households_without_electricity: number
    network_length: number
    village_potential: string
    electricity: boolean
    is_village_electric_pln: boolean
    is_village_electric_non_pln: boolean
    is_village_no_electric: boolean
    households_count: number
}
