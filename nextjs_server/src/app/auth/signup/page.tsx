"use client"
import { sign } from "crypto";
import { FormEvent, useState } from "react";

export default function SignupPage() {
	const [signUpAlert,setSignUpAlert]=useState(<></>);
	function onSignup(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		
		const formData = new FormData(event.currentTarget)
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set("Access-Control-Allow-Origin",`http://${process.env.NEXT_PUBLIC_APIHOST}`)
		fetch(`http://${process.env.NEXT_PUBLIC_APIHOST}/api/signup`, {
		  method: 'POST',
		  headers:requestHeaders,
		  body: formData,
		}).then((response)=>{
			if(response.ok){
				setSignUpAlert(
					<div className="alert alert-success alert-dismissible fade show" role="alert">
						<strong>Ok:</strong> Đăng nhập thành công!
							 <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
					</div>
				)
			} else{
				throw Error("Unable to register!")
			}
		}).catch((e)=>{
			setSignUpAlert(
				<div className="alert alert-warning alert-dismissible fade show" role="alert">
					<strong>Error:</strong> Lỗi khi đăng nhập!
						 <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
				</div>
			)
		})
	 
	  }
	return (
		<form
			className="form-signin"
			role="form"
			onSubmit={onSignup}
		>
			{signUpAlert}
			<h2 className="form-signin-heading">
				<i className="fa fa-comments-o">{process.env.NEXT_PUBLIC_CHATAPPNAME}</i>
			</h2>
			<div className="lead">Đăng ký tài khoản ở đây</div>
			<input
				id="name"
				type="text"
				name="name"
				className="form-control"
				placeholder="Name"
				required
				autoFocus
			></input>
			<input
				type="email"
				name="email"
				className="form-control"
				placeholder="Email address"
				required
			></input>
			<input
				type="password"
				name="password"
				className="form-control"
				placeholder="Password"
				required
			></input>
			<button className="btn btn-lg btn-primary btn-block" type="submit">
				Sign up
			</button>
		</form>
	);
}
