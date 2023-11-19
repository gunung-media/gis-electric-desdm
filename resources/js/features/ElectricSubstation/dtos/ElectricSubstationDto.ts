export interface ElectricSubstationDTO {
    name: string
    district_id: string | number | null
    city_id?: string | number
    description?: string
    latitude: string | number
    longitude: string | number
}
