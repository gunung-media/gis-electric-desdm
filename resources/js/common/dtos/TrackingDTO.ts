import { StatusEnum } from '../enums'

export interface TrackingDTO {
    description: string
    status: StatusEnum
    file_path?: File
}
