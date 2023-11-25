import { DataTable } from "@/common/components"
import { ElectricSubstationType } from "@/features/ElectricSubstation"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head, router } from "@inertiajs/react"

export default function Index({ datas }: PageProps & { datas: ElectricSubstationType[] }) {
    const column = ['Nama', 'Kabupaten', 'Kecamatan', 'Deskripsi']
    const dataTable = datas.map(({ id, name, city_name, district: { name: districtName }, description }) => ({
        id, name, city_name, districtName, description
    }))
    return (
        <AuthenticatedLayout>
            <Head title="Gardu Listrik" />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Gardu Listrik</p>
                        <a href={route('admin.gardu_listrik.create')} type="button" className="btn btn-primary btn-icon-text">
                            <i className="ti-plus btn-icon-prepend"></i>
                            Tambah
                        </a>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                data={dataTable}
                                columns={column}
                                onEdit={(id) => router.visit(route('admin.gardu_listrik.edit', { gardu_listrik: id }))}
                                onDelete={(id) => router.delete(route('admin.gardu_listrik.destroy', { gardu_listrik: id }))} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
