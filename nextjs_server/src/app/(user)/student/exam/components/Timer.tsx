import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface TimerProps {
    timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
    return (
        <h6 style={{ position: 'sticky', top: '1.5625rem' }}>
            kết thúc bài thi của tôi <b>{Math.floor(timeLeft / 60)}:{(timeLeft % 60) < 10 ? '0' : ''}{timeLeft % 60}</b>
        </h6>
    );
}

export default Timer;
