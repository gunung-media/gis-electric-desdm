import { BpblProposalType, BpblProposalDTO } from '@/features/BpblProposal'
import { PageProps } from '@/types'
import CitizenVoicePage from '@/features/CitizenVoice/pages/Index';
import { DataTable, InputType } from '@/common/components';
import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Proposal({ datas }: PageProps & { datas: BpblProposalType[] }) {
    const additionalFields: InputType<BpblProposalDTO>[] = [
        { title: 'Alamat', name: 'address', type: 'text' },
        { title: 'Deskripsi Usulan', name: 'description', type: "textarea" },
        { title: 'Surat pernyataan siap menerima BPBL', name: 'statement_path', type: "file" },
        { title: 'KTP', name: 'ktp_path', type: "file" },
        { title: 'Foto Rumah', name: 'house_path', type: "file" },
        { title: 'Foto Jaringan Terdekat', name: 'nearest_path', type: "file" },
        { title: 'Surat Pernyataan Tidak Mampu/Usulan Dari Kepala Desa/Lurah', name: 'letter_path', type: "file" },
    ]

    const column: string[] = [
        'Tanggal Usulan',
        'Nama Desa/Kelurahan',
        'Nama Pengusul',
        'Identitas Pengusul',
        'Email Pengusul',
        'Nomor Telepon',
        'Alamat',
        'Deskripsi',
    ]
    const dataTable = datas.map(({ id, full_name, identity_number, email, phone_number, village: { name: villageName }, address, description, created_at }) => ({
        id, created_at, villageName, full_name, identity_number, email, phone_number, address, description,
    }))
    return (
        <>
            <Head title="Usulan BPBL" />
            <CitizenVoicePage
                datas={datas}
                title="Tambah Usulan BPBL (Bantuan Pasang Baru Listrik)"
                additionalFields={additionalFields}
                overrideRoute={route('member.bpbl-proposal.store')}
                isWithJenisLaporan={false}
                isWithPriority={false}
                overrideIndex={
                    <AuthenticatedLayout>
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title d-flex justify-content-between">
                                    <p>Usulan BPBL</p>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <DataTable
                                            data={dataTable}
                                            columns={column}
                                            onEdit={(id) => console.log(id)}
                                            onDelete={(id) => router.delete(route('member.bpbl-proposal.destroy', { bpbl_proposal: id }))} />
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
