import { HorizontalLayout } from '@/layouts/HorizontalLayout'
import './styles.scss'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import { CityType } from '@/features/Territory'
import { Fragment, useEffect } from 'react'
import { intToRoman, numberToLetter } from '@/common/utils'

export default function Index({ datas }: PageProps & { datas: CityType[] }) {
    useEffect(() => console.log(datas), [])
    const renderTableRow = (props: {
        className: 'city' | 'district' | 'villages',
        number: string | number,
        name: string,
        rumahTinggal?: number,
        kk?: number,
        villagePln?: number,
        villageNonPln?: number,
        villageNonElectric?: number,
        housePln?: number,
        houseNonPln?: number,
        houseNonElectric?: number,
    }) => (
        <tr className={props.className}>
            <td>{props.number}</td>
            <td>{props.name}</td>
            <td>{props.rumahTinggal ?? '-'}</td>
            <td>{props.kk ?? '-'}</td>
            <td>{props.villagePln ?? '-'}</td>
            <td>{props.villageNonPln ?? '-'}</td>
            <td>{props.villageNonElectric ?? '-'}</td>
            <td>{props.housePln ?? '-'}</td>
            <td>{props.houseNonPln ?? '-'}</td>
            <td colSpan={2}>{props.houseNonElectric ?? '-'}</td>
        </tr>
    )
    return (
        <HorizontalLayout>
            <Head title="Statistik Kelistrikan Daearah" />
            <div className="card table-fixed">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Statistik Kelistrikan Daerah</p>
                    </div>
                    <div className="row">
                        <div className="col-12 ">
                            <table className="table table-responsive table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th rowSpan={2}>No</th>
                                        <th rowSpan={2}>Kabupaten/Kecamatan/Desa</th>
                                        <th colSpan={2}>Jumlah</th>
                                        <th colSpan={2}>Desa Berlistrik</th>
                                        <th rowSpan={2}>Desa Belum Berlistrik</th>
                                        <th colSpan={2}>Rumah Tinggal Berlistrik</th>
                                        <th colSpan={2} rowSpan={2}>Rumah Tinggal Belum Berlistrik</th>
                                    </tr>
                                    <tr className='info'>
                                        <th>Rumah Tinggal</th>
                                        <th>KK</th>
                                        <th>PLN</th>
                                        <th>Non PLN</th>
                                        <th>PLN</th>
                                        <th>Non PLN</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datas.map((city, l) => {
                                        const districts = city.districts
                                        const cityTotals = districts?.reduce(
                                            (totals, district) => {
                                                const villages = district.villages;
                                                const districtTotals = villages?.reduce(
                                                    (totals, village) => {
                                                        totals.rumahTinggal += village.electricity?.households_count ?? 0;
                                                        totals.kk += village.electricity?.kk ?? 0;
                                                        totals.villagePln += village.electricity?.is_village_electric_pln ? 1 : 0;
                                                        totals.villageNonPln += village.electricity?.is_village_electric_non_pln ? 1 : 0;
                                                        totals.villageNonElectric += village.electricity?.is_village_no_electric ? 1 : 0;
                                                        totals.housePln += village.electricity?.households_with_electricity ?? 0;
                                                        totals.houseNonPln += village.electricity?.households_with_electricity_non_pln ?? 0;
                                                        totals.houseNonElectric += village.electricity?.households_without_electricity ?? 0;
                                                        return totals;
                                                    },
                                                    {
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

                                                totals.rumahTinggal += districtTotals?.rumahTinggal ?? 0;
                                                totals.kk += districtTotals?.kk ?? 0;
                                                totals.villagePln += districtTotals?.villagePln ?? 0;
                                                totals.villageNonPln += districtTotals?.villageNonPln ?? 0;
                                                totals.villageNonElectric += districtTotals?.villageNonElectric ?? 0;
                                                totals.housePln += districtTotals?.housePln ?? 0;
                                                totals.houseNonPln += districtTotals?.houseNonPln ?? 0;
                                                totals.houseNonElectric += districtTotals?.houseNonElectric ?? 0;
                                                return totals;
                                            },
                                            {
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
                                        return (
                                            <Fragment key={city.code}>
                                                {renderTableRow({
                                                    className: 'city',
                                                    name: city.name,
                                                    number: numberToLetter(l) ?? '',
                                                    rumahTinggal: cityTotals?.rumahTinggal,
                                                    kk: cityTotals?.kk,
                                                    villagePln: cityTotals?.villagePln,
                                                    villageNonPln: cityTotals?.villageNonPln,
                                                    villageNonElectric: cityTotals?.villageNonElectric,
                                                    housePln: cityTotals?.housePln,
                                                    houseNonPln: cityTotals?.houseNonPln,
                                                    houseNonElectric: cityTotals?.houseNonElectric,
                                                })}
                                                {districts &&
                                                    districts.map((district, r) => {
                                                        const villages = district.villages
                                                        const districtTotals = villages?.reduce(
                                                            (totals, village) => {
                                                                totals.rumahTinggal += village.electricity?.households_count ?? 0;
                                                                totals.kk += village.electricity?.kk ?? 0;
                                                                totals.villagePln += village.electricity?.is_village_electric_pln ? 1 : 0;
                                                                totals.villageNonPln += village.electricity?.is_village_electric_non_pln ? 1 : 0;
                                                                totals.villageNonElectric += village.electricity?.is_village_no_electric ? 1 : 0;
                                                                totals.housePln += village.electricity?.households_with_electricity ?? 0;
                                                                totals.houseNonPln += village.electricity?.households_with_electricity_non_pln ?? 0;
                                                                totals.houseNonElectric += village.electricity?.households_without_electricity ?? 0;
                                                                return totals;
                                                            },
                                                            {
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
                                                        return (
                                                            <Fragment key={district.code}>
                                                                {renderTableRow({
                                                                    className: 'district',
                                                                    name: district.name,
                                                                    number: intToRoman(r + 1),
                                                                    rumahTinggal: districtTotals?.rumahTinggal,
                                                                    kk: districtTotals?.kk,
                                                                    villagePln: districtTotals?.villagePln,
                                                                    villageNonPln: districtTotals?.villageNonPln,
                                                                    villageNonElectric: districtTotals?.villageNonElectric,
                                                                    housePln: districtTotals?.housePln,
                                                                    houseNonPln: districtTotals?.houseNonPln,
                                                                    houseNonElectric: districtTotals?.villageNonElectric,
                                                                })}
                                                                {villages && villages.map((village, i) => {
                                                                    return renderTableRow({
                                                                        className: 'villages',
                                                                        name: village.name,
                                                                        number: i + 1,
                                                                        rumahTinggal: village.electricity?.households_count,
                                                                        kk: village.electricity?.kk,
                                                                        villagePln: village.electricity?.is_village_electric_pln ? 1 : 0,
                                                                        villageNonPln: village.electricity?.is_village_electric_non_pln ? 1 : 0,
                                                                        villageNonElectric: village.electricity?.is_village_no_electric ? 1 : 0,
                                                                        housePln: village.electricity?.households_with_electricity,
                                                                        houseNonPln: village.electricity?.households_with_electricity_non_pln,
                                                                        houseNonElectric: village.electricity?.households_without_electricity,
                                                                    })
                                                                })}
                                                            </Fragment>
                                                        )
                                                    })
                                                }
                                            </Fragment>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </HorizontalLayout>
    )
}
