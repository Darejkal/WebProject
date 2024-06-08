import React from 'react';
const ExamDate = ({ examTitle, examDate }) => {
    // Function to format the date
    const formatDate = (date) => {
        // Format the date here
        return date;
    };

    return (
        <div>
            <h2 style={{ fontWeight: 600, textTransform: 'initial', fontSize: '1.5rem', lineHeight: '1.4rem' }}>{examTitle}</h2>
            <div style={{ color: '#686b73', display: 'flex', fontSize: '1rem' }}>
                <div style={{ maxWidth: '80%' }}>Exam hạn {formatDate(examDate)}</div>
            </div>
        </div>
    );
};

export default ExamDate;
