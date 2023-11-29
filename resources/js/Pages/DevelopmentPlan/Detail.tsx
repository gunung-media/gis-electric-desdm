import { InputError, Input, OptionalSelect, FormGroup, RenderDownloadBtn } from "@/common/components";
import { enumToStringArray } from "@/common/utils";
import { DevelopmentPlanDTO, DevelopmentPlanStatusEnum, DevelopmentPlanType } from "@/features/DevelopmentPlan";
import { HorizontalLayout } from "@/layouts/HorizontalLayout";
import { PageProps } from "@/types";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function Detail({ developmentPlan }: PageProps & { developmentPlan?: DevelopmentPlanType }) {
    const { errors } = usePage<PageProps>().props
    const { data: dto, setData } = useForm<DevelopmentPlanDTO>()

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

    return (
        <HorizontalLayout>
            <Head title="Rencana Pembangunan Detail" />
            <div className="row">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Rencana Pembangunan Detail</h4>
                            <InputError message={errors.error} />
                            <form className="forms-sample">
                                <Input title="Judul Rencana" onChange={(e) => setData("title", e.target.value)} value={dto.title} disabled={true} />
                                <Input title="Deskripsi" onChange={(e) => setData("description", e.target.value)} value={dto.description} disabled={true} />
                                <OptionalSelect
                                    title='Status'
                                    defaultChoice={enumToStringArray(DevelopmentPlanStatusEnum)}
                                    value={{ value: dto.status ?? null, label: dto.status ?? "Pilih Status" }}
                                    onSelected={(val) => setData('status', val as DevelopmentPlanStatusEnum)}
                                    isDisabled={true}
                                />
                                <div className="form-group">
                                    <p>Dokumen</p>
                                    <RenderDownloadBtn documentPath={developmentPlan?.document_path} />
                                </div>
                                <button type="button" className="btn btn-danger" onClick={() => router.visit(route('development-plan.index'))}>Back</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </HorizontalLayout >
    )
}
