import { DataTable } from "@/common/components";
import { DevelopmentPlanType } from "@/features/DevelopmentPlan";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";

export default function Index({ developmentPlans }: PageProps & { developmentPlans: DevelopmentPlanType[] }) {
    const column: string[] = [
        'Judul Rencana Pembangunan',
        'Deskripsi Singkat',
        'Status',
        'File',
        'Tanggal Rencana Dibuat',
        'Tanggal Update',
    ]
    const dataTable = developmentPlans.map(({ id, title, description, status, document_path, created_at, updated_at }) => ({
        id, title, description, status, document_path, created_at, updated_at
    }))

    return (
        <AuthenticatedLayout>
            <Head title="Rencana Pembangunan" />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Rencana Pembangunan</p>
                        <a href={route('admin.development-plan.create')} type="button" className="btn btn-primary btn-icon-text">
                            <i className="ti-plus btn-icon-prepend"></i>
                            Tambah
                        </a>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                data={dataTable}
                                columns={column}
                                onEdit={(id) => router.visit(route('admin.development-plan.edit', { development_plan: id }))}
                                onDelete={(id) => router.delete(route('admin.development-plan.destroy', { development_plan: id }))} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
