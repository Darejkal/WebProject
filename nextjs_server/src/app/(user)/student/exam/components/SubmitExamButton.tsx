'use client'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface SubmitExamButtonProps {
    handleSubmitExam: () => void;
    timerOn: boolean;
}

const SubmitExamButton: React.FC<SubmitExamButtonProps> = ({ handleSubmitExam, timerOn }) => {

    return (
        <div >
            <button onClick={handleSubmitExam} disabled={!timerOn} style={{ color: '#fff', background: '#3738E2', borderRadius: '0.625rem', border: 'none', padding: '0.625rem 1.25rem', marginTop: '1rem' }}>Gửi bài thi</button>
        </div>

    );
}

export default SubmitExamButton;