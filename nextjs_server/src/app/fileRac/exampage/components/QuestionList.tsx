'use client'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SubmitExamButton from './SubmitExamButton';

interface Question {
    id: number;
    question: string;
    options: string[];
    answer: string;
    submitted: boolean;
}

interface QuestionListProps {
    questions: Question[];
    handleSubmitExam: () => void;
    timerOn: boolean;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, handleSubmitExam, timerOn }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', padding: '1rem', border: '0.0625rem solid #D4D4D4', borderRadius: '0.5rem', backgroundColor: '#fff', marginTop: '0.9375rem', position: 'sticky', top: '4.0625rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', padding: '1rem', border: '0.0625rem solid #D4D4D4', borderRadius: '0.5rem', backgroundColor: '#fff', marginTop: '0.9375rem', position: 'sticky', top: '4.0625rem' }}>
                {questions.map((question, index) => (
                    <button key={question.id} style={{ border: '0.0625rem solid #D4D4D4', borderRadius: '0.25rem', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.375rem', cursor: 'pointer', background: !question.submitted ? '#ccc' : '#3738E2', color: '#fff' }}>
                        <a href={`#question_${question.id}`} style={{ color: 'white', textDecoration: 'none', width: '100%', height: '100%', padding: '0.25rem' }}>{index + 1}</a>
                    </button>
                ))}

            </div>
            <SubmitExamButton handleSubmitExam={handleSubmitExam} timerOn={timerOn} />
        </div>


    );
}

export default QuestionList;