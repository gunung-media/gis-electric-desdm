import axios, { AxiosResponse } from "axios";
import { GuideType } from ".";

export const getGuide = async (): Promise<AxiosResponse<{ data: GuideType }>> => await axios.get(route('api.guide'))
