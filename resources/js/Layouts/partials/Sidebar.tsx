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
            </ul>
        </nav>
    )
}
