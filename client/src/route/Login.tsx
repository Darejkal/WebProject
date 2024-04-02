import React from "react";
import LoginStyle from "../static/css/Login.module.scss"
type LoginProps = {
	children?: React.ReactNode;
};
export const Login = ({ children }: LoginProps) => {
	return (
		<div>
			<div className={LoginStyle.container}>
				<div className={LoginStyle.top}></div>
				<div className={LoginStyle.bottom}></div>
				<div className={LoginStyle.center}>
					<h2> Đăng nhập hệ thông</h2>
					<input type="email" placeholder="email"></input>
					<input type="password" placeholder="password"></input>
					<div>
						Không có tài khoản? <a href="">Đăng ký</a>
					</div>
				</div>
			</div>
		</div>
	);
};
