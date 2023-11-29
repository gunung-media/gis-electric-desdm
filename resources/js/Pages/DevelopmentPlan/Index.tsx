import { DataTable } from "@/common/components";
import { DevelopmentPlanType } from "@/features/DevelopmentPlan";
import { HorizontalLayout } from "@/layouts/HorizontalLayout";
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
        <HorizontalLayout>
            <Head title="Rencana Pembangunan" />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Rencana Pembangunan</p>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                data={dataTable}
                                columns={column}
                                onEdit={(id) => router.visit(route('development-plan.show', { development_plan: id }))}
                                onDelete={() => console.log('')}
                                isForLanding={true} />
                        </div>
                    </div>
                </div>
            </div>
        </HorizontalLayout>
    )
}
