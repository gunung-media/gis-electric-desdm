import { CommonTableInterface } from "@/common/interface";

export interface GuideType extends CommonTableInterface {
    sambutan_kadis?: string | null;
    file?: string | null;
    url_video?: string | null;
    description?: string | null;
    no_wa?: string | null;
}
