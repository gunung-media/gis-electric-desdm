import { OptionType, Select } from "@/common/components"
import { FC, useEffect, useState } from "react"
import { DistrictType, getDistricts } from ".."

export const SelectDistrict: FC<{
    handleDistrictChange: (e: OptionType<DistrictType>) => void,
    selectedCityId?: string | number,
    selectedDistrict?: number | string | null
}> = ({ handleDistrictChange, selectedCityId: selectedCity, selectedDistrict }) => {
    const [districts, setDistricts] = useState<DistrictType[]>([])

    const fetchDistricts = async () => {
        if (!selectedCity) return
        const { data: { data } } = await getDistricts(selectedCity)
        setDistricts(data)

    }
    useEffect(() => {
        (async () => await fetchDistricts())()

        return () => {
            setDistricts([])
        }
    }, [selectedCity])

    useEffect(() => {
        if (selectedDistrict) {
            (async () => await fetchDistricts())()
        }

        return () => {
            setDistricts([])
        }
    }, [selectedDistrict])


    return (
        <Select
            title="Kecamatan"
            data={districts}
            onChange={(e) => handleDistrictChange(e as OptionType<DistrictType>)}
            selectedId={selectedDistrict}
        />
    )
}
