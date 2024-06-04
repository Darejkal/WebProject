import React from 'react';

interface PdfViewerProps {
    fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
    return (
        <iframe
            src={viewerUrl}
            width="100%"
            height="750px"
            style={{ border: 'none' }}
        ></iframe>
    );
};

export default PdfViewer;
