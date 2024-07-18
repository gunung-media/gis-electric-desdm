import { BpblProposalType, BpblProposalDTO } from '@/features/BpblProposal'
import { PageProps } from '@/types'
import CitizenVoicePage from '@/features/CitizenVoice/pages/Index';
import { InputType } from '@/common/components';

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
    return (
        <>
            <CitizenVoicePage
                datas={datas}
                title="Tambah Usulan BPBL (Bantuan Pasang Baru Listrik)"
                additionalFields={additionalFields}
                overrideRoute={route('bpblProposal.store')}
            />
        </>
    )
}
