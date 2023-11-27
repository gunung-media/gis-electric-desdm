import axios, { AxiosResponse } from "axios";
import { ProposalType } from ".";

export const getProposalDetail = async (proposalId: number): Promise<AxiosResponse<{ data: ProposalType }>> => await axios.get(route('proposal.show', { proposal: proposalId }))
