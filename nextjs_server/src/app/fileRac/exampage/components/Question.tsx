import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface QuestionProps {
    question: {
        id: number;
        index: number;
        question: string;
        options: string[];
        submitted: boolean;
    };
    handleAnswerChange: (questionId: number, option: string) => void;
    handleSubmit: (questionId: number) => void;
    isAnswerSelected: (questionId: number) => boolean;
    timerOn: boolean;

}

const Question: React.FC<QuestionProps> = ({ question, handleAnswerChange, handleSubmit, isAnswerSelected, timerOn }) => {
    return (
        <div style={{ marginTop: '1.25rem', borderBottom: '0.0625rem solid #D4D4D4', paddingBottom: '5rem' }} id={`question_${question.id}`}>
            <h3 style={{ marginBottom: '0.75rem', color: '#fff', fontSize: '1.125rem', fontWeight: 600, backgroundColor: '#2F58CD', borderRadius: '1rem', textAlign: 'center', display: 'inline-block', padding: '0.125rem 0.625rem' }}>Câu hỏi {question.id}</h3>
            <p style={{ marginBottom: '0.75rem' }}>Câu {question.index + 1}. {question.question}</p>
            {question.options.map(option => (
                <div key={option} style={{ minWidth: '6.25rem', width: 'auto !important', marginBottom: '0.3125rem' }}>
                    <label>
                        <input
                            type="radio"
                            name={`question_${question.id}`}
                            value={option}
                            onChange={() => handleAnswerChange(question.id, option)}
                            disabled={question.submitted || !timerOn}
                            style={{ top: '0.5rem', left: 0, width: '1.25rem', margin: 0 }}
                        />
                        <span style={{ padding: '0.5rem !important', border: '0 !important', color: '#212121 !important', marginBottom: 0, marginLeft: '0' }}>
                            {option}
                        </span>
                    </label>
                </div>
            ))}
            <div style={{ marginTop: '0.9375rem' }}>
                <button onClick={() => handleSubmit(question.id)} disabled={!isAnswerSelected(question.id) || question.submitted || !timerOn} style={{ color: '#fff', background: !isAnswerSelected(question.id) ? '#ccc' : '#3738E2', borderRadius: '0.625rem', marginRight: '0.625rem', float: 'left', marginBottom: '0.625rem', border: 'none', padding: '0.625rem 1.25rem' }}>Gửi</button>
            </div>
            <div>
                {question.submitted && <p style={{ float: 'left', marginTop: '0.625rem', padding: '0.5rem 0.625rem 0.3125rem 0.625rem', lineHeight: '1.5rem' }}>Câu trả lời đã được gửi đi</p>}
            </div>

        </div>
    );
}

export default Question;
