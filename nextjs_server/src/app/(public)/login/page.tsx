'use client';

import { useUserService } from "@/app/_services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import styles from './page.module.css'
import { toast } from "react-toastify";


export default function LoginPage(){
    const userService = useUserService();
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const router=useRouter()
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        userService.getCurrent()
    },[])
    useEffect(()=>{
        if(userService.currentUser){
            router.push("/dashboard")
        }
        setLoading(false)
    },[userService])
    const fields = {
        email: register('email', { required: 'Username is required' }),
        password: register('password', { required: 'Password is required' })
    };
    async function onSubmit({ email, password }:any) {
        let info_toast=toast.info("Logging in")
        try{
            const res=await userService.login(email, password);
            toast.dismiss(info_toast)
            toast.success("Logged in",{delay:500})
        } catch(e:any){
            toast.dismiss(info_toast)
            toast.warning(e);
        }
    }
    if(loading){
        return <div>Loading</div>
    }
    return(
        <div className={styles.contain}>
            <div className={styles.card}>
                <div className={styles.cardheader}>
                    <h4 className={styles.cardtitle}>Đăng nhập</h4>
                </div>
                <div className={styles.cardbody}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input {...fields.email} type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message?.toString()}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mật khẩu</label>
                            <input {...fields.password} type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message?.toString()}</div>
                        </div>
                        <div className={styles.cardforget}>
                            <a href="/dashboard">Quên mật khẩu</a>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary w-100">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Đăng nhập
                        </button>
                        <div className={styles.cardlinebox}>
                            <div className={styles.cardline}>
                                <p className={styles.cardline1}>Chưa có tài khoản?</p>
                            </div>
                            <Button href="/signup" className={styles.cardbtn}>Tạo tài khoản mới</Button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}