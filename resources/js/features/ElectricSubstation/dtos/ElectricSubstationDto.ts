export interface ElectricSubstationDTO {
    name: string
    district_code: string | number | null
    city_id?: string | number
    description?: string
    latitude: string | number
    longitude: string | number
}
