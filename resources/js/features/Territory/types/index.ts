import { CommonTableInterface } from "@/common/interface/CommonTableInterface"

export * from "./CityType"
export * from "./DistrictType"
export * from "./VillageType"

export interface TerritoryType extends CommonTableInterface {
    name: string
    code: string
    borders: string | null
    latitude: string | null
    longitude: string | null

    province_code?: string
    city_code?: string
    district_code?: string
}
