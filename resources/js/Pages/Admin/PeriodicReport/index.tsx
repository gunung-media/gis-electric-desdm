import { DataTable, RenderDownloadBtn } from "@/common/components"
import { PeriodicReportType } from "@/features/PeriodicReport"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head, router } from "@inertiajs/react"

export default function Index({ datas }: PageProps & { datas: PeriodicReportType[] }) {
    const column: string[] = [
        'NAMA BADAN USAHA / PERORANGAN',
        'NOMOR DAN TANGGAL SKP/IUPTLS/IUJPTL',
        'ALAMAT',
        'JUMLAH PEMBANGKIT DAN KAPASITAS PEMBANGKIT(SKP / IUPTLS)',
        'DESKRIPSI'
    ]
    const dataTable = datas.map(({ id, name, created_at, address, description }) => ({
        id, name, created_at, address, description
    }))
    return (
        <AuthenticatedLayout>
            <Head title="Layanan Pembinaan dan Pengawasan (Laporan Berkala)" /> <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Layanan Pembinaan dan Pengawasan (Laporan Berkala)</p>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                data={dataTable}
                                columns={column}
                                onEdit={(id) => router.visit(route('admin.periodic-report.show', { id: id }))}
                                onDelete={(id) => router.delete(route('admin.periodic-report.destroy', { id: id }))} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
