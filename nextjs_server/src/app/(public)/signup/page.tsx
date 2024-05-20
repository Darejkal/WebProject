'use client';

import { useUserService } from '@/app/_services';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import styles from '../login/page.module.css'

export default Register;

function Register() {
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

    return (
        <div className={styles.contain}>
            <div className={styles.card}>
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
    );
}
