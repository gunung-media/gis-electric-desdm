import { CommonTableInterface } from "@/common/interface";
import { DevelopmentPlanStatusEnum } from "../enums";

export interface DevelopmentPlanType extends CommonTableInterface {
    title: string
    description: string
    status: DevelopmentPlanStatusEnum
    document_path: string
}
