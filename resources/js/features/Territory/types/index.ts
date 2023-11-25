import { CommonTableInterface } from "@/common/interface/CommonTableInterface"

export * from "./CityType"
export * from "./DistrictType"

export interface TerritoryType extends CommonTableInterface {
    name: string
    code: number
}
