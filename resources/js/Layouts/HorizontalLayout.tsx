import { PropsWithChildren } from "react";
import { NavbarHorizontal, Footer } from "./partials";
import { useScript } from "@/common/hooks";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

export function HorizontalLayout({ children }: PropsWithChildren) {
    const { props: { assets } } = usePage<PageProps>()
    useScript(`${assets}/js/off-canvas.js`)
    useScript(`${assets}/js/hoverable-collapse.js`)
    useScript(`${assets}/js/template.js`)
    useScript(`${assets}/js/data-table.js`)
    return (
        <>
            <NavbarHorizontal />
            <div className="container-fluid page-body-wrapper">
                <div className="main-panel">
                    <div className="content-wrapper">
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
