import { CityType, calculateSumElectricity } from "@/features/Territory"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head } from "@inertiajs/react"
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import Highcharts3d from 'highcharts/highcharts-3d'
import { useEffect, useState } from "react"
import { generateChart } from "./GraphicVillageElectricity/Index"

export default function Dashboard({
    assets, cities, proposalCount, reportCount, villageCount, villageElectricCount, villageNonElectricCount }: PageProps & {
        cities: CityType[],
        proposalCount: number,
        reportCount: number,
        villageCount: number,
        villageElectricCount: number,
        villageNonElectricCount: number,
    }) {
    HighchartsExporting(Highcharts)
    Highcharts3d(Highcharts)
    const [cityChart, setCityChart] = useState<Highcharts.Chart | undefined>(undefined)

    useEffect(() => {
        const series = cities?.map((city) => {
            const sumData = calculateSumElectricity(city.districts!)
            return {
                name: city.name,
                data: [sumData?.housePln ?? 0, sumData?.houseNonPln ?? 0, sumData?.houseNonElectric ?? 0]
            }
        })
        if (cityChart) {
            cityChart.update({
                // @ts-ignore
                series: series
            });
        } else {
            const chart = generateChart('per-city', series, 5);
            setCityChart(chart);
        }
    }, [cities])

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="row mb-3">
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card tale-bg">
                        <div className="card-people mt-auto">
                            <img src={`${assets}/images/dashboard/people.svg`} alt="people" />
                            <div className="weather-info">
                                <div className="d-flex">
                                    <div className="ms-2">
                                        <h4 className="location font-weight-normal">Kalimantan Tengah</h4>
                                        <h6 className="font-weight-normal">Kalimantan</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 grid-margin transparent">
                    <div className="row">
                        <div className="col-md-6 mb-4 stretch-card transparent">
                            <div className="card card-tale">
                                <div className="card-body">
                                    <p className="mb-4">Total Keseluruhan Desa</p>
                                    <p className="fs-30 mb-2">{villageCount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4 stretch-card transparent">
                            <div className="card card-dark-blue">
                                <div className="card-body">
                                    <p className="mb-4">Kelistrikan Desa</p>
                                    <p className="fs-30 mb-2">{villageElectricCount} Desa berlistik</p>
                                    <p>{villageNonElectricCount} Desa tidak berlistrik</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                            <div className="card card-light-blue">
                                <div className="card-body">
                                    <p className="mb-4">Total Usulan</p>
                                    <p className="fs-30 mb-2">{proposalCount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 stretch-card transparent">
                            <div className="card card-light-danger">
                                <div className="card-body">
                                    <p className="mb-4">Total Laporan</p>
                                    <p className="fs-30 mb-2">{reportCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <p>Grafik Kelistrikan Per-Kabupaten</p>
                            </div>
                            <div id="per-city"></div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
