'use client'

import React from 'react';
import PdfViewer from '../../../_components/PdfViewer';
import { useState, useEffect, useRef } from 'react';
import ButtonDownload from '@/app/_components/ButtonDownload';

const DashBoardPage: React.FC = () => {

    const commonButtonStyle = {
        marginRight: '32px', 
        fontWeight: 700, 
        border: 'none', 
        background: 'white',
        padding: '10px'
    };

    const getButtonStyle = (a) => ({
        ...commonButtonStyle,
        borderBottom: a == '1' ? '2px solid #3738E2' : 'none',
        fontWeight: a == '1' ? 'bold' : 'normal',
        color: a == '1' ? '#3738E2' : 'black'
    });

    const [selectedButton, setSelectedButton] = useState('option1');

    const buttonStyle = {
        padding: 0, 
        height: '42px', 
        borderRadius: '8px 8px 0 0 !important', 
        minWidth: '87px',
        border: '1px solid #DDD',
        borderBottom: 'none'
    };

    const getButton = (option) => ({
        ...buttonStyle,
        backgroundColor: selectedButton === option ? '#3738E2' : '#FAFAFA',
    });

    const getSpan = (option) => ({
        padding: '0 20px',
        color: selectedButton === option ? '#fff' : '#000',
    })


    const getNext = (option) => ({
        minWidth: '180px',
        color: selectedButton === option ? '#bababa' : '#171717',
        marginRight: '16px',
        fontWeight: '500',
        border: selectedButton === option ? '1px solid #e9e9e9' : '1px solid #D4D4D4',
        borderRadius: '8px',
        padding: '10px',
        background: '#fff'
    })

    const handleClick = (option) => {
        setSelectedButton(option);
    };

    const [showList, setShowList] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    const lessons = [
        { title: 'Chương 1', sublessons: ['Bài giảng 1.1', 'Bài giảng 1.2', 'Bài giảng 1.3', 'Bài giảng 1.4', 'Bài giảng 1.5'] },
        { title: 'Chương 2', sublessons: ['Bài giảng 2.1', 'Bài giảng 2.2'] },
        { title: 'Chương 3', sublessons: ['Bài giảng 3.1', 'Bài giảng 3.2'] },
        { title: 'Chương 4', sublessons: ['Bài giảng', 'Bài giảng'] },
        { title: 'Chương 5', sublessons: ['Bài giảng', 'Bài giảng'] },

    ];

    return (<div style={{margin: '50px 20px 0 20px'}}>
        <div style={{padding: 0, margin: '0 auto', overflowX: 'auto', borderBottom: '1px solid #D4D4D4'}}>
            <div style={{display: 'flex', flexDirection: 'row', marginRight: 'auto !important'}}>
                <button style={getButtonStyle('1')}>Khóa học</button>
                <button style={getButtonStyle('2')}>Tiến độ học tập</button>
            </div>
        </div>

        <div style={{margin: '30px auto'}}>
            <div className="lesson-list-container" style={{position: 'relative'}}>
                <button onClick={() => setShowList(!showList)}
                        style={{padding: '10px 20px', fontSize: '16px', cursor: 'pointer', border: '1px solid #3738E2', borderRadius: '8px'}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16" style={{color: '#3738E2'}}>
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                    </svg>
                </button>
                {showList && (
                    <ul className="lesson-list" 
                        style={{ position: 'absolute',
                                top: '100%',
                                left: '0',
                                background: 'white',
                                border: '1px solid #ccc',
                                listStyle: 'none',
                                padding: '0',
                                margin: '0',
                                zIndex: 1000,
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',}}
                    >
                    {lessons.map((lesson, index) => (
                        <li
                        key={index}
                        onMouseEnter={() => setHoveredItem(index)}
                        onMouseLeave={() => setHoveredItem(null)}
                        >
                        {lesson.title}
                        {hoveredItem === index && (
                            <ul className="sublist" 
                                style={{position: 'absolute',
                                        top: '0',
                                        left: '100%',
                                        background: 'white',
                                        border: '1px solid #ccc',
                                        listStyle: 'none',
                                        padding: '10px',
                                        margin: '0',
                                        zIndex: 1001,
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        width: '400px'}}
                            >
                            {lesson.sublessons.map((sublesson, subIndex) => (
                                <li key={subIndex}>{sublesson}</li>
                            ))}
                            </ul>
                        )}
                        </li>
                    ))}
                    </ul>
                )}
                <style jsx>{`
                    .lesson-list li {
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                        position: relative;
                        
                    }
                    .lesson-list li:hover {
                        background: #f9f9f9;
                    }
                    .sublist li {
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                        width: auto;
                    }
                    .sublist li:hover {
                        background: #f1f1f1;
                    }
                `}</style>
            </div>
        </div>
        
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px'}}>
            <div style={{flex: 1, justifyContent: 'flex-start', marginRight: '32px', borderBottom: '1px solid #D4D4D4', marginTop: '20px'}}>
                <button style={getButton('option1')} onClick={() => setSelectedButton('option1')}>
                    <span style={getSpan('option1')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book-half" viewBox="0 0 16 16">
                            <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                        </svg>
                    </span>
                </button>
                <button style={getButton('option2')} onClick={() => setSelectedButton('option2')}>
                    <span style={getSpan('option2')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book-half" viewBox="0 0 16 16">
                            <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                        </svg>
                    </span>
                </button>
            </div>

            <div style={{height: '44px', margin: '0', border: '0', marginTop: '20px'}}>
                <button style={getNext('option1')}
                        onClick={() => handleClick('option1')}
                        disabled={selectedButton === 'option1'}>
                    Trang trước
                </button>
                <button style={getNext('option2')}
                        onClick={() => handleClick('option2')}
                        disabled={selectedButton === 'option2'}>
                    Trang sau
                </button>
            </div>
        </div>            
        

        { selectedButton == 'option1' ? (
        <div>
            <h2 style={{marginBottom: '30px', fontSize: '1.5em', fontWeight: '600', lineHeight: '1.4em'}}>Slide bài giảng</h2>
            <div>
                <h2 style={{color: '#646464'}}>PDF Viewer</h2>
                {/* Gắn link công khai của file PDF ở đây
                Link google drive bình thường sẽ có dạng https://drive.google.com/file/d/ID/view?usp=sharing
                Khi gắn link vào để xem pdf online thì dùng dạng https://drive.google.com/uc?export=download&id=ID
                Với ID là điểm chung giữa 2 link */}
                <PdfViewer fileUrl="https://drive.google.com/uc?export=download&id=13xO2B7Yavmf6Ls-zYpxgc2bwbdmJ4cAB" />
            </div>
            <div style={{margin: '32px auto'}}>
                <h2 style={{color: '#646464'}}>Tải xuống file PDF</h2>
                <ButtonDownload fileUrl="https://drive.google.com/uc?export=download&id=13xO2B7Yavmf6Ls-zYpxgc2bwbdmJ4cAB" label="Download PDF" />
            </div>
        </div>
        ) : (
        <div>
            <h2 style={{marginBottom: '30px', fontSize: '1.5em', fontWeight: '600', lineHeight: '1.4em'}}>Tài liệu đọc thêm</h2>
            <ul>
                <li>1.<a href="#">Reflections on Trusting Trust</a> by Thompson</li>
            </ul>
        </div>
        )}

        <div style={{height: '44px', border: '0', margin: '32px', display: 'flex', justifyContent: 'center'}}>
            <button style={getNext('option1')}
                    onClick={() => handleClick('option1')}
                    disabled={selectedButton === 'option1'}>
                Trang trước
            </button>
            <button style={getNext('option2')}
                    onClick={() => handleClick('option2')}
                    disabled={selectedButton === 'option2'}>
                Trang sau
            </button>
        </div>

    </div>);
};

export default DashBoardPage;