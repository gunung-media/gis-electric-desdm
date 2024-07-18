import { PeriodicReportType, PeriodicReportDTO } from '@/features/PeriodicReport'
import { PageProps } from '@/types'
import CitizenVoicePage from '@/features/CitizenVoice/pages/Index';
import { InputType } from '@/common/components';

export default function Proposal({ datas }: PageProps & { datas: PeriodicReportType[] }) {
    const additionalFields: InputType<PeriodicReportDTO>[] = [
        { title: 'Alamat', name: 'address', type: 'text' },
        { title: 'Deskripsi Usulan', name: 'description', type: "textarea" },
        { title: 'SK IUPTLS/IUPTLU/IUJPTL', name: 'sk_path', type: "file" },
        { title: 'Sertifikat Kompetensi Ketenaga Listrikan', name: 'certificate_path', type: "file" },
        { title: 'Dokumentasi Kondisi Pembangkit', name: 'condition_path', type: "file" },
        { title: 'Laporan Berkala (IUPTLS/IUPTLU/IUJPTL)', name: 'periodic_path', type: "file" },
    ]
    return (
        <>
            <CitizenVoicePage
                datas={datas}
                title="Layanan Pembinaan dan Pengawasan (Laporan Berkala)"
                additionalFields={additionalFields}
                overrideRoute={route('periodic-report.store')}
            />
        </>
    )
}
