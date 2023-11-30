export interface VillageElectricityDTO {
    kk?: number
    households_with_electricity: number
    households_with_electricity_non_pln: number
    households_without_electricity: number
    network_length: number
    village_potential: string
    village_code: string | number
    borders?: string | null
}
