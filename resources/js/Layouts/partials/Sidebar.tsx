export const Sidebar = () => {
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link" href={route('admin.dashboard')}>
                        <i className="icon-grid menu-icon"></i>
                        <span className="menu-title">Dashboard</span>
                    </a>
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
                            <li className="nav-item"> <a className="nav-link" href="../maps/vector-map.html">Desa</a></li>
                        </ul>
                    </div>
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
                    <a className="nav-link" href={route('admin.development-plan.index')}>
                        <i className="fa fa-building menu-icon"></i>
                        <span className="menu-title">Rencana Pembangunan</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
