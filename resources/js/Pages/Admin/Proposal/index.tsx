import { DataTable } from "@/common/components"
import { ProposalType } from "@/features/Proposal"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head, router } from "@inertiajs/react"

export default function Index({ datas }: PageProps & { datas: ProposalType[] }) {
    const column: string[] = [
        'Jenis Usulan',
        'Prioritas',
        'Nama Desa/Kelurahan',
        'Nama Pengusul',
        'Identitas Pengusul',
        'Email Pengusul',
        'Nomor Telepon',
        'Alamat',
        'Deskripsi',
        'Dokumen',
        'Tanggal Usulan',
    ]
    const dataTable = datas.map(({ id, proposal_type, full_name, identity_number, email, phone_number, village: { name: villageName }, address, description, document_path, priority, created_at }) => ({
        id, proposal_type, priority, villageName, full_name, identity_number, email, phone_number, address, description, document_path, created_at
    }))
    return (
        <AuthenticatedLayout>
            <Head title="Usulan" />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Usulan</p>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                data={dataTable}
                                columns={column}
                                onEdit={(id) => router.visit(route('admin.proposoal.show', { proposal: id }))}
                                onDelete={(id) => router.delete(route('admin.proposal.destroy', { proposal: id }))} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
