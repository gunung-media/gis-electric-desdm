import { DistrictType, VillageType } from "..";

export type SumType = {
    village?: number,
    rumahTinggal: number,
    kk: number,
    villagePln: number,
    villageNonPln: number,
    villageNonElectric: number,
    housePln: number,
    houseNonPln: number,
    houseNonElectric: number,
}

export const calculateSumElectricity = (data: (VillageType | DistrictType)[] | undefined, globalSum?: SumType): SumType | undefined => {
    return data?.reduce(
        (totals, item) => {
            if ('villages' in item) {
                const district = item as DistrictType;
                const districtTotals = calculateSumElectricity(district.villages);
                totals.rumahTinggal += districtTotals?.rumahTinggal ?? 0;
                totals.kk += districtTotals?.kk ?? 0;
                totals.villagePln += districtTotals?.villagePln ?? 0;
                totals.villageNonPln += districtTotals?.villageNonPln ?? 0;
                totals.villageNonElectric += districtTotals?.villageNonElectric ?? 0;
                totals.housePln += districtTotals?.housePln ?? 0;
                totals.houseNonPln += districtTotals?.houseNonPln ?? 0;
                totals.houseNonElectric += districtTotals?.houseNonElectric ?? 0;
            } else {
                const village = item as VillageType;
                totals.rumahTinggal += village.electricity?.households_count ?? 0;
                totals.kk += village.electricity?.kk ?? 0;
                totals.villagePln += village.electricity?.is_village_electric_pln ? 1 : 0;
                totals.villageNonPln += village.electricity?.is_village_electric_non_pln ? 1 : 0;
                totals.villageNonElectric += village.electricity?.is_village_no_electric ? 1 : 0;
                totals.housePln += village.electricity?.households_with_electricity ?? 0;
                totals.houseNonPln += village.electricity?.households_with_electricity_non_pln ?? 0;
                totals.houseNonElectric += village.electricity?.households_without_electricity ?? 0;
            }
            return totals;
        },
        globalSum ?? {
            rumahTinggal: 0,
            kk: 0,
            villagePln: 0,
            villageNonPln: 0,
            villageNonElectric: 0,
            housePln: 0,
            houseNonPln: 0,
            houseNonElectric: 0,
        }
    );
};
