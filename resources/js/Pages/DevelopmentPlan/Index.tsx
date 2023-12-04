import { RenderDownloadBtn } from "@/common/components";
import { DevelopmentPlanType } from "@/features/DevelopmentPlan";
import { HorizontalLayout } from "@/layouts/HorizontalLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Card } from "react-bootstrap";
import { Worker } from "@react-pdf-viewer/core";
import ShowCoverPDF from "@/common/components/ShowCoverPDF";
import './styles.scss'

export default function Index({ developmentPlans }: PageProps & { developmentPlans: DevelopmentPlanType[] }) {
    return (
        <HorizontalLayout>
            <Head title="Rencana Pembangunan" />
            <div className="row">
                {developmentPlans.map((dp, i) => (
                    <>
                        <div className="col-md-6 col-12 mb-3" key={i}>
                            <div className="card development-plan-bx">
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                    <ShowCoverPDF
                                        fileUrl={dp.document_path}
                                        pageIndex={1}
                                    />
                                </Worker>
                                <Card.Body>
                                    <Card.Title>{dp.title}</Card.Title>
                                    <Card.Text dangerouslySetInnerHTML={{ __html: dp.description }}></Card.Text>
                                    <RenderDownloadBtn documentPath={dp.document_path} />
                                </Card.Body>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </HorizontalLayout>
    )
}
