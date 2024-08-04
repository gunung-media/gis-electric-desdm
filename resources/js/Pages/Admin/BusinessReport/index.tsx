import { DataTable, OptionType } from "@/common/components"
import { BusinessReportType } from "@/features/BusinessReport"
import { CityType, DistrictType, SelectCity, SelectDistrict, SelectVillage, VillageType } from "@/features/Territory"
import { ImportModal } from "@/features/VillageElectricity/components"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head, router, usePage } from "@inertiajs/react"
import { useState, useEffect } from "react"

export default function Index({ datas }: PageProps & { datas: BusinessReportType[] }) {
    const [cityCode, setCityCode] = useState<string | number>()
    const [districtCode, setDistrictCode] = useState<string | number>()
    const [villageCode, setVillageCode] = useState<string | number>()
    const { url } = usePage();
    const [isShowImport, setIsShowImport] = useState<boolean>(false)

    useEffect(() => {
        setCityCode(new URL(window.location.origin + url).searchParams.get('city_code') ?? undefined);
        setDistrictCode(new URL(window.location.origin + url).searchParams.get('district_code') ?? undefined)
        setVillageCode(new URL(window.location.origin + url).searchParams.get('village_code') ?? undefined);
    }, []);


    const handleCityChange = (e: OptionType<CityType>) => {
        setCityCode(e.value.code)
    }

    const handleDistrictChange = (e: OptionType<DistrictType>) => {
        setDistrictCode(e.value.code)
    }

    const handleVillageChange = (e: OptionType<VillageType>) => {
        setVillageCode(e.value.code)
    }
    const handleSearch = () => {
        router.get(route('admin.business-report.index'), {
            city_code: cityCode,
            district_code: districtCode,
            village_code: villageCode
        })
    }

    const column: string[] = [
        'NAMA BADAN USAHA / PERORANGAN',
        'NOMOR DAN TANGGAL SKP/IUPTLS/IUJPTL',
        'ALAMAT',
        'JUMLAH PEMBANGKIT',
    ]
    const dataTable = datas.map(({ id, name, created_at, address }) => ({
        id, name, created_at, address, description: '-',
    }))
    return (
        <AuthenticatedLayout>
            <Head title="Laporan Usaha Penyediaan Tenaga Listrik Untuk Kepentingan Sendiri Sampai Dengan 500 kW" />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Filter</p>
                    </div>
                    <div className="row d-flex justify-content-center align-items-center ">
                        <div className="col-3">
                            <SelectCity handleCityChange={handleCityChange} selectedCity={cityCode} />
                        </div>
                        <div className="col-3">
                            <SelectDistrict handleDistrictChange={handleDistrictChange} selectedCityId={cityCode} selectedDistrict={districtCode} />
                        </div>
                        <div className="col-3">
                            <SelectVillage handleVillageChange={handleVillageChange} selectedDistrictId={districtCode} selectedVillage={villageCode} />
                        </div>
                        <div className="col-3">
                            <button className="btn btn-primary" onClick={handleSearch}>Cari</button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Laporan Usaha Penyediaan Tenaga Listrik Untuk Kepentingan Sendiri Sampai Dengan 500 kW</p>
                        <button className="btn btn-warning btn-icon-text" style={{ marginRight: '1rem' }} onClick={() => setIsShowImport(true)}>
                            Impor
                        </button>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                data={dataTable}
                                columns={column}
                                onDetail={(id) => router.visit(route('admin.business-report.show', { business_report: id }))}
                                onDelete={(id) => router.delete(route('admin.business-report.destroy', { business_report: id }))} />
                        </div>
                    </div>
                </div>
            </div>
            <ImportModal
                isShow={isShowImport}
                onClose={() => setIsShowImport(false)}
                overrideRoute="admin.import.business_report"
                overrideFileName="FormatImportBR.xlsx"
            />
        </AuthenticatedLayout >
    )
}
