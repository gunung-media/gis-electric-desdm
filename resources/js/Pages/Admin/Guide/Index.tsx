import { DataTable } from "@/common/components";
import { GuideType } from "@/features/Guide";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";

export default function Index({ guides }: PageProps & { guides: GuideType[] }) {
    const column: string[] = [
        'Id',
    ]
    const dataTable = guides.map(({ id, }) => ({
        id, test: "-"
    }))

    return (
        <AuthenticatedLayout>
            <Head title="Guide" />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Guide</p>
                        <a href={route('admin.guide.create')} type="button" className="btn btn-primary btn-icon-text">
                            <i className="ti-plus btn-icon-prepend"></i>
                            Tambah
                        </a>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                data={dataTable}
                                columns={column}
                                onEdit={(id) => router.visit(route('admin.guide.edit', { guide: id }))}
                                onDelete={(id) => router.delete(route('admin.guide.destroy', { guide: id }))} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
