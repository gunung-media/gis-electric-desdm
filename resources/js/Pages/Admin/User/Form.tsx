import { InputError, Input, OptionalSelect, FormGroup, OptionType } from "@/common/components";
import { swalError, swalSuccess } from "@/common/utils";
import { UserDTO, UserType } from "@/features/User";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";

export default function Form({ user }: PageProps & { user?: UserType }) {
    const { errors } = usePage<PageProps>().props
    const { data: dto, setData, post } = useForm<UserDTO>()

    useEffect(() => {
        if (!user) return;
        const {
            name, role, username } = user
        setData(data => ({
            ...data,
            name,
            role,
            username
        }))
    }, [user])

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        if (user) {
            router.post(route('admin.admin.update', { admin: user.id }), {
                _method: 'put',
                ...dto
            }, {
                onError: (e) => {
                    swalError(e.error)
                },
                onSuccess: () => {
                    swalSuccess('Sukses Mengupdate')
                }
            })
            return
        }
        post(route('admin.admin.store'), {
            onError: (e) => {
                swalError(e.error)
            },
            onSuccess: () => {
                swalSuccess('Sukses Menambah')
            }
        })
    }

    return (
        <AuthenticatedLayout>
            <Head title="User Form" />
            <div className="row">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">User Form</h4>
                            <InputError message={errors.error} />
                            <form className="forms-sample" onSubmit={handleSubmit}>
                                <FormGroup
                                    title="Nama"
                                    name="name"
                                    errorMsg={errors.name}
                                    value={dto.name}
                                    onChange={(e) => setData('name', (e as any).target.value)}
                                />

                                <FormGroup
                                    title="Username"
                                    name="username"
                                    errorMsg={errors.username}
                                    value={dto.username}
                                    onChange={(e) => setData('username', (e as any).target.value)}
                                />
                                <FormGroup
                                    title="Password"
                                    name="password"
                                    errorMsg={errors.password}
                                    value={dto.password}
                                    onChange={(e) => setData('password', (e as any).target.value)}
                                    type="password"
                                />

                                <button type="submit" className="btn btn-primary me-2">Submit</button>
                                <button type="button" className="btn btn-light" onClick={() => router.visit(route('admin.admin.index'))}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
