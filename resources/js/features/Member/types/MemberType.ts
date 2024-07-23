import { CommonTableInterface } from "@/common/interface";
import { VillageType } from "@/features/Territory";

export interface MemberType extends CommonTableInterface {
    nik: string
    name: string
    username: string
    phone: string
    address: string
    village: VillageType
}
