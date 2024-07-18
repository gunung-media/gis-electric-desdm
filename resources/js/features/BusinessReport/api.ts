import axios, { AxiosResponse } from "axios";
import { BusinessReportType } from ".";

export const getProposalDetail = async (bpblProposalId: number): Promise<AxiosResponse<{ data: BusinessReportType }>> =>
    await axios.get(route('bpblProposal.show', { bpblProposal: bpblProposalId }))
