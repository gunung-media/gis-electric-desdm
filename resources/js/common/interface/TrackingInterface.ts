import { CommonTableInterface } from "@/common/interface/CommonTableInterface";
import { StatusEnum } from "../enums";

export interface TrackingInterface extends CommonTableInterface {
    id: number
    description: string
    status: StatusEnum
}
