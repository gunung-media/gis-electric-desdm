import { ProposalType, ProposalDTO } from '@/features/Proposal'
import { PageProps } from '@/types'
import CitizenVoicePage from '@/features/CitizenVoice/pages/Index';
import { InputType } from '@/common/components';
import { ReportType } from '@/features/Report';

export default function Index({ datas }: PageProps & { datas: (ProposalType | ReportType)[] }) {
    const additionalFields: InputType<ProposalDTO>[] = [
    ]
    return (
        <>
            <CitizenVoicePage
                datas={datas}
                isProposal
                title="Tracking"
                additionalFields={additionalFields}
                showAdd={false}
                showForm={false}
                showTrack
            />
        </>
    )
}
