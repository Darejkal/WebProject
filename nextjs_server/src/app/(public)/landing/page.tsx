'use client'

import { useRouter } from "next/navigation";
import { SetStateAction, useState, useEffect } from "react";
import React from 'react';
import { useUserService } from "@/app/_services"
import { Button, Card, Carousel, Container, Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LandingPage(){
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return(<div>
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
                <Carousel.Item>
                    <div style={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="https://soict.daotao.ai/asset-v1:SoICT+IT4210+2020-2+type@asset+block@banner-10.jpg" alt="First Slide" style={{ maxHeight: '100%', maxWidth: '100%' }}/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Carousel.Caption style={{flex: 1, padding: '15px', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', borderRadius: '10px', margin: 'auto', textAlign: 'center', maxWidth: '28%'}}>
                            <h3>Hệ nhúng</h3>
                            <Button>Tham gia khóa học</Button>
                            <p style={{marginTop: '10px'}}>có 78 thành viên</p>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>
                <Carousel.Item >
                    <div style={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="https://soict.daotao.ai/asset-v1:SoICT+IT3292+2020-2+type@asset+block@banner-19.jpg" alt="Seconde Slide" style={{ maxHeight: '100%', maxWidth: '100%' }}/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Carousel.Caption style={{flex: 1, padding: '15px', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', borderRadius: '10px', margin: 'auto', textAlign: 'center', maxWidth: '28%'}}>
                            <h3>Cơ sở dữ liệu</h3>
                            <Button>Tham gia khóa học</Button>
                            <p style={{marginTop: '10px'}}>có 99 thành viên</p>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div style={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="https://soict.daotao.ai/asset-v1:EdTech+Ed120+2022+type@asset+block@asset-v1_SoICT_IT4435_2020-2_type_asset_block_banner-75.jpg" alt="Third Slide" style={{ maxHeight: '100%', maxWidth: '100%' }}/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Carousel.Caption style={{flex: 1, padding: '15px', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', borderRadius: '10px', margin: 'auto', textAlign: 'center', maxWidth: '28%'}}>
                            <h3>Web Mining</h3>
                            <Button>Tham gia khóa học</Button>
                            <p style={{marginTop: '10px'}}>có 53 thành viên</p>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div  style={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src="https://soict.daotao.ai/asset-v1:SoICT+IT4772+2023-1-144959+type@asset+block@banner-90.jpg" alt="Other Slide" style={{ maxHeight: '100%', maxWidth: '100%' }}/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Carousel.Caption style={{flex: 1, padding: '15px', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', borderRadius: '10px', margin: 'auto', textAlign: 'center', maxWidth: '28%'}}>
                            <h3>Xử lý ngôn ngữ tự nhiên</h3>
                            <Button>Tham gia khóa học</Button>
                            <p style={{marginTop: '10px'}}>có 38 thành viên</p>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>

        <div style={{marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="container">
                <ul className="row"
                    style={{listStyle: 'none',
                            margin: 0,
                            padding: 0}}
                >
                    <li className="col-12 col-md-6 col-lg-4 col-xl-3" style={{margin: 'auto', padding: '10px'}}>
                        <Card style={{ width: '18rem', marginBottom: '40px'}}>
                            <Card.Img variant="top" src="https://soict.daotao.ai/asset-v1:SoICT+IT4210+2020-2+type@asset+block@banner-10.jpg"  className="img-fluid"/>
                            <Card.Body>
                                <Card.Title>Hệ nhúng</Card.Title>
                                <Card.Text>
                                    <p style={{marginBottom: 0}}>SoICT</p>
                                    <span>Sẽ bắt đầu:09/10/2024</span>
                                </Card.Text>
                                <Button variant="primary">Tìm hiểu thêm</Button>
                            </Card.Body>
                        </Card> 
                    </li>
                    <li className="col-12 col-md-6 col-lg-4 col-xl-3" style={{margin: 'auto', padding: '10px'}}>
                        <Card style={{ width: '18rem', marginBottom: '40px'}}>
                            <Card.Img variant="top" src="https://soict.daotao.ai/asset-v1:SoICT+IT4152+2021-1+type@asset+block@banner-9.jpg"/>
                            <Card.Body>
                                <Card.Title>Kiến trúc phần mềm mạng</Card.Title>
                                <Card.Text>
                                    <p style={{marginBottom: 0}}>SoICT</p>
                                    <span>Sẽ bắt đầu:10/11/2024</span>
                                </Card.Text>
                                <Button variant="primary">Tìm hiểu thêm</Button>
                            </Card.Body>
                        </Card> 
                    </li>
                    <li className="col-12 col-md-6 col-lg-4 col-xl-3" style={{margin: 'auto', padding: '10px'}}>
                        <Card style={{ width: '18rem', marginBottom: '40px'}}>
                            <Card.Img variant="top" src="https://soict.daotao.ai/asset-v1:SoICT+IT3080+elearning+type@asset+block@banner-5.jpg" />
                            <Card.Body>
                                <Card.Title>Mạng máy tính</Card.Title>
                                <Card.Text>
                                    <p style={{marginBottom: 0}}>SoICT</p>
                                    <span>Sẽ bắt đầu:01/12/2024</span>
                                </Card.Text>
                                <Button variant="primary">Tìm hiểu thêm</Button>
                            </Card.Body>
                        </Card> 
                    </li>
                    <li className="col-12 col-md-6 col-lg-4 col-xl-3" style={{margin: 'auto', padding: '10px'}}>
                        <Card style={{ width: '18rem', marginBottom: '40px'}}>
                            <Card.Img variant="top" src="https://soict.daotao.ai/asset-v1:SoICT+IT4172+2023-1-143612+type@asset+block@banner-65.jpg" />
                            <Card.Body>
                                <Card.Title>Xử lý tín hiệu</Card.Title>
                                <Card.Text>
                                    <p style={{marginBottom: 0}}>SoICT</p>
                                    <span>Sẽ bắt đầu:12/11/2024</span>
                                </Card.Text>
                                <Button variant="primary">Tìm hiểu thêm</Button>
                            </Card.Body>
                        </Card> 
                    </li>
                    <li className="col-12 col-md-6 col-lg-4 col-xl-3">
                        <Card style={{ width: '18rem', marginBottom: '40px'}}>
                            <Card.Img variant="top" src="https://soict.daotao.ai/asset-v1:SoICT+IT3280E+2023-1-143686+type@asset+block@banner-53.jpg" />
                            <Card.Body>
                                <Card.Title>Kiến trúc máy tính</Card.Title>
                                <Card.Text>
                                    <p style={{marginBottom: 0}}>SoICT</p>
                                    <span>Sẽ bắt đầu:24/10/2024</span>
                                </Card.Text>
                                <Button variant="primary">Tìm hiểu thêm</Button>
                            </Card.Body>
                        </Card> 
                    </li>
                    <li className="col-12 col-md-6 col-lg-4 col-xl-3">
                        <Card style={{ width: '18rem', marginBottom: '40px'}}>
                            <Card.Img variant="top" src="https://soict.daotao.ai/asset-v1:SoICT+IT3100+2020-2+type@asset+block@banner-45.jpg" />
                            <Card.Body>
                                <Card.Title>Lập trình HĐT</Card.Title>
                                <Card.Text>
                                    <p style={{marginBottom: 0}}>SoICT</p>
                                    <span>Sẽ bắt đầu:01/09/2024</span>
                                </Card.Text>
                                <Button variant="primary">Tìm hiểu thêm</Button>
                            </Card.Body>
                        </Card> 
                    </li>
                    <li className="col-12 col-md-6 col-lg-4 col-xl-3">
                        <Card style={{ width: '18rem', marginBottom: '40px'}}>
                            <Card.Img variant="top" src="https://soict.daotao.ai/asset-v1:SoICT+IT3070+2020-2+type@asset+block@banner-44.jpg" />
                            <Card.Body>
                                <Card.Title>Hệ điều hành</Card.Title>
                                <Card.Text>
                                    <p style={{marginBottom: 0}}>SoICT</p>
                                    <span>Sẽ bắt đầu:02/07/2024</span>
                                </Card.Text>
                                <Button variant="primary">Tìm hiểu thêm</Button>
                            </Card.Body>
                        </Card> 
                    </li>
                    <li className="col-12 col-md-6 col-lg-4 col-xl-3">
                        <Card style={{ width: '18rem', marginBottom: '40px'}}>
                            <Card.Img variant="top" src="https://soict.daotao.ai/asset-v1:SoICT+IT3053E+2020-2+type@asset+block@banner-43.jpg" />
                            <Card.Body>
                                <Card.Title>Data Analyst</Card.Title>
                                <Card.Text>
                                    <p style={{marginBottom: 0}}>SoICT</p>
                                    <span>Sẽ bắt đầu:10/12/2024</span>
                                </Card.Text>
                                <Button variant="primary">Tìm hiểu thêm</Button>
                            </Card.Body>
                        </Card> 
                    </li>
                    <li className="col-12 col-md-6 col-lg-4 col-xl-3">
                        <Card style={{ width: '18rem', marginBottom: '40px'}}>
                            <Card.Img variant="top" src="https://soict.daotao.ai/asset-v1:SoICT+IT3011+2020-2+type@asset+block@banner-39.jpg" />
                            <Card.Body>
                                <Card.Title>CTDL vs GT</Card.Title>
                                <Card.Text>
                                    <p style={{marginBottom: 0}}>SoICT</p>
                                    <span>Sẽ bắt đầu:12/12/2024</span>
                                </Card.Text>
                                <Button variant="primary">Tìm hiểu thêm</Button>
                            </Card.Body>
                        </Card> 
                    </li>
                    <li className="col-12 col-md-6 col-lg-4 col-xl-3">
                        <Card style={{ width: '18rem', marginBottom: '40px'}}>
                            <Card.Img variant="top" src="https://soict.daotao.ai/asset-v1:SoICT+IT3020+2020-2+type@asset+block@banner-40.jpg" />
                            <Card.Body>
                                <Card.Title>Toán rời rạc</Card.Title>
                                <Card.Text>
                                    <p style={{marginBottom: 0}}>SoICT</p>
                                    <span>Sẽ bắt đầu:11/12/2024</span>
                                </Card.Text>
                                <Button variant="primary">Tìm hiểu thêm</Button>
                            </Card.Body>
                        </Card> 
                    </li>
                    <li className="col-12 col-md-6 col-lg-4 col-xl-3">
                        <Card style={{ width: '18rem', marginBottom: '40px'}}>
                            <Card.Img variant="top" src="https://soict.daotao.ai/asset-v1:SoICT+IT3020E+2020-2+type@asset+block@banner-41.jpg" />
                            <Card.Body>
                                <Card.Title>Discreate Mathmatics</Card.Title>
                                <Card.Text>
                                    <p style={{marginBottom: 0}}>SoICT</p>
                                    <span>Sẽ bắt đầu:01/10/2024</span>
                                </Card.Text>
                                <Button variant="primary">Tìm hiểu thêm</Button>
                            </Card.Body>
                        </Card> 
                    </li>
                    <li className="col-12 col-md-6 col-lg-4 col-xl-3">
                        <Card style={{ width: '18rem', marginBottom: '40px'}}>
                            <Card.Img variant="top" src="https://soict.daotao.ai/asset-v1:SoICT+IT3040+2020-2+type@asset+block@banner-42.jpg" />
                            <Card.Body>
                                <Card.Title>Kỹ thuật lập trình</Card.Title>
                                <Card.Text>
                                    <p style={{marginBottom: 0}}>SoICT</p>
                                    <span>Sẽ bắt đầu:03/09/2024</span>
                                </Card.Text>
                                <Button variant="primary">Tìm hiểu thêm</Button>
                            </Card.Body>
                        </Card> 
                    </li>
                </ul>
            </div>
        </div>
    </div>);
}