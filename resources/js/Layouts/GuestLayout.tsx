import { PageProps } from "@/types";
import { PropsWithChildren } from "react";
import { usePage } from "@inertiajs/react";

export function GuestLayout({ children }: PropsWithChildren) {
    const page = usePage<PageProps>()
    const year = new Date().getFullYear()
    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-stretch auth auth-img-bg">
                    <div className="row flex-grow">
                        <div className="col-lg-6 d-flex align-items-center justify-content-center">
                            <div className="auth-form-transparent text-left p-3">
                                <div className="brand-logo">
                                    <img src={`${page.props.assets}/images/logo.svg`} alt="logo" />
                                </div>
                                <h4>Welcome back!</h4>
                                <h6 className="font-weight-light">Happy to see you again!</h6>
                                {children}
                            </div>
                        </div>
                        <div className="col-lg-6 login-half-bg d-flex flex-row">
                            <p className="text-white font-weight-medium text-center flex-grow align-self-end">Copyright &copy; {year}  All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
