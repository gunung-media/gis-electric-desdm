import { RenderDownloadBtn } from "@/common/components";
import { HorizontalLayout } from "@/layouts/HorizontalLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Card } from "react-bootstrap";
import { Worker } from "@react-pdf-viewer/core";
import ShowCoverPDF from "@/common/components/ShowCoverPDF";
import './styles.scss'
import { GuideType } from "@/features/Guide";

export default function Index({ data }: PageProps & { data: GuideType }) {
    return (
        <HorizontalLayout>
            <Head title="Panduan Pengguna" />
            <div className="row">
                <div className="col-12 mb-3" >
                    <div className="card development-plan-bx">
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            <ShowCoverPDF
                                fileUrl={data.file ?? ''}
                                pageIndex={1}
                            />
                        </Worker>
                        <Card.Body>
                            <Card.Text dangerouslySetInnerHTML={{ __html: data.sambutan_kadis ?? '' }}></Card.Text>
                            <RenderDownloadBtn documentPath={data.file} />
                        </Card.Body>
                    </div>
                </div>
            </div>
        </HorizontalLayout>
    )
}
