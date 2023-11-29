import { PropsWithChildren } from "react";
import { NavbarHorizontal, Footer } from "./partials";

export function HorizontalLayout({ children }: PropsWithChildren) {
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
