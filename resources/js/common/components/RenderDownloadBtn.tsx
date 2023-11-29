import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { FC } from "react";

export const RenderDownloadBtn: FC<{
    documentPath?: string | null
}> = ({ documentPath }) => {
    const { props: { storageUrl } } = usePage<PageProps>()
    if (documentPath)
        return (
            <a href={`${storageUrl}/${documentPath}`} className="btn btn-primary" target="_blank"> Unduh</a>
        )
    return <p>-</p>
}
