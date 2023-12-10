import { ProposalDTO, ProposalType } from "@/features/Proposal";
import { ReportDTO, ReportType } from "@/features/Report";

export function isProposalType(data: ProposalType | ReportType | undefined): data is ProposalType {
    if (!data) return false
    return 'proposal_type' in data;
}

export function isProposalDTO(data: ProposalDTO | ReportDTO): data is ProposalDTO {
    return 'proposal_type' in data;
}
