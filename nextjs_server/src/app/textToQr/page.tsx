'use client'
import { useState } from 'react';
import QRCode from 'qrcode';

const Home = () => {
    const [text, setText] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    const generateQRCode = async () => {
        try {
            const url = await QRCode.toDataURL(text);
            setQrCodeUrl(url);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>QR Code Generator</h1>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text"
                style={{ padding: '10px', marginBottom: '20px', width: '300px' }}
            />
            <button onClick={generateQRCode} style={{ padding: '10px 20px', marginBottom: '20px' }}>Generate QR Code</button>
            {qrCodeUrl && (
                <div>
                    <img src={qrCodeUrl} alt="Generated QR Code" />
                </div>
            )}
        </div>
    );
};

export default Home;
