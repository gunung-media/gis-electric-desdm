export const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
                <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © {year}. <a href="gunungmedia.com" target="_blank">Gunung Media</a>.  All rights reserved.</span>
            </div>
        </footer>
    )
}

