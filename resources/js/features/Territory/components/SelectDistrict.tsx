import { OptionType, Select } from "@/common/components"
import { FC, useEffect, useState } from "react"
import { DistrictType, getDistricts, getDistrictsWithVillageInfo } from ".."

export const SelectDistrict: FC<{
    handleDistrictChange: (e: OptionType<DistrictType>) => void,
    selectedCityId?: string | number,
    selectedDistrict?: number | string | null,
    isGetVillageInfo?: boolean
}> = ({ handleDistrictChange, selectedCityId: selectedCity, selectedDistrict, isGetVillageInfo }) => {
    const [districts, setDistricts] = useState<DistrictType[]>([])

    const fetchDistricts = async () => {
        if (!selectedCity) return
        const { data: { data } } = isGetVillageInfo ? await getDistrictsWithVillageInfo(selectedCity) : await getDistricts(selectedCity)
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
