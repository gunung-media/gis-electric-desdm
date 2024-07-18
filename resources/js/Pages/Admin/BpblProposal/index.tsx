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
        'Statement',
    ]
    const dataTable = datas.map(({ id, full_name, identity_number, email, phone_number, village: { name: villageName }, address, description, statement_path, ktp_path, house_path, nearest_path, letter_path, created_at }) => ({
        id, created_at, villageName, full_name, identity_number, email, phone_number, address, description, statement_path: (<RenderDownloadBtn documentPath={statement_path} />),
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
                                onEdit={(id) => router.visit(route('admin.bpbl-proposal.show', { proposal: id }))}
                                onDelete={(id) => router.delete(route('admin.bpbl-proposal.destroy', { proposal: id }))} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
