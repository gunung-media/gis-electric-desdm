import { ProposalType, ProposalDTO } from '@/features/Proposal'
import { PageProps } from '@/types'
import CitizenVoicePage from '@/features/CitizenVoice/pages/Index';
import { InputType } from '@/common/components';

export default function Proposal({ datas }: PageProps & { datas: ProposalType[] }) {
    const additionalFields: InputType<ProposalDTO>[] = [
        { title: 'Alamat', name: 'address', type: 'text' },
        { title: 'Deskripsi Usulan', name: 'description', type: "textarea" },
        { title: 'Foto/Dokumen Pendukung', name: 'document_path', type: "file" },
        { title: 'Estimasi Biaya', name: 'estimated_cost', type: "number" },
        { title: 'Catatan Tambahan', name: 'additional_note', type: "textarea" },
        { title: 'Nomor Surat Usulan,', name: 'nomor_surat_usulan', type: "text" },
        { title: 'Perihal', name: 'perihal', type: "textarea" },
        { title: 'Tanggal Surat', name: 'tgl_surat', type: "date" },
    ]
    return (
        <>
            <CitizenVoicePage
                datas={datas}
                isProposal
                title="Usulan"
                additionalFields={additionalFields}
                firstInitShowModal={false}
            />
        </>
    )
}
