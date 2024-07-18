import axios, { AxiosResponse } from "axios";
import { BpblProposalType } from ".";

export const getProposalDetail = async (bpblProposalId: number): Promise<AxiosResponse<{ data: BpblProposalType }>> =>
    await axios.get(route('bpblProposal.show', { bpblProposal: bpblProposalId }))
