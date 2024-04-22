'use client';

import { useUserService } from '@/app/_services';
import Link from 'next/link';
import { useForm } from 'react-hook-form';


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
        <div className="card">
            <h4 className="card-header">Register</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
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
                    <button disabled={formState.isSubmitting} className="btn btn-primary">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Register
                    </button>
                    <Link href="/user/login" className="btn btn-link">Đăng nhập</Link>
                </form>
            </div>
        </div>
    );
}
