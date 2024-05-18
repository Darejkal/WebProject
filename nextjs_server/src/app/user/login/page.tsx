'use client';

import { useUserService } from "@/app/_services";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage(){
    const userService = useUserService();
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const router=useRouter()
    useEffect(()=>{
        try{
            userService.getCurrent()
            router.push("/home")
        } catch(e){
            // pass
        }
    },[])
    const fields = {
        email: register('email', { required: 'Username is required' }),
        password: register('password', { required: 'Password is required' })
    };
    async function onSubmit({ email, password }:any) {
        const res=await userService.login(email, password);
    }
    return(
        <div className="card">
            <h4 className="card-header">Login</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input {...fields.email} type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.email?.message?.toString()}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input {...fields.password} type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message?.toString()}</div>
                    </div>
                    <button disabled={formState.isSubmitting} className="btn btn-primary">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Login
                    </button>
                    <Link href="/user/signup" className="btn btn-link">Đăng ký</Link>
                </form>
            </div>
        </div>
    )
}