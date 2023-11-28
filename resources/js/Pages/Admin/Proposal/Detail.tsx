import { DataTable } from "@/common/components"
import { ProposalType } from "@/features/Proposal"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head, router } from "@inertiajs/react"

export default function Detail({ data }: PageProps & { datas: ProposalType }) {
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
