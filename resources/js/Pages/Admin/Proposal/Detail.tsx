import { DataTable, FormGroup } from "@/common/components"
import { ProposalType } from "@/features/Proposal"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head, router } from "@inertiajs/react"

export default function Detail({ data }: PageProps & { data: ProposalType }) {
    const column: string[] = [
        'Deskripsi',
        'Status',
        'Tanggal',
    ]
    const dataTable = data.trackings.map(({ id, description, status, created_at }) => ({
        id, description, status, created_at
    }))
    return (
        <AuthenticatedLayout>
            <Head title="Usulan" />
            <div className="card mb-3">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Usulan</p>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <FormGroup
                                title="Jenis Usulan"
                                name="proposal_type"
                                value={data.proposal_type}
                                disabled={true}
                            />
                            <FormGroup
                                title="Nama Pelapor"
                                name="proposal_type"
                                value={data.full_name}
                                disabled={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Tracking</p>
                        <a
                            href={route('admin.proposal.tracking.create', { proposalId: data.id })}
                            type="button"
                            className="btn btn-primary btn-icon-text"
                        >
                            <i className="ti-plus btn-icon-prepend"></i>
                            Tambah
                        </a>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                data={dataTable}
                                columns={column}
                                onEdit={(id) => router.visit(route('admin.proposal.tracking.edit', { proposalId: data.id, tracking: id }))}
                                onDelete={(id) => router.delete(route('admin.proposal.tracking.destroy', { proposalId: data.id, tracking: id }))} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
