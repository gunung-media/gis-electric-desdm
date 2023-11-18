export const Sidebar = () => {
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link" href="../../index.html">
                        <i className="icon-grid menu-icon"></i>
                        <span className="menu-title">Dashboard</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="../widgets/widgets.html">
                        <i className="icon-cog menu-icon"></i>
                        <span className="menu-title">Widgets</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <i className="icon-layout menu-icon"></i>
                        <span className="menu-title">UI Elements</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className="collapse" id="ui-basic">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/accordions.html">Accordions</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/buttons.html">Buttons</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/badges.html">Badges</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/breadcrumbs.html">Breadcrumbs</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/dropdowns.html">Dropdowns</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/modals.html">Modals</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/progress.html">Progress bar</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/pagination.html">Pagination</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/tabs.html">Tabs</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/typography.html">Typography</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/tooltips.html">Tooltips</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#ui-advanced" aria-expanded="false" aria-controls="ui-advanced">
                        <i className="icon-image menu-icon"></i>
                        <span className="menu-title">Advanced UI</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className="collapse" id="ui-advanced">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/dragula.html">Dragula</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/clipboard.html">Clipboard</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/context-menu.html">Context menu</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/slider.html">Sliders</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/carousel.html">Carousel</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/colcade.html">Colcade</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../ui-features/loaders.html">Loaders</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
                        <i className="icon-columns menu-icon"></i>
                        <span className="menu-title">Form elements</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className="collapse" id="form-elements">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"><a className="nav-link" href="../forms/basic_elements.html">Basic Elements</a></li>
                            <li className="nav-item"><a className="nav-link" href="../forms/advanced_elements.html">Advanced Elements</a></li>
                            <li className="nav-item"><a className="nav-link" href="../forms/validation.html">Validation</a></li>
                            <li className="nav-item"><a className="nav-link" href="../forms/wizard.html">Wizard</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#editors" aria-expanded="false" aria-controls="editors">
                        <i className="icon-loader menu-icon"></i>
                        <span className="menu-title">Editors</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className="collapse" id="editors">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"><a className="nav-link" href="../forms/text_editor.html">Text editors</a></li>
                            <li className="nav-item"><a className="nav-link" href="../forms/code_editor.html">Code editors</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
                        <i className="icon-bar-graph menu-icon"></i>
                        <span className="menu-title">Charts</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className="collapse" id="charts">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="../charts/chartjs.html">ChartJs</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../charts/morris.html">Morris</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../charts/flot-chart.html">Flot</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../charts/google-charts.html">Google charts</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../charts/sparkline.html">Sparkline js</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../charts/c3.html">C3 charts</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../charts/chartist.html">Chartists</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../charts/justGage.html">JustGage</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
                        <i className="icon-grid-2 menu-icon"></i>
                        <span className="menu-title">Tables</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className="collapse" id="tables">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="../tables/basic-table.html">Basic table</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../tables/data-table.html">Data table</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../tables/js-grid.html">Js-grid</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../tables/sortable-table.html">Sortable table</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="../ui-features/popups.html">
                        <i className="icon-open menu-icon"></i>
                        <span className="menu-title">Popups</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="../ui-features/notifications.html">
                        <i className="icon-esc menu-icon"></i>
                        <span className="menu-title">Notifications</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
                        <i className="icon-contract menu-icon"></i>
                        <span className="menu-title">Icons</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className="collapse" id="icons">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="../icons/flag-icons.html">Flag icons</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../icons/mdi.html">Mdi icons</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../icons/font-awesome.html">Font Awesome</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../icons/simple-line-icon.html">Simple line icons</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../icons/themify.html">Themify icons</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#maps" aria-expanded="false" aria-controls="maps">
                        <i className="icon-map menu-icon"></i>
                        <span className="menu-title">Maps</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className="collapse" id="maps">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="../maps/mapael.html">Mapael</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../maps/vector-map.html">Vector Map</a></li>
                            <li className="nav-item"> <a className="nav-link" href="../maps/google-maps.html">Google Map</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                        <i className="icon-head menu-icon"></i>
                        <span className="menu-title">User Pages</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className="collapse" id="auth">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="login.html"> Login </a></li>
                            <li className="nav-item"> <a className="nav-link" href="login-2.html"> Login 2 </a></li>
                            <li className="nav-item"> <a className="nav-link" href="register.html"> Register </a></li>
                            <li className="nav-item"> <a className="nav-link" href="register-2.html"> Register 2 </a></li>
                            <li className="nav-item"> <a className="nav-link" href="lock-screen.html"> Lockscreen </a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#error" aria-expanded="false" aria-controls="error">
                        <i className="icon-ban menu-icon"></i>
                        <span className="menu-title">Error pages</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className="collapse" id="error">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="error-404.html"> 404 </a></li>
                            <li className="nav-item"> <a className="nav-link" href="error-500.html"> 500 </a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
                        <i className="icon-book menu-icon"></i>
                        <span className="menu-title">General Pages</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className="collapse" id="general-pages">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="blank-page.html"> Blank Page </a></li>
                            <li className="nav-item"> <a className="nav-link" href="profile.html"> Profile </a></li>
                            <li className="nav-item"> <a className="nav-link" href="faq.html"> FAQ </a></li>
                            <li className="nav-item"> <a className="nav-link" href="faq-2.html"> FAQ 2 </a></li>
                            <li className="nav-item"> <a className="nav-link" href="news-grid.html"> News grid </a></li>
                            <li className="nav-item"> <a className="nav-link" href="timeline.html"> Timeline </a></li>
                            <li className="nav-item"> <a className="nav-link" href="search-results.html"> Search Results </a></li>
                            <li className="nav-item"> <a className="nav-link" href="portfolio.html"> Portfolio </a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="collapse" href="#e-commerce" aria-expanded="false" aria-controls="e-commerce">
                        <i className="icon-tag menu-icon"></i>
                        <span className="menu-title">E-commerce</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className="collapse" id="e-commerce">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="invoice.html"> Invoice </a></li>
                            <li className="nav-item"> <a className="nav-link" href="pricing-table.html"> Pricing Table </a></li>
                            <li className="nav-item"> <a className="nav-link" href="orders.html"> Orders </a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="../apps/email.html">
                        <i className="icon-mail menu-icon"></i>
                        <span className="menu-title">E-mail</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="../apps/calendar.html">
                        <i className="icon-watch menu-icon"></i>
                        <span className="menu-title">Calendar</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="../apps/todo.html">
                        <i className="icon-align-right menu-icon"></i>
                        <span className="menu-title">Todo List</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="../apps/gallery.html">
                        <i className="icon-image menu-icon"></i>
                        <span className="menu-title">Gallery</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="../documentation/documentation.html">
                        <i className="icon-paper menu-icon"></i>
                        <span className="menu-title">Documentation</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}
