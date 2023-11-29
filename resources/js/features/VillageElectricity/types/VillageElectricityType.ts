import { CommonTableInterface } from "@/common/interface";
import { VillageType } from "@/features/Territory";

export interface VillageElectricityType extends CommonTableInterface {
    village?: VillageType
    households_with_electricity: number
    households_without_electricity: number
    network_length: number
    village_potential: string
    electricity: boolean
}
