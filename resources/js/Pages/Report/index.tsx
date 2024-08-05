import { ReportType, ReportDTO } from '@/features/Report'
import { PageProps } from '@/types'
import CitizenVoicePage from '@/features/CitizenVoice/pages/Index';
import { InputType } from '@/common/components';

export default function Report({ datas }: PageProps & { datas: ReportType[] }) {
    const additionalFields: InputType<ReportDTO>[] = [
        { title: 'Alamat', name: 'address', type: 'text' },
        { title: 'Waktu Kejadian', name: 'date_happen', type: "datetime-local" },
        { title: 'Deskripsi Laporan', name: 'description', type: "textarea" },
        { title: 'Foto/Dokumen Pendukung', name: 'document_path', type: "file" },
    ]
    return (
        <>
            <CitizenVoicePage
                datas={datas}
                title="Laporan"
                additionalFields={additionalFields}
                firstInitShowModal={false}
            />
        </>
    )
}
