import { DataTable, OptionType } from "@/common/components"
import { BpblProposalType } from "@/features/BpblProposal"
import { CityType, DistrictType, SelectCity, SelectDistrict, SelectVillage, VillageType } from "@/features/Territory"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head, router, usePage } from "@inertiajs/react"
import { useEffect, useState } from "react"

export default function Index({ datas }: PageProps & { datas: BpblProposalType[] }) {
    const [cityCode, setCityCode] = useState<string | number>()
    const [districtCode, setDistrictCode] = useState<string | number>()
    const [villageCode, setVillageCode] = useState<string | number>()
    const { url } = usePage();

    useEffect(() => {
        setCityCode(new URL(window.location.origin + url).searchParams.get('city_code') ?? undefined);
        setDistrictCode(new URL(window.location.origin + url).searchParams.get('district_code') ?? undefined)
        setVillageCode(new URL(window.location.origin + url).searchParams.get('village_code') ?? undefined);
    }, []);

    const column: string[] = [
        'NAMA',
        'NIK',
        'ALAMAT',
        'TANGGAL',
        'STATUS',
    ]

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
        router.get(route('admin.bpbl-proposal.index'), {
            city_code: cityCode,
            district_code: districtCode,
            village_code: villageCode
        })
    }

    const dataTable = datas.map(({ id, full_name, identity_number, latest_status, address, created_at }) => ({
        id, full_name, identity_number, address, created_at, latest_status,
    }))

    return (
        <AuthenticatedLayout>
            <Head title="Usulan BPBL (Bantuan Pasang Baru Listrik)" />
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
                        <p>Usulan BPBL (Bantuan Pasang Baru Listrik)</p>
                        <a href={route('admin.bpbl-proposal.create')} type="button" className="btn btn-primary btn-icon-text">
                            <i className="ti-plus btn-icon-prepend"></i>
                            Tambah
                        </a>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                data={dataTable}
                                columns={column}
                                onEdit={(id) => router.visit(route('admin.bpbl-proposal.show', { bpbl_proposal: id }))}
                                onDetail={(id) => router.visit(route('admin.bpbl-proposal.show', { bpbl_proposal: id, isDetail: 1 }))}
                                onDelete={(id) => router.delete(route('admin.bpbl-proposal.destroy', { bpbl_proposal: id }))} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
