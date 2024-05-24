'use client'

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import {Dropdown, DropdownButton} from 'react-bootstrap';
import { SetStateAction, useState, useEffect } from "react";
import React from 'react';
import { useUserService } from "@/app/_services"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProfilePage(){
    const userService=useUserService()
    // const [user,setUser]=useState<any>();
    useEffect(()=>{
        userService.getCurrent()
    },[])
    // useEffect(()=>{
    //     if(userService.currentUser){
    //         setUser(userService.currentUser)
    //     }
    // },[userService])

    const [selectedItem1, setSelectedItem1] = useState('');
    const handleSelect1 = (eventKey) => {
        setSelectedItem1(eventKey);
    };

    const [selectedItem2, setSelectedItem2] = useState('');
    const handleSelect2 = (eventKey) => {
        setSelectedItem2(eventKey);
    };

    const [selectedYear, setSelectedYear] = useState('');
    const handleSelect3 = (eventKey) => {
        setSelectedYear(eventKey);
    };
    const years = Array.from({ length: 2024 - 1924 + 1 }, (_, i) => 1924 + i);

    const [selectedItem4, setSelectedItem4] = useState('');
    const handleSelect4 = (eventKey) => {
        setSelectedItem4(eventKey);
    };

    return (<div className="" style={{marginBottom: '50px'}}>
        <div>
            <h2 style={{
                fontSize: '24px',
                color: '#171717',
                marginBottom: '32px',
                paddingTop: 0,
                fontWeight: 700,
                marginTop: '32px'
            }}>Thiết lập tài khoản</h2>
        </div>

        <div style={{borderTop: '1px solid #dfe3e6', paddingTop: '40px'}}>
            <h3 style={{
                paddingTop: 0,
                color: '#171717',
                fontSize: '20px',
                lineHeight: 1.4,
                marginBottom: '8px',
                fontWeight: 600,
            }}>Thông tin tài khoản cơ bản</h3>

            <p style={{
                fontSize: '16px',
                lineHeight: 1.5,
                color: '#404040',
                paddingBottom: '32px',
                marginTop: 0,
            }}>Thiết lập thông tin cơ bản về tài khoản của bạn.</p>
            
            <div style={{fontSize: '16px', lineHeight: 1.5, textShadow: 'none !important', borderBottom: '1px solid #dfe3e6', margin: '0 0 40px', paddingBottom: '24px'}}>
                <div style={{border: 'none', padding: '16px 0'}}>
                    <div style={{width: '30%', verticalAlign: 'top', display: 'inline-block',position: 'relative', minWidth: '40%'}}>
                        <span style={{display: 'block', width: 'auto', marginBottom: '4px'}}>Tên đăng nhập</span>
                        <span></span>
                    </div>
                </div>
                
                <div style={{border: 'none', padding: '16px 0'}}>
                    <div style={{width: '30%', verticalAlign: 'top', display: 'inline-block',position: 'relative', minWidth: '40%'}}>
                        <label htmlFor="" style={{display: 'block', width: 'auto', marginBottom: '4px'}}>Tên đầy đủ</label>
                        <input type="text" style={{
                            height: '40px',
                            border: '1px solid #D4D4D4',
                            borderRadius: '6px',
                            color: '#171717',
                            fontSize: '14px',
                            lineHeight: 1.4,
                            padding: '10px 12px',
                            display: 'block',
                            width: '80%'}}/>
                    </div>
                </div>
                
                <div style={{border: 'none', padding: '16px 0'}}>
                    <div style={{width: '30%', verticalAlign: 'top', display: 'inline-block',position: 'relative', minWidth: '40%'}}>
                        <label htmlFor="" style={{display: 'block', width: 'auto', marginBottom: '4px'}}>Địa chỉ Email (Đăng nhập)</label>
                        <input type="text" style={{
                            height: '40px',
                            border: '1px solid #D4D4D4',
                            borderRadius: '6px',
                            color: '#171717',
                            fontSize: '14px',
                            lineHeight: 1.4,
                            padding: '10px 12px',
                            display: 'block',
                            width: '80%'}}/>
                    </div>
                </div>

                <div style={{border: 'none', padding: '16px 0'}}>
                    <div style={{width: '30%', verticalAlign: 'top', display: 'inline-block',position: 'relative', minWidth: '40%'}}>
                        <label htmlFor="" style={{display: 'block', width: 'auto', marginBottom: '4px'}}>Số điện thoại</label>
                        <input type="text" style={{
                            height: '40px',
                            border: '1px solid #D4D4D4',
                            borderRadius: '6px',
                            color: '#171717',
                            fontSize: '14px',
                            lineHeight: 1.4,
                            padding: '10px 12px',
                            display: 'block',
                            width: '80%'}}/>
                    </div>
                </div>

                <div style={{border: 'none', padding: '16px 0'}}>
                    <div style={{width: '30%', verticalAlign: 'top', display: 'inline-block',position: 'relative', minWidth: '40%'}}>
                        <label htmlFor="" style={{display: 'block', width: 'auto', marginBottom: '4px'}}>Đặt lại mật khẩu</label>
                        <button style={{
                            width: 'fit-content',
                            fontSize: '16px',
                            lineHeight: 1.5,
                            padding: '8px 16px',
                            border: '1px solid #3738E2',
                            color: '#3738E2',
                            fontWeight: 500,
                            borderRadius: '8px'
                        }}>Đặt lại mật khẩu</button>
                    </div>
                </div>
            </div>

            <div>
                <h3 style={{
                    paddingTop: 0,
                    color: '#171717',
                    fontSize: '20px',
                    lineHeight: 1.4,
                    marginBottom: '8px',
                    fontWeight: 600,
                }}>Thông tin thêm</h3>

                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <div style={{flexBasis: '50%', padding: '5px 0'}}>
                        <div style={{verticalAlign: 'top', display: 'inline-block', position: 'relative', width: '80%', marginBottom: '15px'}}>
                            <label htmlFor="" style={{margin: '4px'}}>Học vấn cao nhất</label>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={selectedItem1 || 'Chọn một mục'}
                                onSelect={handleSelect1}
                                variant="Secondary"
                                
                                >
                                <Dropdown.Item eventKey="Tiến sĩ">Tiến sĩ</Dropdown.Item>
                                <Dropdown.Item eventKey="Thạc sĩ">Thạc sĩ</Dropdown.Item>
                                <Dropdown.Item eventKey="Cử nhân">Cử nhân</Dropdown.Item>
                                <Dropdown.Item eventKey="Trung học">Trung học</Dropdown.Item>
                                <Dropdown.Item eventKey="Tiểu học">Tiểu học</Dropdown.Item>
                                <Dropdown.Item eventKey="Other education">Other education</Dropdown.Item>
                            </DropdownButton>
                            
                        </div>
                    </div>

                    <div style={{flexBasis: '50%', padding: '5px 0'}}>
                        <div style={{verticalAlign: 'top', display: 'inline-block', position: 'relative', width: '80%', marginBottom: '15px'}}>
                            <label htmlFor="" style={{margin: '4px'}}>Giới tính</label>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={selectedItem2 || 'Chọn giới tính'}
                                onSelect={handleSelect2}
                                variant="Secondary"
                                
                                >
                                <Dropdown.Item eventKey="Nam">Nam</Dropdown.Item>
                                <Dropdown.Item eventKey="Nữ">Nữ</Dropdown.Item>
                                <Dropdown.Item eventKey="Other or Prefer Not to say">Other or Prefer Not to say</Dropdown.Item>
                            </DropdownButton>
                            
                        </div>
                    </div>

                    <div style={{flexBasis: '50%', padding: '5px 0'}}>
                        <div style={{verticalAlign: 'top', display: 'inline-block', position: 'relative', width: '80%', marginBottom: '15px'}}>
                            <label htmlFor="" style={{margin: '4px'}}>Năm sinh</label>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={selectedYear || 'Chọn năm sinh'}
                                onSelect={handleSelect3}
                                variant="Secondary"
                                style={{width: '100% !important'}}
                                >
                                <div style={{maxHeight: '200px', overflowY: 'auto'}}>    
                                    {years.map(year => (
                                        <Dropdown.Item eventKey={year} key={year}>{year}</Dropdown.Item>
                                    ))}
                                </div>
                            </DropdownButton>
                            
                        </div>
                    </div>

                    <div style={{flexBasis: '50%', padding: '5px 0'}}>
                        <div style={{verticalAlign: 'top', display: 'inline-block', position: 'relative', width: '80%', marginBottom: '15px'}}>
                            <label htmlFor="" style={{margin: '4px'}}>Ngôn ngữ ưa thích</label>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={selectedItem4 || 'Chọn ngôn ngữ'}
                                onSelect={handleSelect4}
                                variant="Secondary"
                                
                                >
                                <Dropdown.Item eventKey="Tiếng Việt">Tiếng Việt</Dropdown.Item>
                                <Dropdown.Item eventKey="Tiếng Anh">Tiếng Anh</Dropdown.Item>
                                <Dropdown.Item eventKey="Tiếng Pháp">Tiếng Pháp</Dropdown.Item>
                                <Dropdown.Item eventKey="Tiếng Đức">Tiếng Đức</Dropdown.Item>
                                <Dropdown.Item eventKey="Tiếng Nhật">Tiếng Nhật</Dropdown.Item>
                            </DropdownButton>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}