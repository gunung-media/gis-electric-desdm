import { OptionType, Select } from "@/common/components"
import { FC, useEffect, useState } from "react"
import { CityType, getCities, getCitiesKalteng } from ".."

export const SelectCity: FC<{
    handleCityChange: (e: OptionType<CityType>) => void,
    selectedCity?: number | string
}> = ({ handleCityChange, selectedCity }) => {
    const [cities, setCities] = useState<CityType[]>([])

    useEffect(() => {
        (async () => {
            const { data: { data } } = await getCitiesKalteng()
            setCities(data)
        })()

        return () => {
            setCities([])
        }
    }, [])

    return (
        <Select title="Kabupaten/Kota" data={cities} onChange={(e) => handleCityChange(e as OptionType<CityType>)} selectedId={selectedCity} />
    )
}
