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
            id: 7241523,
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
    };

    const handleSubmit = (questionId: number) => {
        setQuestions(questions.map(question =>
            question.id === questionId ? { ...question, submitted: true } : question
        ));
    };

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
}
