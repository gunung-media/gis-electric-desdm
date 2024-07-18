import { BusinessReportType, BusinessReportDTO } from '@/features/BusinessReport'
import { PageProps } from '@/types'
import CitizenVoicePage from '@/features/CitizenVoice/pages/Index';
import { InputType } from '@/common/components';

export default function Proposal({ datas }: PageProps & { datas: BusinessReportType[] }) {
    const additionalFields: InputType<BusinessReportDTO>[] = [
        { title: 'Alamat', name: 'address', type: 'text' },
        { title: 'Deskripsi Usulan', name: 'description', type: "textarea" },
        { title: 'Format Permohonan SKP dan Lampiran Persyaratan s.d 500 Kw', name: 'reuquest_path', type: "file" },
        { title: 'Identitas Pemohon (KTP)', name: 'ktp_path', type: "file" },
        { title: 'NIB', name: 'nib_path', type: "file" },
        { title: 'NPWP', name: 'npwp_path', type: "file" },
        { title: 'Diagram Satu Garis', name: 'diagram_path', type: "file" },
        { title: 'Lokasi instalasi termasuk tata letak (gambar situasi)', name: 'location_path', type: "file" },
        { title: 'Spesifikasi Teknis Pembangkit', name: 'specification_path', type: "file" },
        { title: 'Berita Acara Pemeriksaan (BAP)', name: 'bap_path', type: "file" },
    ]
    return (
        <>
            <CitizenVoicePage
                datas={datas}
                title="Laporan Usaha Penyediaan Tenaga Listrik Untuk Kepentingan Sendiri Sampai Dengan 500 kW"
                additionalFields={additionalFields}
                overrideRoute={route('business-report.store')}
            />
        </>
    )
}
