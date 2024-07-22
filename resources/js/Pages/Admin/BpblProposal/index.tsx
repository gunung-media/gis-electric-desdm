import { DataTable } from "@/common/components"
import { BpblProposalType } from "@/features/BpblProposal"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head, router } from "@inertiajs/react"

export default function Index({ datas }: PageProps & { datas: BpblProposalType[] }) {
    const column: string[] = [
        'NAMA',
        'NIK',
        'ALAMAT',
        'TANGGAL',
        'STATUS',
    ]
    const dataTable = datas.map(({ id, full_name, identity_number, email, phone_number, village: { name: villageName }, address, description, created_at }) => ({
        id, full_name, identity_number, address, created_at, description,
    }))
    return (
        <AuthenticatedLayout>
            <Head title="Usulan BPBL (Bantuan Pasang Baru Listrik)" />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Usulan BPBL (Bantuan Pasang Baru Listrik)</p>
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
