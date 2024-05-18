'use client';

import { useUserService } from "@/app/_services";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import styles from './page.module.css'


export default function LoginPage(){
    const userService = useUserService();
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const fields = {
        email: register('email', { required: 'Username is required' }),
        password: register('password', { required: 'Password is required' })
    };
    async function onSubmit({ email, password }: any) {
        const res=await userService.login(email, password);
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
                            <a href="/home">Quên mật khẩu</a>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary w-100">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Đăng nhập
                        </button>
                        <div className={styles.cardlinebox}>
                            <div className={styles.cardline}>
                                <p className={styles.cardline1}>Chưa có tài khoản?</p>
                            </div>
                            <Button href="/user/signup" className={styles.cardbtn}>Tạo tài khoản mới</Button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}