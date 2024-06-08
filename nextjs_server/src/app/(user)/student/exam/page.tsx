'use client'
import React, { useState, useEffect } from 'react';
// import { Header, Timer, QuestionList, Question, SubmitExamButton } from '';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Timer from './components/Timer';
import Question from './components/Question';
import QuestionList from './components/QuestionList';
import ExamDate from './components/ExamDate';
import SubmitExamButton from './components/SubmitExamButton';

<<<<<<< Updated upstream
import { useRouter } from "next/navigation";
import { SetStateAction, useState, useEffect } from "react";
import React from 'react';
import { useUserService } from "@/app/_services"
import 'bootstrap/dist/css/bootstrap.min.css';
=======
>>>>>>> Stashed changes

export default function ExamPage() {
    const [questions, setQuestions] = useState([
        {
            id: 1234545,
            question: "Địa chỉ các vùng nhớ nào là thay đổi khi tiến trình thực thi?",
            options: ["text", "data", "heap", "Tất cả đáp án đều sai"],
            answer: "",
            submitted: false
        },
        {
<<<<<<< Updated upstream
            id: 724523,
=======
            id: 7241523,
>>>>>>> Stashed changes
            question: "Giao thức nào an toàn nhất để chuyển tệp?",
            options: ["SCP", "FTPS", "FTP", "SFTP"],
            answer: "",
            submitted: false
        },
        {
            id: 3432345,
            question: "Tấn công hệ thống miềm (Domain Name System-DNS) nào thay thế một địa chỉ IP gian lận cho tên một biểu tượng?",
            options: ["DNS replay", "DNS masking", "DNS poisoning", "DNS forwarding"],
            answer: "",
            submitted: false
        },
        {
            id: 3423544,
            question: "Tấn công hệ thống miềm (Domain Name System-DNS) nào thay thế một địa chỉ IP gian lận cho tên một biểu tượng?",
            options: ["DNS replay", "DNS masking", "DNS poisoning", "DNS forwarding"],
            answer: "",
            submitted: false
        },
        {
            id: 3423448,
            question: "Tấn công hệ thống miềm (Domain Name System-DNS) nào thay thế một địa chỉ IP gian lận cho tên một biểu tượng?",
            options: ["DNS replay", "DNS masking", "DNS poisoning", "DNS forwarding"],
            answer: "",
            submitted: false
        },
        {
            id: 1234845,
            question: "Địa chỉ các vùng nhớ nào là thay đổi khi tiến trình thực thi?",
            options: ["text", "data", "heap", "Tất cả đáp án đều sai"],
            answer: "",
            submitted: false
        },
        {
            id: 7245523,
            question: "Giao thức nào an toàn nhất để chuyển tệp?",
            options: ["SCP", "FTPS", "FTP", "SFTP"],
            answer: "",
            submitted: false
        },
        {
            id: 3424345,
            question: "Tấn công hệ thống miềm (Domain Name System-DNS) nào thay thế một địa chỉ IP gian lận cho tên một biểu tượng?",
            options: ["DNS replay", "DNS masking", "DNS poisoning", "DNS forwarding"],
            answer: "",
            submitted: false
        },
        {
            id: 3423441,
            question: "Tấn công hệ thống miềm (Domain Name System-DNS) nào thay thế một địa chỉ IP gian lận cho tên một biểu tượng?",
            options: ["DNS replay", "DNS masking", "DNS poisoning", "DNS forwarding"],
            answer: "",
            submitted: false
        },
        {
            id: 3423408,
            question: "Tấn công hệ thống miềm (Domain Name System-DNS) nào thay thế một địa chỉ IP gian lận cho tên một biểu tượng?",
            options: ["DNS replay", "DNS masking", "DNS poisoning", "DNS forwarding"],
            answer: "",
            submitted: false
        },
        {
            id: 3423054,
            question: "Tấn công hệ thống miềm (Domain Name System-DNS) nào thay thế một địa chỉ IP gian lận cho tên một biểu tượng?",
            options: ["DNS replay", "DNS masking", "DNS poisoning", "DNS forwarding"],
            answer: "",
            submitted: false
        },
        {
            id: 3042234,
            question: "Tấn công hệ thống miềm (Domain Name System-DNS) nào thay thế một địa chỉ IP gian lận cho tên một biểu tượng?",
            options: ["DNS replay", "DNS masking", "DNS poisoning", "DNS forwarding"],
            answer: "",
            submitted: false
        },
        {
            id: 3420658,
            question: "Tấn công hệ thống miềm (Domain Name System-DNS) nào thay thế một địa chỉ IP gian lận cho tên một biểu tượng?",
            options: ["DNS replay", "DNS masking", "DNS poisoning", "DNS forwarding"],
            answer: "",
            submitted: false
        },
        {
            id: 3427057,
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
        },
        // Thêm các câu hỏi khác tại đây
    ]);

<<<<<<< Updated upstream

    const [timeLeft, setTimeLeft] = useState(100); // Đơn vị giây
    const [timerOn, setTimerOn] = useState(true); // Bắt đầu với bộ đếm thời gian được kích hoạt

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

    const handleAnswerChange = (questionId, answer) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === questionId ? { ...question, answer } : question
            )
        );
=======
    const [timeLeft, setTimeLeft] = useState(3600); //1h
    const [timerOn, setTimerOn] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (timeLeft > 0 && timerOn) {
            const timerId = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearInterval(timerId);
        } else if (timeLeft === 0) {
            setTimerOn(false);
            alert("Hết thời gian làm bài!");
        }
    }, [timeLeft, timerOn]);

    const handleAnswerChange = (questionId: number, answer: string) => {
        setQuestions(questions.map(question =>
            question.id === questionId ? { ...question, answer } : question
        ));
>>>>>>> Stashed changes
    };

    const handleSubmit = (questionId: number) => {
        setQuestions(questions.map(question =>
            question.id === questionId ? { ...question, submitted: true } : question
        ));
    };

<<<<<<< Updated upstream
    const handleSubmit = (questionId) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === questionId ? { ...question, submitted: true } : question
            )
        );
    };

    return (
        <div className="" style={{ margin: '3.125rem 1.25rem 0 1.25rem' }}>
            <div style={{ flex: 1, justifyContent: 'flex-start', marginRight: '2rem', borderBottom: '0.0625rem solid #D4D4D4' }}>
                <button style={{ backgroundColor: '#3738E2', padding: 0, height: '2.625rem', borderRadius: '0.5rem 0.5rem 0 0 !important', border: 0 }}>
                    <span style={{ color: 'white', padding: '0 1.25rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-book-half" viewBox="0 0 16 16">
                            <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                        </svg>
                    </span>
                </button>
            </div>
            <div style={{ display: 'flex', width: '100%', marginTop: '2rem' }} className="divcontain">
                <div style={{ flex: '0 0 20%' }} className="div1">
                    <h6 style={{ position: 'sticky', top: '1.5625rem', overflowY: 'auto' }}>Kết thúc bài thi của tôi <b>{Math.floor(timeLeft / 60)}:{(timeLeft % 60) < 10 ? '0' : ''}{timeLeft % 60}</b></h6>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', padding: '1rem', border: '0.0625rem solid #D4D4D4', borderRadius: '0.5rem', backgroundColor: '#fff', marginTop: '0.9375rem', position: 'sticky', top: '4.0625rem', overflowY: 'auto' }}>
                        {questions.map((question, index) => (
                            <button key={question.id} style={{ border: '0.0625rem solid #D4D4D4', borderRadius: '0.25rem', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.375rem', cursor: 'pointer', background: !question.submitted ? '#ccc'
                            : '#3738E2', color: '#fff' }}>
                            <a href={`#question_${question.id}`} style={{ color: 'white', textDecoration: 'none', width: '100%', height: '100%', padding: '0.25rem' }}>{index + 1}</a>
                        </button>
                    ))}
                </div>

            </div>

            <div style={{ flex: '0 0 80%', paddingLeft: '1.5625rem' }} className="div2">
                <h2 style={{ fontWeight: 600, textTransform: 'initial', fontSize: '1.5rem', lineHeight: '1.4rem' }}>Tên bài thi</h2>
                <div style={{ color: '#686b73', display: 'flex', fontSize: '1rem' }}>
                    <div style={{ maxWidth: '80%' }}>Exam hạn __/__/2024 __:__ +07</div>
                </div>
                <div style={{ marginTop: '2rem' }}>
                    {/* phần code câu hỏi */}
                    {questions.map((question, index) => (
                        <div key={question.id} style={{ marginTop: '1.25rem', borderBottom: '0.0625rem solid #D4D4D4', paddingBottom: '5rem' }} id={`question_${question.id}`}>
                            <h3 style={{ marginBottom: '0.75rem', color: '#fff', fontSize: '1.125rem', fontWeight: 600, backgroundColor: '#2F58CD', borderRadius: '1rem', textAlign: 'center', display: 'inline-block', padding: '0.125rem 0.625rem' }}>Câu hỏi {question.id}</h3>
                            {/* tên câu hỏi */}
                            <p style={{ marginBottom: '0.75rem' }}>Câu {index + 1}. {question.question}</p>
                            {/* đáp án */}
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

                            {/* nút submit mỗi câu */}
                            <div style={{ marginTop: '0.9375rem' }}>
                                <button onClick={() => handleSubmit(question.id)} disabled={!isAnswerSelected(question.id) || question.submitted || !timerOn} style={{ color: '#fff', background: !isAnswerSelected(question.id) ? '#ccc' : '#3738E2', borderRadius: '0.625rem', marginRight: '0.625rem', float: 'left', marginBottom: '0.625rem', border: 'none', padding: '0.625rem 1.25rem' }}>Gửi</button>
                            </div>
                            {/* thông báo khi ấn submit */}
                            <div>
                                {question.submitted && <p style={{ float: 'left', marginTop: '0.625rem', padding: '0.5rem 0.625rem 0.3125rem 0.625rem', lineHeight: '1.5rem' }}>Câu trả lời đã được gửi đi</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>);
=======
    const isAnswerSelected = (questionId: number) => {
        const question = questions.find(question => question.id === questionId);
        return question && question.answer;
    };

    const handleSubmitExam = () => {
        // if (isSubmitting) return;
        // setIsSubmitting(true);
        setTimeout(() => {
            alert("Bài thi đã được gửi đi!");
            router.push('/exam-summary'); // summary page
        }, 2000);
    };

    return (
        <div style={{ margin: '3.125rem 1.25rem 0 1.25rem' }}>
            <Header />
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                <div style={{ width: '18rem', padding: '1rem' }}>
                    <Timer timeLeft={timeLeft} />
                    <QuestionList questions={questions} handleSubmitExam={{ handleSubmitExam }} timerOn={timerOn} />
                </div>
                <div div style={{ width: '80%', marginTop: '2rem' }} className="divcontain">
                    <div style={{ flex: '0 0 80%', paddingLeft: '1.5625rem' }} className="div2">
                        <ExamDate examTitle={'Tên bài thi'} examDate={'__ / __ / 2024 __:__ +07'} />
                        <div style={{ flex: 1, padding: '1rem' }}>
                            {questions.map((question, index) => (
                                <Question
                                    key={question.id}
                                    question={{ ...question, index }}
                                    handleAnswerChange={handleAnswerChange}
                                    handleSubmit={handleSubmit}
                                    isAnswerSelected={isAnswerSelected}
                                    timerOn={timerOn}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
>>>>>>> Stashed changes
}
