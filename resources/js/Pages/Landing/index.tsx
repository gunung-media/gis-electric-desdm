import { Head, usePage } from "@inertiajs/react"
import './styles.scss'
import kaltengLogo from '@/assets/images/kalteng-logo.png'
import gubWagub from '@/assets/images/gubWagub.png'
import kadis from '@/assets/images/kadis.png'
import mapIcon from '@/assets/icons/landing/map.png'
import graphicIcon from '@/assets/icons/landing/pie-chart.png'
import statisticIcon from '@/assets/icons/landing/table.png'
import proposalIcon from '@/assets/icons/landing/proposal.png'
import reportIcon from '@/assets/icons/landing/report.png'
import trackingIcon from '@/assets/icons/landing/tracking.png'
import guideIcon from '@/assets/icons/landing/workshop.png'
import electricIcon from '@/assets/icons/landing/electric.png'
import { PageProps } from "@/types"

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
            href: route('tracking'),
            imgSrc: trackingIcon,
            title: "Tracking Usulan dan Laporan"
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
            href: route('member.bpbl-proposal.index'),
            imgSrc: electricIcon,
            title: "Usulan BPBL "
        },
        {
            href: route('member.business-report.index'),
            imgSrc: electricIcon,
            title: "Laporan Usaha Sendiri "
        },
        {
            href: route('member.periodic-report.index'),
            imgSrc: electricIcon,
            title: "Laporan Berkala"
        },
        {
            href: route('guide'),
            imgSrc: guideIcon,
            title: "Panduan Aplikasi"
        },
    ]

    const { APP_VERSION } = usePage<PageProps>().props
    return (
        <div className="bg">
            <Head title="Landing" />
            <div className="overlay">
                <div className="landing-container">
                    <div className="heading">
                        <img src={kaltengLogo} alt="Kalimantan Tengah" />
                        <h1>Si<span>lisda</span><i>Versi {APP_VERSION}</i></h1>
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
                    <div className="photos">
                        <img src={gubWagub} alt="Gubenur & Wakil Gubenur" className="gub-wagub" />
                        <img src={kadis} alt="Kepala Dinas" className="kadis" />
                    </div>
                </div>
            </div>
        </div>
    )
}
