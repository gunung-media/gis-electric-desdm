import { DistrictType, TerritoryType, VillageType } from "."

export interface CityType extends TerritoryType {
    province_code: string
    villages?: VillageType[] | null
    districts?: DistrictType[] | null
}
