import { Head } from "@inertiajs/react"
import './styles.scss'
import kaltengLogo from '@/assets/images/kalteng-logo.png'
import gubWagub from '@/assets/images/gubWagub.png'
import kadis from '@/assets/images/kadis.png'

export default function Landing() {
    return (
        <div className="bg">
            <Head title="Landing" />
            <img src={gubWagub} alt="Gubenur & Wakil Gubenur" className="gub-wagub" />
            <img src={kadis} alt="Kepala Dinas" className="kadis" />
            <div className="overlay">
                <div className="landing-container">
                    <div className="heading">
                        <img src={kaltengLogo} alt="Kalimantan Tengah" />
                        <h1>Si<span>lisda</span></h1>
                        <h5>Sistem Informasi Listrik Daerah</h5>
                    </div>
                    <div className="menus">
                        <a href={route('map')}>Peta</a>
                        <a href={route('statistic')}>Grafik Listrik Daerah</a>
                        <a href={route('statistic')}>Statistik Listrik Daerah</a>
                        <a href={route('proposal.index')}>Usulan</a>
                        <a href={route('report.index')}>Laporan</a>
                        <a href={route('development-plan.index')}>Rencana Pembangungan</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
