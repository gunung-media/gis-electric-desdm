import { InputError, Input, OptionalSelect, FormGroup } from "@/common/components";
import { enumToStringArray, swalError, swalSuccess } from "@/common/utils";
import { DevelopmentPlanDTO, DevelopmentPlanStatusEnum, DevelopmentPlanType } from "@/features/DevelopmentPlan";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler, useEffect } from "react";

export default function Form({ developmentPlan }: PageProps & { developmentPlan?: DevelopmentPlanType }) {
    const { errors } = usePage<PageProps>().props
    const { data: dto, setData, post } = useForm<DevelopmentPlanDTO>()

    useEffect(() => {
        if (!developmentPlan) return;
        const { status, description, title } = developmentPlan
        setData(data => ({
            ...data,
            title,
            description,
            status
        }))
    }, [])

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        if (developmentPlan) {
            router.post(route('admin.development-plan.update', { development_plan: developmentPlan.id }), {
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
        post(route('admin.development-plan.store'), {
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
            <Head title="Rencana Pembangunan Form" />
            <div className="row">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Rencana Pembangunan Form</h4>
                            <InputError message={errors.error} />
                            <form className="forms-sample" onSubmit={handleSubmit}>
                                <Input title="Judul Rencana" onChange={(e) => setData("title", e.target.value)} value={dto.title} />
                                <FormGroup
                                    title="Deskripsi"
                                    name="description"
                                    errorMsg={errors.description}
                                    value={dto.description}
                                    type="textarea"
                                    onChange={(e) => setData('description', e as string)}
                                />
                                <InputError message={errors.description} />
                                <OptionalSelect
                                    title='Status'
                                    defaultChoice={enumToStringArray(DevelopmentPlanStatusEnum)}
                                    value={{ value: dto.status ?? null, label: dto.status ?? "Pilih Status" }}
                                    onSelected={(val) => setData('status', val as DevelopmentPlanStatusEnum)}
                                />
                                <InputError message={errors.status} />
                                <FormGroup
                                    title="Dokumen"
                                    name="document_path"
                                    errorMsg={errors.document_path}
                                    type="file"
                                    onChange={(e) => setData('document_path', (e as ChangeEvent<HTMLInputElement>).target.files![0])}
                                />
                                <button type="submit" className="btn btn-primary me-2">Submit</button>
                                <button type="button" className="btn btn-light" onClick={() => router.visit(route('admin.development-plan.index'))}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
