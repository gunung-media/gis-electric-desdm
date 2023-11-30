import { TerritoryType, VillageType } from "."

export interface DistrictType extends TerritoryType {
    city_code: string,
    villages?: VillageType[]
}

