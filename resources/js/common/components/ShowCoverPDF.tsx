import * as React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';

import '@react-pdf-viewer/core/lib/styles/index.css';

import { pageThumbnailPlugin } from '../plugins/pageThumbnailPlugin';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

interface ShowCoverPDFProps {
    fileUrl: string;
    pageIndex: number;
}

const ShowCoverPDF: React.FC<ShowCoverPDFProps> = ({ fileUrl, pageIndex }) => {
    const { props: { storageUrl } } = usePage<PageProps>()
    const thumbnailPluginInstance = thumbnailPlugin();
    const { Cover } = thumbnailPluginInstance;
    const pageThumbnailPluginInstance = pageThumbnailPlugin({
        PageThumbnail: <Cover width={400} getPageIndex={() => pageIndex} />,
    });

    return <Viewer fileUrl={`${storageUrl}/${fileUrl}`} plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]} />;
};

export default ShowCoverPDF;
