import { InputError, Input, OptionalSelect } from "@/common/components";
import { TrackingDTO } from "@/common/dtos";
import { StatusEnum } from "@/common/enums";
import { enumToStringArray, swalError, swalSuccess } from "@/common/utils";
import { PeriodicReportTracking } from "@/features/PeriodicReport";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

export default function TrackingForm({ tracking }: PageProps & { tracking?: PeriodicReportTracking }) {
    const { errors } = usePage<PageProps>().props
    const { periodic_report } = route().params
    const { data: dto, setData, post, put } = useForm<TrackingDTO>()

    useEffect(() => {
        if (!tracking) return;
        const { status, description } = tracking
        setData(data => ({
            ...data,
            description,
            status
        }))
    }, [])

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        if (tracking) {
            put(route('admin.periodic-report.tracking.update', { periodic_report: periodic_report, tracking: tracking.id }), {
                onError: (e) => {
                    swalError(e.error)
                },
                onSuccess: () => {
                    swalSuccess('Sukses Mengupdate')
                }
            })
            return
        }
        post(route('admin.periodic-report.tracking.store', { periodic_report: periodic_report }), {
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
            <Head title="Usulan Tracking" />
            <div className="row">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Data</h4>
                            <InputError message={errors.error} />
                            <form className="forms-sample" onSubmit={handleSubmit}>
                                <Input title="Deskripsi" onChange={(e) => setData("description", e.target.value)} value={dto.description} />
                                <InputError message={errors.description} />
                                <OptionalSelect
                                    title='Status'
                                    defaultChoice={enumToStringArray(StatusEnum)}
                                    value={{ value: dto.status ?? null, label: dto.status ?? "Pilih Status" }}
                                    onSelected={(val) => setData('status', val as StatusEnum)}
                                />
                                <InputError message={errors.status} />
                                <button type="submit" className="btn btn-primary me-2">Submit</button>
                                <button type="button" className="btn btn-light" onClick={() => router.visit(route('admin.periodic-report.show', { periodic_report: periodic_report }))}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
