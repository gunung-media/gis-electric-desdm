import { OptionType, Select } from "@/common/components"
import { FC, useEffect, useState } from "react"
import { VillageType, getVillages } from ".."

export const SelectVillage: FC<{
    handleVillageChange: (e: OptionType<VillageType>) => void,
    selectedDistrictId?: string | number,
    selectedVillage?: number | string | null
}> = ({ handleVillageChange, selectedDistrictId: selectedDistrict, selectedVillage }) => {
    const [villages, setVillages] = useState<VillageType[]>([])

    const fetchVillagess = async () => {
        if (!selectedDistrict) return
        const { data: { data } } = await getVillages(selectedDistrict)
        setVillages(data)

    }
    useEffect(() => {
        (async () => await fetchVillagess())()

        return () => {
            setVillages([])
        }
    }, [selectedDistrict])

    useEffect(() => {
        if (selectedVillage) {
            (async () => await fetchVillagess())()
        }

        return () => {
            setVillages([])
        }
    }, [selectedVillage])

    return (
        <Select
            title="Desa/Kelurahan"
            data={villages}
            onChange={(e) => handleVillageChange(e as OptionType<VillageType>)}
            selectedId={selectedVillage}
        />
    )
}
