import { DataTable } from "@/common/components"
import { ElectricSubstationType } from "@/features/ElectricSubstation"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head } from "@inertiajs/react"
import { useState } from "react"

export default function Index({ datas }: PageProps & { datas: ElectricSubstationType[] }) {
    const [dataTable] = useState<Object[]>(datas.map((val) => ({
        "Nama": val.name,
        "Kabupaten/Kota": val.city_name,
        "Kecamatan": val.district.name,
        "Deskripsi": val.description ?? '-',
    })))
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
                            <DataTable data={dataTable} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
