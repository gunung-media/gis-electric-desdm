import { DataTable, RenderDownloadBtn } from "@/common/components"
import { BusinessReportType } from "@/features/BusinessReport"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head, router } from "@inertiajs/react"

export default function Index({ datas }: PageProps & { datas: BusinessReportType[] }) {
    const column: string[] = [
        'NAMA BADAN USAHA / PERORANGAN',
        'NOMOR DAN TANGGAL SKP/IUPTLS/IUJPTL',
        'ALAMAT',
        'JUMLAH PEMBANGKIT DAN KAPASITAS PEMBANGKIT(SKP / IUPTLS)',
    ]
    const dataTable = datas.map(({ id, name, created_at, address }) => ({
        id, name, created_at, address,
    }))
    return (
        <AuthenticatedLayout>
            <Head title="Info Ketenaga Listrikan Provinsi Kalimantan Tengah
Layanan Pembinaan dan Pengawasan (Laporan Berkala)" />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Info Ketenaga Listrikan Provinsi Kalimantan Tengah
                            Layanan Pembinaan dan Pengawasan (Laporan Berkala)</p>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                data={dataTable}
                                columns={column}
                                onEdit={(id) => router.visit(route('admin.business-report.show', { id: id }))}
                                onDelete={(id) => router.delete(route('admin.business-report.destroy', { id: id }))} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
