import React, { useState } from 'react';
import { Button } from 'react-bootstrap';




export interface Question {
    uuid:string,
    authorid:string,
    category:string,
    createdat:string,
    options:{
        text:string,
        uuid:string,
        ischosen?:boolean
    }[],
    question:string
    submitted?: boolean;
}

interface QuestionItemProps {
    question: Question;
    index: number;
    timerOn: boolean;
    handleAnswerChange: (questionId: string, answer: string) => void;
    handleSubmit: (questionId: string) => Promise<void>;
    isAnswerSelected: (questionId: string) => boolean;
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
                <button key={question.uuid}
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
                    <a href={`#question_${question.uuid}`} style={{ color: 'white', textDecoration: 'none', width: '100%', height: '100%', padding: '4px' }}>{index + 1}</a>
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
    const [recentlyCommited,setRecentlyCommited]=useState<boolean>(false);
    return (
        <div style={{ marginTop: '20px', borderBottom: '1px solid #D4D4D4', paddingBottom: '80px' }} id={`question_${question.uuid}`}>
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
            }}>Câu hỏi {question.uuid.slice(0,6)}</h3>
            <p style={{ marginBottom: '1.2rem',fontSize:"1.3rem" }}>{question.question}</p>
            {question.options.map(option => (
                <div key={option.uuid} style={{ minWidth: '100px', width: 'auto !important', marginBottom: '5px' }}>
                    <label>
                        <input
                            type="radio"
                            name={`question_${question.uuid}`}
                            value={option.uuid}
                            onChange={() => {
                                handleAnswerChange(question.uuid, option.uuid)
                                setRecentlyCommited(false);
                            }}
                            disabled={!timerOn}
                            style={{ top: '8px', left: 0, width: '20px', margin: 0 }}
                        />
                        <span style={{ padding: '8px !important', border: '0 !important', color: '#212121 !important', fontSize:"1.1rem" }}>
                            {option.text}
                        </span>
                    </label>
                </div>
            ))}
            <div style={{ marginTop: '15px' }}>
                <Button onClick={() => {
                    setRecentlyCommited(true)
                    handleSubmit(question.uuid).then(()=>
                        setRecentlyCommited(true)
                    ).catch((e)=>{
                        setRecentlyCommited(false)
                    })
                }}
                    disabled={!isAnswerSelected(question.uuid)||recentlyCommited||!timerOn}
                    style={{
                        color: '#fff',
                        background: (!isAnswerSelected(question.uuid))||recentlyCommited ? '#ccc' : '#3738E2',
                        borderRadius: '10px',
                        marginRight: '10px',
                        float: 'left',
                        marginBottom: '10px',
                        border: 'none',
                        padding: '10px 20px'
                    }}>
                    Gửi
                </Button>
            </div>
            <div>
                {recentlyCommited && <p style={{ float: 'left', marginTop: '10px', padding: '8px 10px 4px 10px', lineHeight: '1.5em' }}>Câu trả lời đã được gửi đi</p>}
            </div>
        </div>
    );
};

