import axios, { AxiosResponse } from "axios";
import { PeriodicReportType } from ".";

export const getProposalDetail = async (bpblProposalId: number): Promise<AxiosResponse<{ data: PeriodicReportType }>> =>
    await axios.get(route('bpblProposal.show', { bpblProposal: bpblProposalId }))
