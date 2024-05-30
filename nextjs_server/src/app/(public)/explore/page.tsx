'use client'

import { sign } from "crypto";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUserService } from "../../_services";
import { useEffect } from "react";

export default function IndexPage(){
    const router = useRouter()
    router.push("/landing")
    const userService=useUserService()
    useEffect(()=>{
        console.log(userService.currentUser)
    })

    return <></>;
}