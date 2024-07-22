import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head } from "@inertiajs/react"

export default function MemberDashboard({
    assets, bpblProposalCount, businessReportCount, periodicReportCount }: PageProps & {
        bpblProposalCount: number,
        businessReportCount: number,
        periodicReportCount: number,
    }) {

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="row mb-3">
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card tale-bg">
                        <div className="card-people mt-auto">
                            <img src={`${assets}/images/dashboard/people.svg`} alt="people" />
                            <div className="weather-info">
                                <div className="d-flex">
                                    <div className="ms-2">
                                        <h4 className="location font-weight-normal">Kalimantan Tengah</h4>
                                        <h6 className="font-weight-normal">Kalimantan</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 grid-margin transparent">
                    <div className="row">
                        <div className="col-md-6 mb-4 stretch-card transparent">
                            <div className="card card-tale">
                                <div className="card-body">
                                    <p className="mb-4">Total Usulan Bpbl</p>
                                    <p className="fs-30 mb-2">{bpblProposalCount}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4 stretch-card transparent">
                            <div className="card card-dark-blue">
                                <div className="card-body">
                                    <p className="mb-4">Total Laporan Usaha Sendiri</p>
                                    <p className="fs-30 mb-2">{businessReportCount} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                            <div className="card card-light-blue">
                                <div className="card-body">
                                    <p className="mb-4">Total Laporan Berjangka</p>
                                    <p className="fs-30 mb-2">{periodicReportCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
