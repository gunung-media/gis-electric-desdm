import { useEffect, useState } from "react"
export const Sidebar = () => {
    const [isMember, setIsMember] = useState<boolean>(false)

    useEffect(() => {
        if (window.location.href.includes('member')) setIsMember(true)
    }, [])

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            {!isMember ?
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link" href={route('admin.dashboard')}>
                            <i className="icon-grid menu-icon"></i>
                            <span className="menu-title">Dashboard</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <p className="nav-link" >
                            <span className="menu-title"><strong>Layanan Masyarakat</strong></span>
                        </p>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={route('admin.proposal.index')}>
                            <i className="fa fa-globe menu-icon"></i>
                            <span className="menu-title">Usulan</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href={route('admin.report.index')}>
                            <i className="fa fa-warning menu-icon"></i>
                            <span className="menu-title">Laporan</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <p className="nav-link" >
                            <span className="menu-title"><strong>Bidang Ketenagalistrikan</strong></span>
                        </p>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={route('admin.bpbl-proposal.index')}>
                            <i className="fa fa-globe menu-icon"></i>
                            <span className="menu-title">Usulan BPBL</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={route('admin.business-report.index')}>
                            <i className="fa fa-globe menu-icon"></i>
                            <span className="menu-title">Laporan Usaha Sendiri</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={route('admin.periodic-report.index')}>
                            <i className="fa fa-globe menu-icon"></i>
                            <span className="menu-title">Laporan Berkala</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <p className="nav-link" >
                            <span className="menu-title"><strong>Pengaturan</strong></span>
                        </p>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#maps" aria-expanded="false" aria-controls="maps">
                            <i className="icon-map menu-icon"></i>
                            <span className="menu-title">Maps</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="maps">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href={route('admin.gardu_listrik.index')}>Gardu Listrik</a></li>
                                <li className="nav-item"> <a className="nav-link" href={route('admin.village_electricity.index')}>Desa</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={route('admin.development-plan.index')}>
                            <i className="fa fa-building menu-icon"></i>
                            <span className="menu-title">Rencana Pembangunan</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href={route('admin.guide.index')}>
                            <i className="fa fa-gear menu-icon"></i>
                            <span className="menu-title">Setting</span>
                        </a>
                    </li>
                </ul>
                :
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link" href={route('member.dashboard')}>
                            <i className="icon-grid menu-icon"></i>
                            <span className="menu-title">Dashboard</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href={route('member.dashboard')}>
                            <i className="fa fa-globe menu-icon"></i>
                            <span className="menu-title">Usulan BPBL</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href={route('member.dashboard')}>
                            <i className="fa fa-globe menu-icon"></i>
                            <span className="menu-title">Laporan Usaha Sendiri</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href={route('admin.periodic-report.index')}>
                            <i className="fa fa-globe menu-icon"></i>
                            <span className="menu-title">Laporan Berkala</span>
                        </a>
                    </li>
                </ul>
            }
        </nav>
    )
}
