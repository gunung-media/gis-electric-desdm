import { DataTable, RenderDownloadBtn } from "@/common/components"
import { BpblProposalType } from "@/features/BpblProposal"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head, router } from "@inertiajs/react"

export default function Index({ datas }: PageProps & { datas: BpblProposalType[] }) {
    const column: string[] = [
        'Tanggal Usulan',
        'Nama Desa/Kelurahan',
        'Nama Pengusul',
        'Identitas Pengusul',
        'Email Pengusul',
        'Nomor Telepon',
        'Alamat',
        'Deskripsi',
    ]
    const dataTable = datas.map(({ id, full_name, identity_number, email, phone_number, village: { name: villageName }, address, description, created_at }) => ({
        id, created_at, villageName, full_name, identity_number, email, phone_number, address, description,
    }))
    return (
        <AuthenticatedLayout>
            <Head title="Usulan BPBL" />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Usulan BPBL</p>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                data={dataTable}
                                columns={column}
                                onEdit={(id) => router.visit(route('admin.bpbl-proposal.show', { proposal: id }))}
                                onDelete={(id) => router.delete(route('admin.bpbl-proposal.destroy', { proposal: id }))} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
