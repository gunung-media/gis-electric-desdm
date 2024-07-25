import { DataTable } from "@/common/components";
import { UserType } from "@/features/User";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";

export default function Index({ users }: PageProps & { users: UserType[] }) {
    const column: string[] = [
        'Nama',
        'Username',
        'Role',
    ]
    const dataTable = users.map(({ id, name, username, role }) => ({
        id, name, username, role
    }))

    return (
        <AuthenticatedLayout>
            <Head title="User" />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>User</p>
                        <a href={route('admin.admin.create')} type="button" className="btn btn-primary btn-icon-text">
                            <i className="ti-plus btn-icon-prepend"></i>
                            Tambah
                        </a>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                data={dataTable}
                                columns={column}
                                onEdit={(id) => router.visit(route('admin.admin.edit', { admin: id }))}
                                onDelete={(id) => router.delete(route('admin.admin.destroy', { admin: id }))} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
