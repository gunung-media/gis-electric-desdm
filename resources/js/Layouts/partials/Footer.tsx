export const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
                <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © {year}.Dinas Energi dan Sumber Daya Mineral Provinsi Kalimantan Tengah.  All rights reserved.</span>
                <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Designed by <a href="https://gunungmedia.com" target="_blank">Gunung Media</a></span>
            </div>
        </footer>
    )
}

