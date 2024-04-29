'use client'

import { sign } from "crypto";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function IndexPage(){
    const router = useRouter()

    const loginbtn = () => {
        router.push("/user/login")
    }

    const signupbtn = () => {
        router.push("/user/signup")
    }

    return (<div className="d-flex flex-column h-100 w-100 justify-content-center align-items-center">
        <Button variant="success" onClick={() => loginbtn()}>Login</Button><br /><br />
        <Button variant="primary" onClick={() => signupbtn()}>Signup</Button>
    </div>);
}