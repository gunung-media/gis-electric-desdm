import { VillageElectricityType } from "@/features/VillageElectricity";
import { CityType, DistrictType, TerritoryType } from ".";

export interface VillageType extends TerritoryType {
    district_code: string
    postal_code: string | null
    city: CityType
    district: DistrictType
    electricity?: VillageElectricityType | null
}
