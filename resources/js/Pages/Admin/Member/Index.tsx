import { DataTable } from "@/common/components";
import { MemberType } from "@/features/Member";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";

export default function Index({ members }: PageProps & { members: MemberType[] }) {
    const column: string[] = [
        'NIK',
        'Nama',
        'Username',
        'Alamat',
        'Nama Desa',
    ]
    const dataTable = members.map(({ id, nik, name, username, created_at, address, village: { name: villageName } }) => ({
        id, nik, name, username, address, villageName
    }))

    return (
        <AuthenticatedLayout>
            <Head title="Member" />
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Member</p>
                        <a href={route('admin.users.create')} type="button" className="btn btn-primary btn-icon-text">
                            <i className="ti-plus btn-icon-prepend"></i>
                            Tambah
                        </a>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                data={dataTable}
                                columns={column}
                                onEdit={(id) => router.visit(route('admin.users.edit', { user: id }))}
                                onDelete={(id) => router.delete(route('admin.users.destroy', { user: id }))} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
