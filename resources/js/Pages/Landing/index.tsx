import { Head } from "@inertiajs/react"
import './styles.scss'
import kaltengLogo from '@/assets/images/kalteng-logo.png'
import gubWagub from '@/assets/images/gubWagub.png'
import kadis from '@/assets/images/kadis.png'
import mapIcon from '@/assets/icons/landing/map.png'
import graphicIcon from '@/assets/icons/landing/pie-chart.png'
import statisticIcon from '@/assets/icons/landing/table.png'
import proposalIcon from '@/assets/icons/landing/proposal.png'
import reportIcon from '@/assets/icons/landing/report.png'
import dpIcon from '@/assets/icons/landing/development-plan.png'
import guideIcon from '@/assets/icons/landing/workshop.png'

export default function Landing() {
    const menus = [
        {
            href: route('map'),
            imgSrc: mapIcon,
            title: "Peta"
        },
        {
            href: route('graphic'),
            imgSrc: graphicIcon,
            title: "Grafik Kelistrikan"
        },
        {
            href: route('statistic'),
            imgSrc: statisticIcon,
            title: "Statistik Kelistrikan"
        },
        {
            href: route('proposal.index'),
            imgSrc: proposalIcon,
            title: "Usulan"
        },
        {
            href: route('report.index'),
            imgSrc: reportIcon,
            title: "Laporan"
        },
        {
            href: route('development-plan.index'),
            imgSrc: dpIcon,
            title: "Rencana Pembangunan"
        },
        {
            href: route('guide'),
            imgSrc: guideIcon,
            title: "Panduan Aplikasi"
        },
    ]
    return (
        <div className="bg">
            <Head title="Landing" />
            <img src={gubWagub} alt="Gubenur & Wakil Gubenur" className="gub-wagub" />
            <img src={kadis} alt="Kepala Dinas" className="kadis" />
            <div className="overlay">
                <div className="landing-container">
                    <div className="heading">
                        <img src={kaltengLogo} alt="Kalimantan Tengah" />
                        <h1>Si<span>lisda</span><i>Versi 1.4</i></h1>
                        <h5>Sistem Informasi Listrik Daerah Provinsi Kalimantan Tengah</h5>
                    </div>
                    <div className="new-menus">
                        {menus.map((menu, i) => (
                            <a href={menu.href} key={i}>
                                <div className="circle">
                                    <img src={menu.imgSrc} alt={menu.title} />
                                </div>
                                <p>{menu.title}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
