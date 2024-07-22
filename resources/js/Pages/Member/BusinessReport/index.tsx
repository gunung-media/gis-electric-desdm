import { BusinessReportType, BusinessReportDTO } from '@/features/BusinessReport'
import { PageProps } from '@/types'
import CitizenVoicePage from '@/features/CitizenVoice/pages/Index';
import { DataTable, InputType } from '@/common/components';
import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';

export default function Proposal({ datas }: PageProps & { datas: BusinessReportType[] }) {
    const identityFields: InputType<BusinessReportDTO>[] = [
        { title: 'Nama Badan Usaha/Pengusul', name: 'name', type: "text" },
        { title: 'NIB (Nomor Induk Berusaha)', name: 'nib', type: "text" },
        { title: 'NPWP (Nomor Pokok Wajib Pajak)', name: 'npwp', type: "text" },
        { title: 'Email', name: 'email', type: 'email' },
        { title: 'Nomor Telepon', name: 'phone_number', type: 'number' },

    ]
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

    const column: string[] = [
        'NAMA BADAN USAHA / PERORANGAN',
        'NOMOR DAN TANGGAL SKP/IUPTLS/IUJPTL',
        'ALAMAT',
        'JUMLAH PEMBANGKIT DAN KAPASITAS PEMBANGKIT(SKP / IUPTLS)',
    ]
    const dataTable = datas.map(({ id, name, created_at, address }) => ({
        id, name, created_at, address,
    }))
    return (
        <>
            <CitizenVoicePage
                datas={datas}
                title="Laporan Usaha Penyediaan Tenaga Listrik Untuk Kepentingan Sendiri Sampai Dengan 500 kW"
                overrideIdentityProposal={identityFields}
                additionalFields={additionalFields}
                overrideRoute={route('member.business-report.store')}
                isWithJenisLaporan={false}
                isWithPriority={false}
                overrideIndex={
                    <AuthenticatedLayout>
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title d-flex justify-content-between">
                                    <p>Info Ketenagalistrikan Provinsi Kalimantan Tengah
                                        Layanan Pembinaan dan Pengawasan (Laporan Berkala)</p>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <DataTable
                                            data={dataTable}
                                            columns={column}
                                            onEdit={(id) => console.log(id)}
                                            onDelete={(id) => router.delete(route('member.business-report.destroy', { business_report: id }))} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AuthenticatedLayout >
                }
                isShowContactUs={false}
            />
        </>
    )
}
