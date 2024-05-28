'use client'

import { useRouter } from "next/navigation";
import { SetStateAction, useState, useEffect } from "react";
import React from 'react';
import { useUserService } from "@/app/_services"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ExamPage(){
    const [questions, setQuestions] = useState([
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
        },
        // Thêm các câu hỏi khác tại đây
    ]);

    const [timeLeft, setTimeLeft] = useState(100); // Đơn vị giây
    const [timerOn, setTimerOn] = useState(true); // Bắt đầu với bộ đếm thời gian được kích hoạt

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft > 0 && timerOn) {
                setTimeLeft(prevTime => prevTime - 1);
            }else{
                setTimerOn(false);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, timerOn]);

    // Hàm xử lý khi người dùng chọn câu trả lời
    const handleAnswerChange = (questionId, answer) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === questionId ? { ...question, answer } : question
            )
        );
    };

    const isAnswerSelected = (questionId) => {
        const question = questions.find(q => q.id === questionId);
        return question && question.answer !== "";
    };

    // Hàm xử lý khi người dùng nhấn nút submit cho từng câu hỏi
    const handleSubmit = (questionId) => {
        // Thực hiện các xử lý khi submit ở đây (ví dụ: gửi câu trả lời lên server)
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === questionId ? { ...question, submitted: true } : question
            )
        );
    };

    return (<div className="" style={{margin: '50px 20px 0 20px'}}> 
        <div style={{flex: 1, justifyContent: 'flex-start', marginRight: '32px', borderBottom: '1px solid #D4D4D4'}}>
            <button style={{backgroundColor: '#3738E2', padding: 0, height: '42px', borderRadius: '8px 8px 0 0 !important', border: 0}}>
                <span style={{color: 'white', padding: '0 20px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book-half" viewBox="0 0 16 16">
                        <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                    </svg>
                </span>
            </button>
        </div>
        <div style={{display: 'flex', width: '100%', marginTop: '32px'}} className="divcontain">
            <div style={{flex: '0 0 20%'}} className="div1">
                <h6 style={{position: 'sticky',
                            top: '25px',
                            overflowY: 'auto'}}>Kết thúc bài thi của tôi <b>{Math.floor(timeLeft / 60)}:{(timeLeft % 60) < 10 ? '0' : ''}{timeLeft % 60}</b></h6>
                <div style={{display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '8px', 
                            padding: '16px', 
                            border: '1px solid #D4D4D4', 
                            borderRadius: '8px', 
                            backgroundColor: '#fff', 
                            marginTop: '15px',
                            position: 'sticky',
                            top: '65px',
                            overflowY: 'auto'}}>
                    {questions.map((question, index) => (
                        <button key={question.id} 
                            style={{border: '1px solid #D4D4D4',
                                    borderRadius: '4px',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '38px',
                                    cursor: 'pointer',
                                    background: !question.submitted ? '#ccc' : '#3738E2',
                                    color: '#fff'}}>
                            <a href={`#question_${question.id}`} style={{color: 'white', textDecoration: 'none', width: '100%', height: '100%', padding: '4px'}}>{index + 1}</a>                        
                        </button>
                    ))}
                </div>

            </div>

            <div style={{flex: '0 0 80%', paddingLeft: '25px'}} className="div2">
                <h2 style={{fontWeight: 600, textTransform: 'initial', fontSize: '1.5em', lineHeight: '1.4em'}}>Tên bài thi</h2>
                <div style={{color: '#686b73', display: 'flex', fontSize: '16px'}}>
                    <div style={{maxWidth: '80%'}}>Exam hạn __/__/2024 __:__ +07</div>
                </div>
                <div style={{marginTop: '32px'}}>
                    {/* phần code câu hỏi */}
                    {questions.map((question, index) => (
                            <div key={question.id} style={{marginTop: '20px', borderBottom: '1px solid #D4D4D4', paddingBottom: '80px'}} id={`question_${question.id}`}>
                                <h3 style={{marginBottom: '12px',
                                            color: '#fff',
                                            fontSize: '18px',
                                            fontWeight: 600,
                                            backgroundColor: '#2F58CD',
                                            borderRadius: '16px',
                                            textAlign: 'center',
                                            display: 'inline-block',
                                            padding: '2px 10px',}}
                                >Câu hỏi {question.id}</h3>
                                {/* tên câu hỏi */}
                                <p style={{marginBottom: '12px'}}>Câu {index + 1}. {question.question}</p>
                                {/* đáp án */}
                                {question.options.map(option => (
                                    <div key={option} style={{minWidth: '100px', width: 'auto !important', marginBottom: '5px'}}>
                                        <label>
                                            <input
                                                type="radio"
                                                name={`question_${question.id}`}
                                                value={option}
                                                onChange={() => handleAnswerChange(question.id, option)}
                                                disabled={question.submitted || !timerOn}
                                                style={{top: '8px', left: 0, width: '20px', margin: 0}}
                                            />
                                            <span style={{padding: '8px !important', border: '0 !important', color: '#212121 !important', marginBottom: 0, marginLeft: '0'}}>
                                                {option}
                                            </span>
                                        </label>
                                    </div>
                                ))}

                                {/* nút submit mỗi câu */}
                                <div style={{marginTop: '15px'}}>
                                    <button onClick={() => handleSubmit(question.id)} 
                                            disabled={!isAnswerSelected(question.id) || question.submitted || !timerOn}
                                            style={{color: '#fff',
                                                    background: !isAnswerSelected(question.id) ? '#ccc' : '#3738E2',
                                                    borderRadius: '10px',
                                                    marginRight: '10px',
                                                    float: 'left',
                                                    marginBottom:'10px',
                                                    border: 'none',
                                                    padding: '10px 20px'}}
                                    >
                                        Gửi
                                    </button>
                                </div>
                                {/* thông báo khi ấn submit */}
                                <div>
                                    {question.submitted && <p style={{float: 'left', marginTop: '10px', padding: '8px 10px 4px 10px', lineHeight: '1.5em'}}>Câu trả lời đã được gửi đi</p>}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    </div>);
}