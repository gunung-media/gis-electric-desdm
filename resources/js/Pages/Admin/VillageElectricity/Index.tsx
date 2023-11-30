import { DataTable } from "@/common/components";
import { VillageElectricityType } from "@/features/VillageElectricity";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";

export default function Index({ villageElectricitys }: PageProps & { villageElectricitys: VillageElectricityType[] }) {
    const column: string[] = [
        'Nama Desa/Kelurahan',
        'Kelistrikan',
        'Jumlah KK Berlistrik PLN',
        'Jumlah KK Berlistrik Non PLN',
        'Jumlah KK Tidak Berlistrik',
        'Panjang Jaringan',
        'Potensial Desa',
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
        village_potential,
        updated_at
    }) => ({
        id,
        villageName: village?.name || 'Unknown Village',
        electricity: renderElectricity(electricity),
        households_with_electricity,
        households_with_electricity_non_pln,
        households_without_electricity,
        network_length,
        village_potential: village_potential ?? '-',
        updated_at
    }))

    return (
        <AuthenticatedLayout>
            <Head title="Kelistrikan Desa" />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Kelistrikan Desa</p>
                        <a href={route('admin.village_electricity.create')} type="button" className="btn btn-primary btn-icon-text">
                            <i className="ti-plus btn-icon-prepend"></i>
                            Tambah
                        </a>
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
        </AuthenticatedLayout >
    )
}
