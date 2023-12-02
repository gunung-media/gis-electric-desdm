import { PageProps } from "@/types"
import { usePage } from "@inertiajs/react"

export const NavbarHorizontal = () => {
    const { props: { assets } } = usePage<PageProps>()
    return (
        <div className="horizontal-menu">
            <nav className="navbar top-navbar col-lg-12 col-12 p-0">
                <div className="container">
                    <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                        <a className="navbar-brand brand-logo" href={route('landing')}><img src={`${assets}/images/silisda-light.png`} alt="logo" /></a>
                        <a className="navbar-brand brand-logo-mini" href={route('landing')}><img src={`${assets}/images/logo-kalteng.png`} alt="logo" /></a>
                    </div>
                    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    </div>
                </div>
            </nav>
            <nav className="bottom-navbar">
                <div className="container">
                    <ul className="nav page-navigation" style={{ justifyContent: "start", gap: "1rem" }}>
                        <li className="nav-item">
                            <a className="nav-link" href={route('landing')}>
                                <i className="icon-grid menu-icon"></i>
                                <span className="menu-title">Home</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={route('map')}>
                                <i className="icon-map menu-icon"></i>
                                <span className="menu-title">Map</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={route('statistic')}>
                                <i className="fa fa-database menu-icon"></i>
                                <span className="menu-title">Statistik Kelistrikan Daerah</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={route('proposal.index')}>
                                <i className="fa fa-globe menu-icon"></i>
                                <span className="menu-title">Usulan</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={route('report.index')}>
                                <i className="fa fa-warning menu-icon"></i>
                                <span className="menu-title">Laporan</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={route('development-plan.index')}>
                                <i className="fa fa-building menu-icon"></i>
                                <span className="menu-title">Rencana Pembangunan</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
