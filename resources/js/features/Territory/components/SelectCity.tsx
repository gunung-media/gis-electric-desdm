import { OptionType, Select } from "@/common/components"
import { FC, useEffect, useState } from "react"
import { CityType, getCities, getCityWithDistrict } from ".."

export const SelectCity: FC<{
    handleCityChange: (e: OptionType<CityType>) => void,
    selectedCity?: number | string,
    isGetDistricts?: boolean
    disabled?: boolean
}> = ({ handleCityChange, selectedCity, isGetDistricts, disabled = false }) => {
    const [cities, setCities] = useState<CityType[]>([])

    useEffect(() => {
        (async () => {
            const { data: { data } } = isGetDistricts ? await getCityWithDistrict() : await getCities()
            setCities(data)
        })()

        return () => {
            setCities([])
        }
    }, [])

    return (
        <Select title="Kabupaten/Kota" data={cities} onChange={(e) => handleCityChange(e as OptionType<CityType>)} selectedId={selectedCity} isDisabled={disabled} />
    )
}
