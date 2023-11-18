import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Navbar } from "@/Containers/Navbar";
import Footer from "@/Containers/Footer";
import Sidebar from "@/Containers/Sidebar";

export function AuthenticatedLayout({ children }: PropsWithChildren) {
    const { props: { assets } } = usePage<PageProps>();
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
