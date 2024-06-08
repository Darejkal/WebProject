'use client'

import { useRouter } from "next/navigation";
import { SetStateAction, useState, useEffect } from "react";
import React from 'react';
import { useUserService } from "@/app/_services"
import { Button, Card, Carousel, Container, Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { title } from "process";
import landing_img from "@/../public/static/img/landing_img.jpg.jpg";

export default function LandingPage(){
    return(
        <div>
        <img src={landing_img.src} style={{
            position:"absolute",
            left: 0, 
            right: 0, 
            top:0,
            bottom:0,
            width:"100%",
            height:"100%",
            }}/>
        <div style={{
            position:"absolute",
            left: 0, 
            right: 0, 
            top:0,
            bottom:0,
            marginLeft: "auto", 
            marginRight: "auto", 
            height:"100%",
            width:"100vw",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"row"
            }}>
                <div style={{flex:1,
                    backdropFilter:"blur(4px) opacity(0.4)",height:"100%",
                    backgroundColor:"rgba(0, 0, 0, 0.5)",
                    display:"flex",
                    width:"100%",
                    boxSizing:"border-box",
                    padding:"5rem 10rem",
                    alignItems:"start",
                    justifyContent:"center",
                    flexDirection:"column",
                    }}>
                <h1 style={{
                    backgroundImage: "linear-gradient(to left, #FFA27F, #FFE8C5)",
                    color:"transparent",
                    backgroundClip:"text",
                    WebkitBackgroundClip:"text",
                    fontSize:"6rem",
                    textShadow: `2px 2px 4px rgba(179, 147, 211, 0.1),
                    3px 4px 4px rgba(179, 147, 211, 0.15),
                    4px 6px 4px rgba(179, 147, 211, 0.2),
                    5px 8px 4px rgab(179, 147, 211, 0.25)`
                }}>
                    Hệ thống LMS HustServe
                </h1>

                </div>
                <div style={{flex:1,
                    backdropFilter:"blur(4px) opacity(0.4)",height:"100%",
                    backgroundColor:"rgba(0, 0, 0, 0.5)",
                    display:"flex",
                    width:"100%",
                    boxSizing:"border-box",
                    padding:"5rem 10rem",
                    alignItems:"start",
                    justifyContent:"center",
                    flexDirection:"column",
                }}>

                </div>
            </div>
    </div>
    );
}