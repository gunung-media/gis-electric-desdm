import { TerritoryType } from "."

export interface DistrictType extends TerritoryType {
    city_code: string
    latitude: string
    longitude: string
}

