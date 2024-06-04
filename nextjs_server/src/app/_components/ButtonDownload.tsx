import React from 'react';

interface ButtonDownloadProps {
    fileUrl: string;
    label: string;
}

const ButtonDownload: React.FC<ButtonDownloadProps> = ({ fileUrl, label }) => {
    return (
        <a href={fileUrl} download>
            <button style={{
                minWidth: '11.25rem', // 180px / 16
                color: '#171717',
                marginRight: '1rem', // 16px / 16
                fontWeight: '500',
                border: '0.1875rem solid #D1D1D1', // 3px / 16
                borderRadius: '0.5rem', // 8px / 16
                padding: '0.625rem', // 10px / 16
                background: '#fff'
            }}>
                <span>{label}</span>
            </button>
        </a>
    );
};

export default ButtonDownload;
