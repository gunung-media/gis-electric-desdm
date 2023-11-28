import { CommonTableInterface } from "@/common/interface/CommonTableInterface";

export interface TrackingInterface extends CommonTableInterface {
    id: number
    description: string
    status: 'Diterima' | 'Diproses' | 'Ditolak' | 'Diterima dengan catatan'
}
