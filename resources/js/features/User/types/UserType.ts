import { CommonTableInterface } from "@/common/interface";

export interface UserType extends CommonTableInterface {
    name: string
    username: string
    role: string
}
