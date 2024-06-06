'use client';

import { useUserService } from '@/app/_services';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from 'react';
import { Button, Card, Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../login/page.module.css'

export default Register;

function Register() {
    const [index, setIndex] = useState(0);
    const [showLogin, setShowLogin] = useState(true);

    const [carouselslides, setCarouselSlides] = useState([
        {
            id: 1,
            linkjpg: 'https://soict.daotao.ai/asset-v1:SoICT+IT4210+2020-2+type@asset+block@banner-10.jpg',
            title: 'Hệ nhúng',
            numbermembers: 78,
            alt: 'Silde 1',
            linkbtn: ''
        },
        {
            id: 2,
            linkjpg: 'https://soict.daotao.ai/asset-v1:SoICT+IT3292+2020-2+type@asset+block@banner-19.jpg',
            title: 'Cơ sở dữ liệu',
            numbermembers: 99,
            alt: 'Slide 2',
            linkbtn: ''
        },
        {
            id: 3,
            linkjpg: 'https://soict.daotao.ai/asset-v1:EdTech+Ed120+2022+type@asset+block@asset-v1_SoICT_IT4435_2020-2_type_asset_block_banner-75.jpg',
            title: 'Web Mining',
            numbermembers: 36,
            alt: 'Slide 3',
            linkbtn: ''
        },
        {
            id: 4,
            linkjpg: 'https://soict.daotao.ai/asset-v1:SoICT+IT4772+2023-1-144959+type@asset+block@banner-90.jpg',
            title: 'Xử lý ngôn ngữ tự nhiên',
            numbermembers: 49,
            alt: 'Slide 4',
            linkbtn: ''
        }
    ])

    const [carouselcards, setCarouselCards] = useState([
        {   
            id: 1,
            linkjpg: 'https://soict.daotao.ai/asset-v1:SoICT+IT4210+2020-2+type@asset+block@banner-10.jpg',
            title: 'Hệ nhúng',
            time: '09/10/2024',
            linkbtn: ''
        },
        {   
            id: 2,
            linkjpg: 'https://soict.daotao.ai/asset-v1:SoICT+IT4152+2021-1+type@asset+block@banner-9.jpg',
            title: 'Kiến trúc phần mềm mạng',
            time: '10/11/2024',
            linkbtn: ''
        },
        {   
            id: 3,
            linkjpg: 'https://soict.daotao.ai/asset-v1:SoICT+IT3080+elearning+type@asset+block@banner-5.jpg',
            title: 'Mạng máy tính',
            time: '12/09/2024',
            linkbtn: ''
        },
        {   
            id: 4,
            linkjpg: 'https://soict.daotao.ai/asset-v1:SoICT+IT4172+2023-1-143612+type@asset+block@banner-65.jpg',
            title: 'Xử lý tín hiệu',
            time: '01/09/2024',
            linkbtn: ''
        },
        {   
            id: 5,
            linkjpg: 'https://soict.daotao.ai/asset-v1:SoICT+IT3280E+2023-1-143686+type@asset+block@banner-53.jpg',
            title: 'Kiến trúc máy tính',
            time: '03/10/2024',
            linkbtn: ''
        },
        {   
            id: 6,
            linkjpg: 'https://soict.daotao.ai/asset-v1:SoICT+IT3100+2020-2+type@asset+block@banner-45.jpg',
            title: 'Lập trình HĐT',
            time: '12/11/2024',
            linkbtn: ''
        },
        {   
            id: 7,
            linkjpg: 'https://soict.daotao.ai/asset-v1:SoICT+IT3070+2020-2+type@asset+block@banner-44.jpg',
            title: 'Hệ điều hành',
            time: '15/12/2024',
            linkbtn: ''
        },
        {   
            id: 8,
            linkjpg: 'https://soict.daotao.ai/asset-v1:SoICT+IT3053E+2020-2+type@asset+block@banner-43.jpg',
            title: 'Data Analyst',
            time: '04/10/2024',
            linkbtn: ''
        },
        {   
            id: 9,
            linkjpg: 'https://soict.daotao.ai/asset-v1:SoICT+IT3011+2020-2+type@asset+block@banner-39.jpg',
            title: 'CTDL & GT',
            time: '04/12/2024',
            linkbtn: ''
        },
        {   
            id: 10,
            linkjpg: 'https://soict.daotao.ai/asset-v1:SoICT+IT3020+2020-2+type@asset+block@banner-40.jpg',
            title: 'Toán rời rạc',
            time: '14/12/2024',
            linkbtn: ''
        },
        {   
            id: 11,
            linkjpg: 'https://soict.daotao.ai/asset-v1:SoICT+IT3020E+2020-2+type@asset+block@banner-41.jpg',
            title: 'Discreate Mathmatics',
            time: '30/12/2024',
            linkbtn: ''
        },
        {   
            id: 12,
            linkjpg: 'https://soict.daotao.ai/asset-v1:SoICT+IT3040+2020-2+type@asset+block@banner-42.jpg',
            title: 'Kỹ thuật lập trình',
            time: '17/11/2024',
            linkbtn: ''
        },
    ])

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const userService = useUserService();

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const fields = {
        name: register('name', { required: 'Username is required' }),
        email: register('email', { required: 'Email is required' }),
        password: register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' }
        })
    }

    async function onSubmit(user: any) {
        await userService.register(user);
    }

    return (<div>
        <div>
            <Carousel 
                activeIndex={index} 
                onSelect={handleSelect} 
                style={{margin: '50px'}} 
                interval={1500}
                prevIcon={
                    <span
                        style={{
                        display: 'inline-block',
                        width: '60px',
                        height: '60px',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        borderRadius: '50%',
                        textAlign: 'center',
                        lineHeight: '60px',
                        color: 'white',
                        fontSize: '30px',
                        cursor: 'pointer'
                        }}
                    >
                        &lt;
                    </span>
                }
                nextIcon={
                    <span
                        style={{
                        display: 'inline-block',
                        width: '60px',
                        height: '60px',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        borderRadius: '50%',
                        textAlign: 'center',
                        lineHeight: '60px',
                        color: 'white',
                        fontSize: '30px',
                        cursor: 'pointer'
                        }}
                    >
                        &gt;
                    </span>
                }
                >
                {carouselslides.map((carouselslides) => (
                    <Carousel.Item key={carouselslides.id}>
                        <div style={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img src={carouselslides.linkjpg} alt={carouselslides.alt} style={{ maxHeight: '100%', maxWidth: '100%' }}/>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Carousel.Caption style={{flex: 1, padding: '15px', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', borderRadius: '10px', margin: 'auto', textAlign: 'center', maxWidth: '28%'}}>
                                <h3>{carouselslides.title}</h3>
                                <Button>Tham gia khóa học</Button>
                                <p style={{marginTop: '10px'}}>có {carouselslides.numbermembers} thành viên</p>
                            </Carousel.Caption>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>

        <div style={{marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="container">
                <ul className="row"
                    style={{listStyle: 'none',
                            margin: 0,
                            padding: 0}}
                >
                    {carouselcards.map((carouselcards) => (
                        <li className="col-12 col-md-6 col-lg-4 col-xl-3" key={carouselcards.id}>
                            <Card style={{ width: '18rem', marginBottom: '40px'}}>
                                <Card.Img variant="top" src={carouselcards.linkjpg} />
                                <Card.Body>
                                    <Card.Title>{carouselcards.title}</Card.Title>
                                    <Card.Text>
                                        <span style={{marginBottom: 0}}>SoICT</span><br />
                                        <span>Sẽ bắt đầu: {carouselcards.time}</span>
                                    </Card.Text>
                                    <Button variant="primary">Tìm hiểu thêm</Button>
                                </Card.Body>
                            </Card> 
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {showLogin && (    
            <div className={styles.overlay}>
                <div className={styles.card}>
                    <button className={styles.closeButton} onClick={() => setShowLogin(false)}>X</button>
                    <div className={styles.cardheader}>
                        <h4 className={styles.cardtitle}>Đăng ký</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input {...fields.email} type="text" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.lastName?.message?.toString()}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input {...fields.name} type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.name?.message?.toString()}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input {...fields.password} type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.password?.message?.toString()}</div>
                            </div>
                            <button disabled={formState.isSubmitting} className="btn btn-primary w-100 mt-3">
                                {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                                Đăng ký
                            </button>
                            <div className={styles.cardlogin}>
                                <p style={{margin:0, padding:'5px'}}>Đã có tài khoản?</p>
                                <a href="/login" style={{margin:0}}>Đăng nhập</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
    </div>
    );
}
