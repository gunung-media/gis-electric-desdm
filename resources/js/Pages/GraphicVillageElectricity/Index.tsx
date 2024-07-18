import { HorizontalLayout } from '@/layouts/HorizontalLayout'
import './styles.scss'
import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import { CityType, DistrictType, SelectCity, SelectDistrict, VillageType, calculateSumElectricity } from '@/features/Territory'
import { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import Highcharts3d from 'highcharts/highcharts-3d'

type SeriesType = {
    name: string
    data: number[]
}
export const generateChart = (id: string, series: SeriesType[] | undefined, beta: number = 15) => {
    return Highcharts.chart({
        chart: {
            renderTo: id,
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: beta,
                viewDistance: 25,
                depth: 40
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            labels: {
                skew3d: true,
                style: {
                    fontSize: '16px'
                }
            },
            categories: ['Berlistrik PLN', 'Berlistrik Non PLN', 'Tidak Berlistrik']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Jumlah'
            }
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        // @ts-ignore
        series: series
    });
}

export default function Index({ datas, palangkaraya }: PageProps & { datas: CityType[], palangkaraya: CityType }) {
    HighchartsExporting(Highcharts)
    Highcharts3d(Highcharts)
    const [data, setData] = useState<{
        selectedCity: CityType | null,
        selectedDistrict: DistrictType | null,
    }>({ selectedCity: palangkaraya, selectedDistrict: palangkaraya?.districts![2] })

    const [districtChart, setDistrictChart] = useState<Highcharts.Chart | undefined>(undefined)
    const [villageChart, setVillageChart] = useState<Highcharts.Chart | undefined>(undefined)

    useEffect(() => {
        const districts = data.selectedCity?.districts
        const series = districts?.map((district) => {
            const sumData = calculateSumElectricity(district.villages)
            return {
                name: district.name,
                data: [sumData?.housePln ?? 0, sumData?.houseNonPln ?? 0, sumData?.houseNonElectric ?? 0]
            }
        })
        if (districtChart) {
            districtChart.update({
                // @ts-ignore
                series: series
            });
        } else {
            const chart = generateChart('per-district', series);
            setDistrictChart(chart);
        }
    }, [data.selectedCity])

    useEffect(() => {
        const villages = data.selectedDistrict?.villages
        console.log(villages)
        const series = villages?.map((village) => {
            return {
                name: village.name,
                data: [village.electricity?.households_with_electricity ?? 0, village.electricity?.households_with_electricity_non_pln ?? 0, village.electricity?.households_without_electricity ?? 0]
            }
        })
        if (villageChart) {
            villageChart.update({
                // @ts-ignore
                series: series
            });
        } else {
            const chart = generateChart('per-village', series, -15);
            setVillageChart(chart);
        }
    }, [data.selectedDistrict])

    return (
        <HorizontalLayout>
            <Head title="Grafik Listrik Daearah" />
            <div className="card mb-5">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between mb-5">
                        <p>Grafik Listrik Daerah</p>
                    </div>
                    <form className='forms-sample'>
                        <SelectCity
                            handleCityChange={(e) => setData((data) => ({ ...data, selectedCity: e.value }))}
                            selectedCity={data.selectedCity?.code}
                            isGetDistricts={true}
                        />
                        <SelectDistrict
                            handleDistrictChange={(e) => setData((data) => ({ ...data, selectedDistrict: e.value }))}
                            selectedCityId={data.selectedCity?.code}
                            selectedDistrict={data.selectedDistrict?.code}
                            isGetVillageInfo={true} />
                    </form>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <p>Grafik Kelistrikan Per-Kecamatan {data.selectedCity?.name ?? ''}</p>
                            </div>
                            <div id="per-district"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <p>Grafik Kelistrikan Per-Kelurahan {data.selectedDistrict?.name ?? ''}</p>
                            </div>
                            <div id="per-village"></div>
                        </div>
                    </div>
                </div>
            </div>
        </HorizontalLayout>
    )
}
