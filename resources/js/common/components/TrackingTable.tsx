import { ProposalTracking } from "@/features/Proposal"
import { ReportTrackingType } from "@/features/Report"
import { FC } from "react"

export const TrackingTable: FC<{
    trackings?: ReportTrackingType[] | ProposalTracking[]
}> = ({ trackings }) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Deskripsi</th>
                        <th>Status</th>
                        <th>Tanggal</th>
                    </tr>
                </thead>

                <tbody>
                    {trackings?.length === 0 || !trackings ? (
                        <tr>
                            <td colSpan={3}>Tidak ada tracking</td>
                        </tr>
                    ) : trackings?.map((tracking) => (
                        <tr>
                            <td>{tracking.status}</td>
                            <td>{tracking.description}</td>
                            <td className="text-danger">{tracking.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
