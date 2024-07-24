import { PeriodicReportType, PeriodicReportDTO } from '@/features/PeriodicReport'
import { PageProps } from '@/types'
import CitizenVoicePage from '@/features/CitizenVoice/pages/Index';
import { DataTable, InputType } from '@/common/components';
import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';

export default function Proposal({ datas }: PageProps & { datas: PeriodicReportType[] }) {
    const identityFields: InputType<PeriodicReportDTO>[] = [
        { title: 'Nama Badan Usaha/Pengusul', name: 'name', type: "text" },
        { title: 'Jenis Usaha', name: 'type', type: "text" },
        { title: 'NIB (Nomor Induk Berusaha)', name: 'nib', type: "text" },
        { title: 'NPWP (Nomor Pokok Wajib Pajak)', name: 'npwp', type: "text" },
        { title: 'Nomor Perizinan', name: 'permit_number', type: "text" },
        { title: 'Email', name: 'email', type: 'email' },
        { title: 'Nomor Handphone/WA', name: 'phone_number', type: 'number' },
    ]

    const additionalFields: InputType<PeriodicReportDTO>[] = [
        { title: 'Alamat', name: 'address', type: 'text' },
        { title: 'Deskripsi Usulan', name: 'description', type: "textarea" },
        { title: 'Jenis Laporan', name: 'report_type', type: "text", isSelect: true, selectOptions: ['IUPTLS', 'IUPTLU', 'IUJPTL'] },
        { title: 'SK IUPTLS/IUPTLU/IUJPTL/SKP', name: 'sk_path', type: "file", infoText: "File Surat Keputusan IUPTLS/IUPTLU/IUJPTL    " },
        {
            title: 'Sertifikat Kompetensi Ketenaga Listrikan', name: 'certificate_path', type: "file", templateUrl: 'https://pii.or.id/uploads/dummies.pdf',
            dependedOnKey: 'report_type', dependedValue: ['IUPTLS', 'IUPTLU']
        },
        {
            title: 'Dokumentasi Kondisi Pembangkit', name: 'condition_path', type: "file", templateUrl: 'https://pii.or.id/uploads/dummies.pdf',
            dependedOnKey: 'report_type', dependedValue: ['IUPTLS', 'IUPTLU']
        },
        { title: 'Laporan Berkala (IUPTLS/IUPTLU/IUJPTL)', name: 'periodic_path', type: "file", templateUrl: 'https://pii.or.id/uploads/dummies.pdf' },
    ]

    const column: string[] = [
        'NAMA BADAN USAHA / PERORANGAN',
        'NOMOR DAN TANGGAL SKP/IUPTLS/IUJPTL',
        'ALAMAT',
        'JUMLAH PEMBANGKIT DAN KAPASITAS PEMBANGKIT(SKP / IUPTLS)',
        'DESKRIPSI'
    ]
    const dataTable = datas.map(({ id, name, created_at, address, description }) => ({
        id, name, created_at, address, etc: '-', description
    }))
    return (
        <>
            <CitizenVoicePage
                datas={datas}
                title="Layanan Pembinaan dan Pengawasan (Laporan Berkala)"
                overrideIdentityProposal={identityFields}
                additionalFields={additionalFields}
                overrideRoute={route('member.periodic-report.store')}
                isWithPriority={false}
                isWithJenisLaporan={false}
                overrideIndex={
                    <AuthenticatedLayout>
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title d-flex justify-content-between">
                                    <p>Layanan Pembinaan dan Pengawasan (Laporan Berkala)</p>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <DataTable
                                            data={dataTable}
                                            columns={column}
                                            onEdit={(id) => router.visit(route('member.periodic-report.show', { id: id }))}
                                            onDelete={(id) => router.delete(route('member.periodic-report.destroy', { id: id }))} />
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
