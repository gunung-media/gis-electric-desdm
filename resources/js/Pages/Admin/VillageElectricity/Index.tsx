import { DataTable } from "@/common/components";
import { VillageElectricityType } from "@/features/VillageElectricity";
import { ImportModal } from "@/features/VillageElectricity/components";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ villageElectricitys }: PageProps & { villageElectricitys: VillageElectricityType[] }) {
    const [isShowImport, setIsShowImport] = useState<boolean>(false)
    const column: string[] = [
        'Nama Desa/Kelurahan',
        'Kelistrikan',
        'Jumlah KK Berlistrik PLN',
        'Jumlah KK Berlistrik Non PLN',
        'Jumlah KK Tidak Berlistrik',
        'Panjang Jaringan',
        'Tanggal Update',
    ]

    const renderElectricity = (electricity: boolean) => {
        return electricity ? (
            <label className="badge badge-success">Berlistrik</label>
        ) : (
            <label className="badge badge-danger">Tidak berlistrik</label>
        )
    }
    const dataTable = villageElectricitys.map(({
        id,
        village,
        electricity,
        households_with_electricity,
        households_with_electricity_non_pln,
        households_without_electricity,
        network_length,
        updated_at
    }) => ({
        id,
        villageName: village?.name || 'Unknown Village',
        electricity: renderElectricity(electricity),
        households_with_electricity,
        households_with_electricity_non_pln,
        households_without_electricity,
        network_length,
        updated_at
    }))

    return (
        <AuthenticatedLayout>
            <Head title="Kelistrikan Desa" />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Kelistrikan Desa</p>
                        <div>
                            <button className="btn btn-warning btn-icon-text" style={{ marginRight: '1rem' }} onClick={() => setIsShowImport(true)}>
                                Impor
                            </button>
                            <a href={route('admin.village_electricity.create')} type="button" className="btn btn-primary btn-icon-text">
                                <i className="ti-plus btn-icon-prepend"></i>
                                Tambah
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                data={dataTable}
                                columns={column}
                                onEdit={(id) => router.visit(route('admin.village_electricity.edit', { village_electricity: id }))}
                                onDelete={(id) => router.delete(route('admin.village_electricity.destroy', { village_electricity: id }))} />
                        </div>
                    </div>
                </div>
            </div>
            <ImportModal isShow={isShowImport} onClose={() => setIsShowImport(false)} />
        </AuthenticatedLayout >
    )
}
