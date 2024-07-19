import { FormGroup, InputError, RenderDownloadBtn } from "@/common/components";
import { dateFormat, swalError, swalSuccess } from "@/common/utils";
import { GuideType } from "@/features/Guide";
import { GuideDTO } from "@/features/Guide/dtos/GuideDTO";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, FormEventHandler, ChangeEvent, useState } from "react";

export default function Index({ data }: PageProps & { data: GuideType }) {
    const { errors } = usePage<PageProps>().props
    const { data: dto, setData } = useForm<GuideDTO>()
    const [prevFileUrl, setPrevFileUrl] = useState<string | null>()

    useEffect(() => {
        const { file, ...other } = data
        setPrevFileUrl(file)
        console.log(file)
        setData(_ => ({
            ...other,
        }))
    }, [data])

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        router.post(route('admin.guide.update', { guide: data.id }), {
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
    }

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Setting" />
                <div className="row">
                    <div className="col-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Rencana Pembangunan Form</h4>
                                <p>Last update: {dateFormat(data.updated_at ?? "")}</p>
                                <InputError message={errors.error} />
                                <form className="forms-sample" onSubmit={handleSubmit}>
                                    <InputError message={errors.status} />
                                    <FormGroup
                                        title="Sambutan Kadis"
                                        name="sambutan_kadis"
                                        errorMsg={errors.sambutan_kadis}
                                        type="textarea"
                                        onChange={(e) => setData('sambutan_kadis', e as string)}
                                        value={dto.sambutan_kadis ?? ''}
                                    />
                                    <FormGroup
                                        title="File"
                                        name="file"
                                        errorMsg={errors.file}
                                        type="file"
                                        onChange={(e) => setData('file', (e as ChangeEvent<HTMLInputElement>).target.files![0])}
                                    />
                                    {prevFileUrl && (
                                        <RenderDownloadBtn documentPath={prevFileUrl} />
                                    )}
                                    <FormGroup
                                        title="Video URL"
                                        name="url_video"
                                        errorMsg={errors.url_video}
                                        type="text"
                                        onChange={(e) => setData('url_video', (e as ChangeEvent<HTMLInputElement>).target.value)}
                                        value={dto.url_video ?? ''}
                                    />
                                    <FormGroup
                                        title="Deskripsi"
                                        name="description"
                                        errorMsg={errors.description}
                                        type="textarea"
                                        onChange={(e) => setData('description', e as string)}
                                        value={dto.description ?? ''}
                                    />
                                    <FormGroup
                                        title="NO WA"
                                        name="no_wa"
                                        errorMsg={errors.no_wa}
                                        type="number"
                                        onChange={(e) => setData('no_wa', (e as ChangeEvent<HTMLInputElement>).target.value)}
                                        value={dto.no_wa ?? ''}
                                    />
                                    <button type="submit" className="btn btn-primary me-2">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    )
}
