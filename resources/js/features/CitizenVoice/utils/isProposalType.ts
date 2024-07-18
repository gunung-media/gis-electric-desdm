import { BpblProposalType } from "@/features/BpblProposal";
import { BusinessReportType } from "@/features/BusinessReport";
import { PeriodicReportType } from "@/features/PeriodicReport";
import { ProposalDTO, ProposalType } from "@/features/Proposal";
import { ReportDTO, ReportType } from "@/features/Report";

export function isProposalType(data: ProposalType | ReportType | BpblProposalType | BusinessReportType | PeriodicReportType | undefined): data is ProposalType {
    if (!data) return false
    return 'proposal_type' in data;
}

export function isProposalDTO(data: ProposalDTO | ReportDTO): data is ProposalDTO {
    return 'proposal_type' in data;
}
