import React from 'react';


export function Timer({ timeLeft }:{timeLeft:number}) {
    return (
        <h6 style={{
            position: 'sticky',
            top: '25px',
            overflowY: 'auto'
        }}>Kết thúc bài thi của tôi <b>{Math.floor(timeLeft / 60)}:{(timeLeft % 60) < 10 ? '0' : ''}{timeLeft % 60}</b></h6>
    );
};


export interface Question {
    id: number;
    question: string;
    options: string[];
    answer: string;
    submitted: boolean;
}

interface QuestionItemProps {
    question: Question;
    index: number;
    timerOn: boolean;
    handleAnswerChange: (questionId: number, answer: string) => void;
    handleSubmit: (questionId: number) => void;
    isAnswerSelected: (questionId: number) => boolean;
}
export function QuestionList ({ questions }:{questions:Question[]}) {
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            padding: '16px',
            border: '1px solid #D4D4D4',
            borderRadius: '8px',
            backgroundColor: '#fff',
            marginTop: '15px',
            position: 'sticky',
            top: '65px',
            overflowY: 'auto'
        }}>
            {questions.map((question, index) => (
                <button key={question.id}
                    style={{
                        border: '1px solid #D4D4D4',
                        borderRadius: '4px',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '38px',
                        cursor: 'pointer',
                        background: !question.submitted ? '#ccc' : '#3738E2',
                        color: '#fff'
                    }}>
                    <a href={`#question_${question.id}`} style={{ color: 'white', textDecoration: 'none', width: '100%', height: '100%', padding: '4px' }}>{index + 1}</a>
                </button>
            ))}
        </div>
    );
};


export function QuestionItem({
    question,
    index,
    timerOn,
    handleAnswerChange,
    handleSubmit,
    isAnswerSelected
}:QuestionItemProps) {
    return (
        <div style={{ marginTop: '20px', borderBottom: '1px solid #D4D4D4', paddingBottom: '80px' }} id={`question_${question.id}`}>
            <h3 style={{
                marginBottom: '12px',
                color: '#fff',
                fontSize: '18px',
                fontWeight: 600,
                backgroundColor: '#2F58CD',
                borderRadius: '16px',
                textAlign: 'center',
                display: 'inline-block',
                padding: '2px 10px',
            }}>Câu hỏi {question.id}</h3>
            <p style={{ marginBottom: '12px' }}>Câu {index + 1}. {question.question}</p>
            {question.options.map(option => (
                <div key={option} style={{ minWidth: '100px', width: 'auto !important', marginBottom: '5px' }}>
                    <label>
                        <input
                            type="radio"
                            name={`question_${question.id}`}
                            value={option}
                            onChange={() => handleAnswerChange(question.id, option)}
                            disabled={question.submitted || !timerOn}
                            style={{ top: '8px', left: 0, width: '20px', margin: 0 }}
                        />
                        <span style={{ padding: '8px !important', border: '0 !important', color: '#212121 !important', marginBottom: 0, marginLeft: '0' }}>
                            {option}
                        </span>
                    </label>
                </div>
            ))}
            <div style={{ marginTop: '15px' }}>
                <button onClick={() => handleSubmit(question.id)}
                    disabled={!isAnswerSelected(question.id) || question.submitted || !timerOn}
                    style={{
                        color: '#fff',
                        background: !isAnswerSelected(question.id) ? '#ccc' : '#3738E2',
                        borderRadius: '10px',
                        marginRight: '10px',
                        float: 'left',
                        marginBottom: '10px',
                        border: 'none',
                        padding: '10px 20px'
                    }}>
                    Gửi
                </button>
            </div>
            <div>
                {question.submitted && <p style={{ float: 'left', marginTop: '10px', padding: '8px 10px 4px 10px', lineHeight: '1.5em' }}>Câu trả lời đã được gửi đi</p>}
            </div>
        </div>
    );
};

