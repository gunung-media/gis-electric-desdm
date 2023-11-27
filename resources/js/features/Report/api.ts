import axios, { AxiosResponse } from "axios";
import { ReportType } from ".";

export const getReportDetail = async (reportId: number): Promise<AxiosResponse<{ data: ReportType }>> => await axios.get(route('report.show', { report: reportId }))
