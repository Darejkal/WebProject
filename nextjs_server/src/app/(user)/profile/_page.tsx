"use client"
import { useUserService } from "@/app/_services"
import { useEffect, useState } from "react"

export default function ProfilePage (){
    const userService=useUserService()
    useEffect(()=>{
        userService.getCurrent()
    },[])
    return (
        <div style={{padding:"0 20rem",wordWrap:"break-word"}}>
            {}
        </div>
    )
}