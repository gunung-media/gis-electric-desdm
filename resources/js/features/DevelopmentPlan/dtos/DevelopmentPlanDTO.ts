import { DevelopmentPlanStatusEnum } from "../enums"

export interface DevelopmentPlanDTO {
    title: string
    description: string
    status: DevelopmentPlanStatusEnum
    document_path: File
}
