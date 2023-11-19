import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { PropsWithChildren } from "react";
import useScript from "@/common/hooks/useScript";
import { Navbar, Footer, Sidebar } from "./partials";

export function AuthenticatedLayout({ children }: PropsWithChildren) {
    const { props: { assets } } = usePage<PageProps>()
    useScript(`${assets}/js/off-canvas.js`)
    useScript(`${assets}/js/hoverable-collapse.js`)
    useScript(`${assets}/js/template.js`)
    useScript(`${assets}/js/data-table.js`)
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
