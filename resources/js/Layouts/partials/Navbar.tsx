import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";

export const Navbar = () => {
    const { props: { assets } } = usePage<PageProps>()
    const { delete: logout } = useForm()

    return (
        <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
                <a className="navbar-brand brand-logo me-5" href={route('admin.dashboard')}>
                    <img src={`${assets}/images/logo.svg`} className="me-2" alt="logo" />
                </a>
                <a className="navbar-brand brand-logo-mini" href={route('admin.dashboard')}>
                    <img src={`${assets}/images/logo-mini.svg`} alt="logo" />
                </a>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span className="icon-menu"></span>
                </button>
                <ul className="navbar-nav navbar-nav-right">
                    <li className="nav-item nav-profile dropdown">
                        <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="profileDropdown">
                            <img src={`${assets}/images/faces/face28.jpg`} alt="profile" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                            <a className="dropdown-item">
                                <i className="ti-settings text-primary"></i>
                                Settings
                            </a>
                            <button className="dropdown-item" onClick={() => logout(route('logout'))}>
                                <i className="ti-power-off text-primary"></i>
                                Logout
                            </button>
                        </div>
                    </li>
                </ul>
                <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                    <span className="icon-menu"></span>
                </button>
            </div>
        </nav>
    )
}
