'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useUserService } from "@/app/_services";
import 'bootstrap/dist/css/bootstrap.min.css';
import { QuestionItem, QuestionList, Timer,Question } from './components';


const initialQuestions: Question[] = [
    {
        id: 123445,
        question: "Địa chỉ các vùng nhớ nào là thay đổi khi tiến trình thực thi?",
        options: ["text", "data", "heap", "Tất cả đáp án đều sai"],
        answer: "",
        submitted: false
    },
    {
        id: 724523,
        question: "Giao thức nào an toàn nhất để chuyển tệp?",
        options: ["SCP", "FTPS", "FTP", "SFTP"],
        answer: "",
        submitted: false
    },
    {
        id: 342345,
        question: "Tấn công hệ thống miềm (Domain Name System-DNS) nào thay thế một địa chỉ IP gian lận cho tên một biểu tượng?",
        options: ["DNS replay", "DNS masking", "DNS poisoning", "DNS forwarding"],
        answer: "",
        submitted: false
    },
    {
        id: 342344,
        question: "Tấn công hệ thống miềm (Domain Name System-DNS) nào thay thế một địa chỉ IP gian lận cho tên một biểu tượng?",
        options: ["DNS replay", "DNS masking", "DNS poisoning", "DNS forwarding"],
        answer: "",
        submitted: false
    },
    {
        id: 342348,
        question: "Tấn công hệ thống miềm (Domain Name System-DNS) nào thay thế một địa chỉ IP gian lận cho tên một biểu tượng?",
        options: ["DNS replay", "DNS masking", "DNS poisoning", "DNS forwarding"],
        answer: "",
        submitted: false
    },
    {
        id: 342354,
        question: "Tấn công hệ thống miềm (Domain Name System-DNS) nào thay thế một địa chỉ IP gian lận cho tên một biểu tượng?",
        options: ["DNS replay", "DNS masking", "DNS poisoning", "DNS forwarding"],
        answer: "",
        submitted: false
    },
    {
        id: 342234,
        question: "Tấn công hệ thống miềm (Domain Name System-DNS) nào thay thế một địa chỉ IP gian lận cho tên một biểu tượng?",
        options: ["DNS replay", "DNS masking", "DNS poisoning", "DNS forwarding"],
        answer: "",
        submitted: false
    },
    {
        id: 342658,
        question: "Tấn công hệ thống miềm (Domain Name System-DNS) nào thay thế một địa chỉ IP gian lận cho tên một biểu tượng?",
        options: ["DNS replay", "DNS masking", "DNS poisoning", "DNS forwarding"],
        answer: "",
        submitted: false
    },
    {
        id: 342757,
        question: "Tấn công hệ thống miềm (Domain Name System-DNS) nào thay thế một địa chỉ IP gian lận cho tên một biểu tượng?",
        options: ["DNS replay", "DNS masking", "DNS poisoning", "DNS forwarding"],
        answer: "",
        submitted: false
    }
];

export default function ExamPage() {
    const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    const [timeLeft, setTimeLeft] = useState<number>(100); // Đơn vị giây
    const [timerOn, setTimerOn] = useState<boolean>(true); // Bắt đầu với bộ đếm thời gian được kích hoạt

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft > 0 && timerOn) {
                setTimeLeft(prevTime => prevTime - 1);
            } else {
                setTimerOn(false);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, timerOn]);

    const handleAnswerChange = (questionId: number, answer: string) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === questionId ? { ...question, answer } : question
            )
        );
    };

    const isAnswerSelected = (questionId: number) => {
        const question = questions.find(q => q.id === questionId);
        return (question && question.answer !== "")?true:false;
    };

    const handleSubmit = (questionId: number) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === questionId ? { ...question, submitted: true } : question
            )
        );
    };

    return (
        <div style={{ margin: '50px 20px 0 20px' }}>
            <div style={{ flex: 1, justifyContent: 'flex-start', marginRight: '32px', borderBottom: '1px solid #D4D4D4' }}>
                <button style={{ backgroundColor: '#3738E2', padding: 0, height: '42px', borderRadius: '8px 8px 0 0 !important', border: 0 }}>
                    <span style={{ color: 'white', padding: '0 20px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book-half" viewBox="0 0 16 16">
                            <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                        </svg>
                    </span>
                </button>
            </div>
            <div style={{ display: 'flex', width: '100%', marginTop: '32px' }} className="divcontain">
                <div style={{ flex: '0 0 20%' }} className="div1">
                    <Timer timeLeft={timeLeft} />
                    <QuestionList questions={questions} />
                </div>
                <div style={{ flex: '0 0 80%', paddingLeft: '25px' }} className="div2">
                    <h2 style={{ fontWeight: 600, textTransform: 'initial', fontSize: '1.5em', lineHeight: '1.4em' }}>Tên bài thi</h2>
                    <div style={{ color: '#686b73', display: 'flex', fontSize: '16px' }}>
                        <div style={{ maxWidth: '80%' }}>Exam hạn __/__/2024 __:__ +07</div>
                    </div>
                    <div style={{ marginTop: '32px' }}>
                        {questions.map((question, index) => (
                            <QuestionItem
                                key={question.id}
                                question={question}
                                index={index}
                                timerOn={timerOn}
                                handleAnswerChange={handleAnswerChange}
                                handleSubmit={handleSubmit}
                                isAnswerSelected={isAnswerSelected}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
