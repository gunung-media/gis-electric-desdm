import { DataTable } from "@/common/components";
import { VillageElectricityType } from "@/features/VillageElectricity";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";

export default function Index({ villageElectricitys }: PageProps & { villageElectricitys: VillageElectricityType[] }) {
    const column: string[] = [
        'Nama Desa/Kelurahan',
        'Kelistrikan',
        'Jumlah KK Berlistrik',
        'Jumlah KK Tidak Berlistrik',
        'Panjang Jaringan',
        'Potensial Desa',
        'Tanggal Update',
    ]
    const dataTable = villageElectricitys.map(({ id, village: { name: villageName }, electricity, households_with_electricity, households_without_electricity, network_length, village_potential, updated_at }) => ({
        id, villageName, electricity, households_with_electricity, households_without_electricity, network_length, village_potential, updated_at
    }))

    return (
        <AuthenticatedLayout>
            <Head title="Kelistrikan Desa" />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Kelistrikan Desa</p>
                        <a href={route('admin.development-plan.create')} type="button" className="btn btn-primary btn-icon-text">
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
