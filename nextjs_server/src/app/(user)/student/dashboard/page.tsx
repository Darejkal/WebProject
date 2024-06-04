'use client'

import { useRouter } from "next/navigation";
import { SetStateAction, useState, useEffect } from "react";
import React from 'react';
import { useUserService } from "@/app/_services"
import 'bootstrap/dist/css/bootstrap.min.css';
import { NodeNextRequest } from "next/dist/server/base-http/node";

export default function DashBoardPage(){
    
    // option để chọn giữa khóa học và tiến độ học tập
    const [selectedOption, setSelectedOption] = useState('option1');

    const commonButtonStyle = {
        marginRight: '2rem', // 32px to rem
        fontWeight: 700, 
        border: 'none', 
        background: 'white',
        padding: '0.625rem' // 10px to rem
    };

    const getButtonStyle = (option) => ({
        ...commonButtonStyle,
        borderBottom: selectedOption === option ? '2px solid #3738E2' : 'none',
        fontWeight: selectedOption === option ? 'bold' : 'normal',
        color: selectedOption === option ? '#3738E2' : 'black'
    });

    // mảng chưa các chương và bài học
    const [chapters, setChapters] = useState([
        {
            id: 1,
            title: "Chương 1",
            lessions:[
                {
                    title: "Bài 1",
                    description: "Mô tả một cái gì đó để đủ dài",
                    score: "10",
                    attendance: "Có"
                },
                {
                    title: "Bài 2",
                    description: "Mô tả một cái gì đó để đủ dài",
                    score: "10",
                    attendance: "Có"
                },
                {
                    title: "Bài 3",
                    description: "Mô tả một cái gì đó để đủ dài",
                    score: "10",
                    attendance: "Có"
                }
            ]
        },
        {
            id: 2,
            title: "Chương 2",
            lessions:[
                {
                    title: "Bài 1",
                    description: "Mô tả một cái gì đó để đủ dài",
                    score: "10",
                    attendance: "Có"
                },
                {
                    title: "Bài 2",
                    description: "Mô tả một cái gì đó để đủ dài",
                    score: "10",
                    attendance: "Vắng"
                },
                {
                    title: "Bài 3",
                    description: "Mô tả một cái gì đó để đủ dài",
                    score: "10",
                    attendance: "Vắng"
                }
            ]
        },
        {
            id: 3,
            title: "Chương 3",
            lessions:[
                {
                    title: "Bài 1",
                    description: "Mô tả một cái gì đó để đủ dài",
                    score: "10",
                    attendance: "Vắng"
                },
                {
                    title: "Bài 2",
                    description: "Mô tả một cái gì đó để đủ dài",
                    score: "10",
                    attendance: "Vắng"
                },
                {
                    title: "Bài 3",
                    description: "Mô tả một cái gì đó để đủ dài",
                    score: "10",
                    attendance: "Có"
                },
                {
                    title: "Bài 4",
                    description: "Mô tả một cái gì đó để đủ dài",
                    score: "10",
                    attendance: "Có"
                }
            ]
        },
        {
            id: 4,
            title: "Chương 4",
            lessions:[
                {
                    title: "Bài 1",
                    description: "Mô tả một cái gì đó để đủ dài",
                    score: "10",
                    attendance: "Có"
                }
            ]
        },
        {
            id: 5,
            title: "Chương 5",
            lessions:[
                {
                    title: "Bài 1",
                    description: "Mô tả một cái gì đó để đủ dài",
                    score: "10",
                    attendance: "Có"
                }
            ]        
        }
    ]);

    // bảng dropdown chứa danh sách bài tập
    const [openDropdowns, setOpenDropdowns] = useState(Array(chapters.length).fill(false));

    const toggleDropdown = (index) => {
        const updatedDropdowns = [...openDropdowns];
        updatedDropdowns[index] = !updatedDropdowns[index];
        setOpenDropdowns(updatedDropdowns);
    };

    // hover không dùng css :))
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return(
        <div style={{padding: '1.75rem 0 1.25rem', overflowX: 'hidden', position: 'relative', width: '100%', marginTop: '1.25rem'}}>
            <div style={{padding: 0, margin: '0 auto', overflowX: 'auto', borderBottom: '1px solid #D4D4D4'}}>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: 'auto !important'}}>
                    <button onClick={() => setSelectedOption('option1')}
                            style={getButtonStyle('option1')}>Khóa học</button>
                    <button onClick={() => setSelectedOption('option2')}
                            style={getButtonStyle('option2')}>Tiến độ học tập</button>
                </div>
            </div>
            <div>
                {selectedOption === 'option1' ? (
                <div>
                    <div style={{padding: '2rem 0', border: 'none', justifyContent: 'space-between', alignItems: 'center', display: 'flex', flexWrap: 'wrap'}}>
                        <div>
                            <h2 style={{fontSize: '1.5rem', lineHeight: 1.3, fontWeight: 700, margin: 0, color: '#171717', paddingTop: '1rem'}}>Tên môn học</h2>
                        </div>
                        <div style={{paddingTop: '1rem'}}>
                            <div style={{background: '#3738E2', color: 'white', padding: '0.625rem 1rem', borderRadius: '0.5rem'}}>
                                Bắt đầu học
                            </div>
                        </div>
                    </div>

                    <div style={{display: 'flex'}}>
                        <ul style={{border: '1px solid #D4D4D4', borderRadius: '0.5rem', listStyleType: 'none', paddingLeft: 0, width: '75%'}}>
                            {chapters.map((chapter, index) => (
                                <li key={chapter.id}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    style={{background: hoveredIndex === index ? '#c9c9f7' : '#f0f0f0', borderBottom: '1px solid #A3A3A3'}}
                                    onClick={(e) => { 
                                        if (e.target === e.currentTarget) {
                                            toggleDropdown(index);
                                        }}}
                                    >
                                    <button onClick={(e) => { e.stopPropagation(); toggleDropdown(index);}}
                                            style={{
                                                border: 'none', 
                                                padding: '0.875rem 1.4375rem', // 14px 23px to rem
                                                borderRadius: '0', 
                                                background: 'inherit',
                                            }}
                                    ><h3 style={{fontSize: '1.125rem', lineHeight: 1.4, color: '#171717', padding: 0, fontWeight: 500}}>{chapter.title}</h3></button>
                                    {openDropdowns[index] && (
                                        <ul style={{listStyleType: 'none', paddingLeft: 0, background: '#ffffff'}}>
                                            {chapter.lessions.map((lesson, lessonIndex) => (
                                                <li key={lessonIndex}
                                                    style={{padding: '1rem'}}
                                                >
                                                    <a href="../student/dashboard_detail"
                                                        style={{textDecoration: 'none', color: '#171717'}}
                                                    >
                                                        {lesson.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}  
                                </li>
                            ))}
                        </ul>

                        <aside style={{borderLeft: '0 !important', minWidth: '17.1875rem', maxWidth: '17.1875rem', padding: 0, marginLeft: '2rem'}}>
                            <div>
                                <h3 style={{borderBottom: '1px solid #D4D4D4', paddingBottom: '1rem', marginBottom: '0.5rem', fontSize: '1rem', lineHeight: 1.5, color: '#171717',fontWeight: 600}}>Lưu ý các mốc thời gian</h3>
                                <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', paddingBottom: 0}}>
                                    <div style={{marginRight: '0.3125rem'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-calendar-plus" viewBox="0 0 16 16">
                                            <path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7"/>
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <b>Kết thúc khóa học sau</b>
                                        <div style={{margin: '0.5rem auto', fontSize: '1rem', lineHeight: 1.4, fontWeight: 700}}>02/07/2024</div>
                                        <p>Sau thời gian này khóa học sẽ không thể tham gia</p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
                ) : (
                <div>
                    <h2 style={{fontSize: '1.5rem', lineHeight: 1.3, fontWeight: 700, margin: 0, color: '#171717', paddingTop: '3rem'}}>Tiến độ học tập của </h2>
                    <div>
                        {chapters.map((chapter) => (
                            <div key={chapter.id} style={{borderColor: '#D4D4D4', borderBottom: '1px solid #e3e3e3', padding: '1.5rem 0', display: 'flex', width: '100%'}}>
                                <h4 style={{
                                        borderRight: '1px solid #D4D4D4',
                                        fontSize: '1.5rem',
                                        color: '#171717',
                                        fontWeight: 500,
                                        paddingRight: '2rem',
                                        width: '25%',
                                        lineHeight: '1.4em',
                                        boxSizing: 'border-box',
                                        marginLeft:'1.25rem'}}
                                >{chapter.title}</h4>
                                <div style={{paddingLeft: '2rem'}}>
                                    {chapter.lessions.map((lesson, lessonIndex) => (
                                        <div key={lessonIndex}>
                                            <h4>{lesson.title}</h4>
                                            <p>{lesson.description}</p>
                                            <p>Điểm: {lesson.score}</p>
                                            <p>Điểm danh: {lesson.attendance}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}
