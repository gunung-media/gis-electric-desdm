import { BpblProposalType, BpblProposalDTO } from '@/features/BpblProposal'
import { PageProps } from '@/types'
import CitizenVoicePage from '@/features/CitizenVoice/pages/Index';
import { DataTable, InputType } from '@/common/components';
import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';

export default function Proposal({ datas }: PageProps & { datas: BpblProposalType[] }) {
    const { assets } = usePage<PageProps>().props
    const additionalFields: InputType<BpblProposalDTO>[] = [
        { title: 'Alamat', name: 'address', type: 'text' },
        { title: 'Deskripsi Usulan', name: 'description', type: "textarea" },
        { title: 'Surat pernyataan siap menerima BPBL', name: 'statement_path', type: "file", templateUrl: `${assets}/Bpbl_Format_Pernyataan.pdf` },
        { title: 'KTP', name: 'ktp_path', type: "file" },
        { title: 'Foto Rumah', name: 'house_path', type: "file" },
        { title: 'Foto Jaringan Terdekat', name: 'nearest_path', type: "file" },
        { title: 'Surat Pernyataan Tidak Mampu/Usulan Dari Kepala Desa/Lurah', name: 'letter_path', type: "file", templateUrl: `${assets}/Bpbl_Format_Pernyataan_Kades.pdf` },
    ]

    const column: string[] = [
        'NAMA',
        'NIK',
        'ALAMAT',
        'TANGGAL',
        'STATUS',
    ]
    const dataTable = datas.map(({ id, full_name, identity_number, address, latest_status, created_at }) => ({
        id, full_name, identity_number, address, created_at, latest_status,
    }))
    return (
        <>
            <Head title="Usulan BPBL" />
            <CitizenVoicePage
                datas={datas}
                title="Usulan BPBL (Bantuan Pasang Baru Listrik)"
                additionalFields={additionalFields}
                overrideRoute={route('member.bpbl-proposal.store')}
                isWithJenisLaporan={false}
                isWithPriority={false}
                firstInitShowModal={false}
                overrideIndex={
                    <div className="col-12">
                        <DataTable
                            data={dataTable}
                            columns={column}
                            onEdit={(id) => router.visit(route('member.bpbl-proposal.show', { bpbl_proposal: id }))}
                            onDelete={(id) => router.delete(route('member.bpbl-proposal.destroy', { bpbl_proposal: id }))} />
                    </div>
                }
                isShowContactUs={false}
            />
        </>
    )
}
