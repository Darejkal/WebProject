import React from 'react';

interface ButtonDownloadProps {
    fileUrl: string;
    label: string;
}

const ButtonDownload: React.FC<ButtonDownloadProps> = ({ fileUrl, label }) => {
    return (
        <a href={fileUrl} download>
            <button style={{minWidth: '180px',
                            color: '#171717',
                            marginRight: '16px',
                            fontWeight: '500',
                            border: '3px solid #D1D1D1',
                            borderRadius: '8px',
                            padding: '10px',
                            background: '#fff'}}
            >
                <span>{label}</span>
            </button>
        </a>
    );
};

export default ButtonDownload;
