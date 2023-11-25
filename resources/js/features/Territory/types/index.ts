import { CommonTableInterface } from "@/common/interface/CommonTableInterface"

export * from "./CityType"
export * from "./DistrictType"
export * from "./VillageType"

export interface TerritoryType extends CommonTableInterface {
    name: string
    code: number
}
