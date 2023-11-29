export const NavbarHorizontal = () => {
    return (
        <div className="horizontal-menu">
            <nav className="navbar top-navbar col-lg-12 col-12 p-0">
                <div className="container">
                    <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                        <a className="navbar-brand brand-logo" href="index.html"><img src="../../images/logo-light.svg" alt="logo" /></a>
                        <a className="navbar-brand brand-logo-mini" href="index.html"><img src="../../images/logo-mini.svg" alt="logo" /></a>
                    </div>
                    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                        <ul className="navbar-nav mr-lg-2">
                            <li className="nav-item nav-search d-none d-lg-block">
                                <div className="input-group">
                                    <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                                        <span className="input-group-text" id="search">
                                            <i className="icon-search"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" />
                                </div>
                            </li>
                        </ul>
                        <ul className="navbar-nav navbar-nav-right">
                            <li className="nav-item dropdown">
                                <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-bs-toggle="dropdown">
                                    <i className="icon-bell mx-0"></i>
                                    <span className="count"></span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                                    <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                                    <a className="dropdown-item preview-item">
                                        <div className="preview-thumbnail">
                                            <div className="preview-icon bg-success">
                                                <i className="ti-info-alt mx-0"></i>
                                            </div>
                                        </div>
                                        <div className="preview-item-content">
                                            <h6 className="preview-subject font-weight-normal">Application Error</h6>
                                            <p className="font-weight-light small-text mb-0 text-muted">
                                                Just now
                                            </p>
                                        </div>
                                    </a>
                                    <a className="dropdown-item preview-item">
                                        <div className="preview-thumbnail">
                                            <div className="preview-icon bg-warning">
                                                <i className="ti-settings mx-0"></i>
                                            </div>
                                        </div>
                                        <div className="preview-item-content">
                                            <h6 className="preview-subject font-weight-normal">Settings</h6>
                                            <p className="font-weight-light small-text mb-0 text-muted">
                                                Private message
                                            </p>
                                        </div>
                                    </a>
                                    <a className="dropdown-item preview-item">
                                        <div className="preview-thumbnail">
                                            <div className="preview-icon bg-info">
                                                <i className="ti-user mx-0"></i>
                                            </div>
                                        </div>
                                        <div className="preview-item-content">
                                            <h6 className="preview-subject font-weight-normal">New user registration</h6>
                                            <p className="font-weight-light small-text mb-0 text-muted">
                                                2 days ago
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li className="nav-item nav-profile dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="profileDropdown">
                                    <img src="../../images/faces/face28.jpg" alt="profile" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                                    <a className="dropdown-item">
                                        <i className="ti-settings text-primary"></i>
                                        Settings
                                    </a>
                                    <a className="dropdown-item">
                                        <i className="ti-power-off text-primary"></i>
                                        Logout
                                    </a>
                                </div>
                            </li>
                            <li className="nav-item nav-settings d-none d-lg-flex">
                                <a className="nav-link" href="#">
                                    <i className="icon-ellipsis"></i>
                                </a>
                            </li>
                        </ul>
                        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="horizontal-menu-toggle">
                            <span className="ti-menu"></span>
                        </button>
                    </div>
                </div>
            </nav>
            <nav className="bottom-navbar">
                <div className="container">
                    <ul className="nav page-navigation">
                        <li className="nav-item">
                            <a className="nav-link" href="index.html">
                                <i className="icon-grid menu-icon"></i>
                                <span className="menu-title">Dashboard</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="pages/widgets/widgets.html">
                                <i className="icon-cog menu-icon"></i>
                                <span className="menu-title">Widgets</span>
                            </a>
                        </li>
                        <li className="nav-item mega-menu">
                            <a href="#" className="nav-link">
                                <i className="icon-layoutmenu-icon"></i>
                                <span className="menu-title">UI Elements</span>
                                <i className="menu-arrow"></i>
                            </a>
                            <div className="submenu">
                                <div className="col-group-wrapper row">
                                    <div className="col-group col-md-4">
                                        <div className="row">
                                            <div className="col-12">
                                                <p className="category-heading">Basic Elements</p>
                                                <div className="submenu-item">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <ul>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/accordions.html">Accordion</a></li>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/badges.html">Badges</a></li>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/breadcrumbs.html">Breadcrumbs</a></li>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/dropdowns.html">Dropdown</a></li>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/modals.html">Modals</a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <ul>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/progress.html">Progress bar</a></li>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/pagination.html">Pagination</a></li>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/tabs.html">Tabs</a></li>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/tooltips.html">Tooltip</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-group col-md-4">
                                        <div className="row">
                                            <div className="col-12">
                                                <p className="category-heading">Advanced Elements</p>
                                                <div className="submenu-item">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <ul>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/dragula.html">Dragula</a></li>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/carousel.html">Carousel</a></li>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/clipboard.html">Clipboard</a></li>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/context-menu.html">Context Menu</a></li>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/loaders.html">Loader</a></li>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/slider.html">Slider</a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <ul>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/popups.html">Popup</a></li>
                                                                <li className="nav-item"><a className="nav-link" href="pages/ui-features/notifications.html">Notification</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-group col-md-4">
                                        <p className="category-heading">Icons</p>
                                        <ul className="submenu-item">
                                            <li className="nav-item"><a className="nav-link" href="pages/icons/flag-icons.html">Flag Icons</a></li>
                                            <li className="nav-item"> <a className="nav-link" href="pages/icons/mdi.html">Mdi icons</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/icons/font-awesome.html">Font Awesome</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/icons/simple-line-icon.html">Simple Line Icons</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/icons/themify.html">Themify Icons</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="icon-columns menu-icon"></i>
                                <span className="menu-title">Forms</span>
                                <i className="menu-arrow"></i></a>
                            <div className="submenu">
                                <ul className="submenu-item">
                                    <li className="nav-item"><a className="nav-link" href="pages/forms/basic_elements.html">Basic Elements</a></li>
                                    <li className="nav-item"><a className="nav-link" href="pages/forms/advanced_elements.html">Advanced Elements</a></li>
                                    <li className="nav-item"><a className="nav-link" href="pages/forms/validation.html">Validation</a></li>
                                    <li className="nav-item"><a className="nav-link" href="pages/forms/wizard.html">Wizard</a></li>
                                    <li className="nav-item"><a className="nav-link" href="pages/forms/text_editor.html">Text Editor</a></li>
                                    <li className="nav-item"><a className="nav-link" href="pages/forms/code_editor.html">Code Editor</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item mega-menu">
                            <a href="#" className="nav-link">
                                <i className="icon-bar-graph menu-icon"></i>
                                <span className="menu-title">Data</span>
                                <i className="menu-arrow"></i></a>
                            <div className="submenu">
                                <div className="col-group-wrapper row">
                                    <div className="col-group col-md-6">
                                        <p className="category-heading">Charts</p>
                                        <div className="submenu-item">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <ul>
                                                        <li className="nav-item"><a className="nav-link" href="pages/charts/chartjs.html">Chart Js</a></li>
                                                        <li className="nav-item"><a className="nav-link" href="pages/charts/morris.html">Morris</a></li>
                                                        <li className="nav-item"><a className="nav-link" href="pages/charts/flot-chart.html">Flot</a></li>
                                                        <li className="nav-item"><a className="nav-link" href="pages/charts/google-charts.html">Google Chart</a></li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-6">
                                                    <ul>
                                                        <li className="nav-item"><a className="nav-link" href="pages/charts/sparkline.html">Sparkline</a></li>
                                                        <li className="nav-item"><a className="nav-link" href="pages/charts/c3.html">C3 Chart</a></li>
                                                        <li className="nav-item"><a className="nav-link" href="pages/charts/chartist.html">Chartist</a></li>
                                                        <li className="nav-item"><a className="nav-link" href="pages/charts/justGage.html">JustGage</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-group col-md-3">
                                        <p className="category-heading">Table</p>
                                        <ul className="submenu-item">
                                            <li className="nav-item"><a className="nav-link" href="pages/tables/basic-table.html">Basic Table</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/tables/data-table.html">Data Table</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/tables/js-grid.html">Js-grid</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/tables/sortable-table.html">Sortable Table</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-group col-md-3">
                                        <p className="category-heading">Maps</p>
                                        <ul className="submenu-item">
                                            <li className="nav-item"><a className="nav-link" href="pages/maps/mapael.html">Mapael</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/maps/vector-map.html">Vector Map</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/maps/google-maps.html">Google Map</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item mega-menu">
                            <a href="#" className="nav-link">
                                <i className="icon-head menu-icon"></i>
                                <span className="menu-title">Sample Pages</span>
                                <i className="menu-arrow"></i></a>
                            <div className="submenu">
                                <div className="col-group-wrapper row">
                                    <div className="col-group col-md-3">
                                        <p className="category-heading">User Pages</p>
                                        <ul className="submenu-item">
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/login.html">Login</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/login-2.html">Login 2</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/register.html">Register</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/register-2.html">Register 2</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/lock-screen.html">Lockscreen</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-group col-md-3">
                                        <p className="category-heading">Error Pages</p>
                                        <ul className="submenu-item">
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/error-400.html">400</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/error-404.html">404</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/error-500.html">500</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/error-505.html">505</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-group col-md-3">
                                        <p className="category-heading">E-commerce</p>
                                        <ul className="submenu-item">
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/invoice.html">Invoice</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/pricing-table.html">Pricing Table</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/orders.html">Orders</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-group col-md-3">
                                        <p className="category-heading">General</p>
                                        <ul className="submenu-item">
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/search-results.html">Search Results</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/profile.html">Profile</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/timeline.html">Timeline</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/news-grid.html">News grid</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/portfolio.html">Portfolio</a></li>
                                            <li className="nav-item"><a className="nav-link" href="pages/samples/faq.html">FAQ</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="icon-ban menu-icon"></i>
                                <span className="menu-title">Apps</span>
                                <i className="menu-arrow"></i></a>
                            <div className="submenu">
                                <ul className="submenu-item">
                                    <li className="nav-item"><a className="nav-link" href="pages/apps/email.html">Email</a></li>
                                    <li className="nav-item"><a className="nav-link" href="pages/apps/calendar.html">Calendar</a></li>
                                    <li className="nav-item"><a className="nav-link" href="pages/apps/todo.html">Todo List</a></li>
                                    <li className="nav-item"><a className="nav-link" href="pages/apps/gallery.html">Gallery</a></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a href="pages/documentation/documentation.html" className="nav-link">
                                <i className="icon-paper menu-icon"></i>
                                <span className="menu-title">Documentation</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
