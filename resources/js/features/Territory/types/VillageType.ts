import { VillageElectricityType } from "@/features/VillageElectricity";
import { CityType, DistrictType, TerritoryType } from ".";

export interface VillageType extends TerritoryType {
    district_code: string
    latitude: string | null
    longitude: string | null
    postal_code: string | null
    borders: string | null
    city: CityType
    district: DistrictType
    electricity?: VillageElectricityType | null
}
