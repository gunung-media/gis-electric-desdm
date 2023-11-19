import { DataTable } from "@/common/components"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head } from "@inertiajs/react"
import { useEffect } from "react"

export default function Index({ datas }: PageProps & { datas: any }) {
    useEffect(() => {
        console.log(datas)
    }, [])
    return (
        <AuthenticatedLayout>
            <Head title="Gardu Listrik" />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Gardu Listrik</p>
                        <button type="button" className="btn btn-primary btn-icon-text">
                            <i className="ti-plus btn-icon-prepend"></i>
                            Tambah
                        </button>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable data={[
                                { name: "test" },
                            ]} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
