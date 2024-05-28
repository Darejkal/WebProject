"use client";

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { SetStateAction, useState, useEffect } from "react";
import React from "react";
import { useUserService } from "@/app/_services";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
function CustomInput({ label }: { label: string }) {
	return (
		<div style={{ margin: "0 0 1rem 0" }}>
			<div
				style={{
					width: "30%",
					verticalAlign: "top",
					display: "inline-block",
					position: "relative",
					minWidth: "40%",
				}}
			>
				<label
					htmlFor=""
					style={{ display: "block", width: "auto", marginBottom: "0.5rem" }}
				>
					{label}
				</label>
				<input
					type="text"
					style={{
						height: "2.3rem",
						border: "1px solid #D4D4D4",
						borderRadius: "6px",
						color: "#171717",
						fontSize: "1rem",
						lineHeight: 1.4,
						padding: "0.3rem 0.5rem",
						display: "block",
						width: "80%",
					}}
				/>
			</div>
		</div>
	);
}
export default function ProfilePage() {
	const userService = useUserService();
	useEffect(() => {
		userService.getCurrent();
	}, []);
	const years = Array.from({ length: 2024 - 1924 + 1 }, (_, i) => 1924 + i);

	return (
		<div className="" style={{ margin: "1rem 10rem" }}>
			<div>
				<h2
					style={{
						color: "#171717",
						paddingTop: 0,
						fontWeight: 700,
						margin: "2rem 0",
					}}
				>
					Thiết lập tài khoản
				</h2>
			</div>

			<div style={{ borderTop: "1px solid #dfe3e6", paddingTop: "40px" }}>
				<h3
					style={{
						paddingTop: 0,
						color: "#171717",
						lineHeight: 1.4,
						marginBottom: "1rem",
						fontWeight: 600,
					}}
				>
					Thông tin tài khoản cơ bản
				</h3>

				<p
					style={{
						lineHeight: 1.5,
						color: "#404040",
						paddingBottom: "1.5rem",
						marginTop: 0,
					}}
				>
					Thiết lập thông tin cơ bản về tài khoản của bạn.
				</p>

				<div
					style={{
						lineHeight: 1.5,
						textShadow: "none !important",
						borderBottom: "1px solid #dfe3e6",
						margin: "0 0 40px",
						paddingBottom: "24px",
					}}
				>
					<CustomInput label={"Tên đăng nhập"}></CustomInput>
					<CustomInput label={"Tên đầy đủ"}></CustomInput>
					<CustomInput label={"Địa chỉ Email (Đăng nhập)"}></CustomInput>
					<CustomInput label={"Số điện thoại"}></CustomInput>
					<CustomInput label={"Đặt lại mật khẩu"}></CustomInput>
				</div>

				<div>
					<h3
						style={{
							paddingTop: 0,
							color: "#171717",
							lineHeight: 1.4,
							marginBottom: "8px",
							fontWeight: 600,
						}}
					>
						Thông tin thêm
					</h3>

					<div style={{ display: "flex", flexWrap: "wrap" }}>
						<div style={{ flexBasis: "50%", padding: "5px 0" }}>
							<div
								style={{
									verticalAlign: "top",
									display: "inline-block",
									position: "relative",
									width: "80%",
									marginBottom: "15px",
								}}
							>
								<label htmlFor="" style={{ margin: "4px" }}>
									Học vấn cao nhất
								</label>
								<DropdownButton
									id="dropdown-basic-button"
									title={"Chọn một mục"}
									// onSelect={handleSelect1}
									variant="Secondary"
								>
									<Dropdown.Item eventKey="Tiến sĩ">Tiến sĩ</Dropdown.Item>
									<Dropdown.Item eventKey="Thạc sĩ">Thạc sĩ</Dropdown.Item>
									<Dropdown.Item eventKey="Cử nhân">Cử nhân</Dropdown.Item>
									<Dropdown.Item eventKey="Trung học">Trung học</Dropdown.Item>
									<Dropdown.Item eventKey="Tiểu học">Tiểu học</Dropdown.Item>
									<Dropdown.Item eventKey="Other education">
										Other education
									</Dropdown.Item>
								</DropdownButton>
							</div>
						</div>

						<div style={{ flexBasis: "50%", padding: "5px 0" }}>
							<div
								style={{
									verticalAlign: "top",
									display: "inline-block",
									position: "relative",
									width: "80%",
									marginBottom: "15px",
								}}
							>
								<label htmlFor="" style={{ margin: "4px" }}>
									Giới tính
								</label>
								<DropdownButton
									id="dropdown-basic-button"
									title={"Chọn giới tính"}
									// onSelect={handleSelect2}
									variant="Secondary"
								>
									<Dropdown.Item eventKey="Nam">Nam</Dropdown.Item>
									<Dropdown.Item eventKey="Nữ">Nữ</Dropdown.Item>
									<Dropdown.Item eventKey="Other or Prefer Not to say">
										Other or Prefer Not to say
									</Dropdown.Item>
								</DropdownButton>
							</div>
						</div>

						<div style={{ flexBasis: "50%", padding: "5px 0" }}>
							<div
								style={{
									verticalAlign: "top",
									display: "inline-block",
									position: "relative",
									width: "80%",
									marginBottom: "15px",
								}}
							>
								<label htmlFor="" style={{ margin: "4px" }}>
									Năm sinh
								</label>
								<DropdownButton
									id="dropdown-basic-button"
									title={"Chọn năm sinh"}
									// onSelect={handleSelect3}
									variant="Secondary"
									style={{ width: "100% !important" }}
								>
									<div style={{ maxHeight: "200px", overflowY: "auto" }}>
										{years.map((year) => (
											<Dropdown.Item eventKey={year} key={year}>
												{year}
											</Dropdown.Item>
										))}
									</div>
								</DropdownButton>
							</div>
						</div>

						<div style={{ flexBasis: "50%", padding: "5px 0" }}>
							<div
								style={{
									verticalAlign: "top",
									display: "inline-block",
									position: "relative",
									width: "80%",
									marginBottom: "15px",
								}}
							>
								<label htmlFor="" style={{ margin: "4px" }}>
									Ngôn ngữ ưa thích
								</label>
								<DropdownButton
									id="dropdown-basic-button"
									title={"Chọn ngôn ngữ"}
									onSelect={(v) => {}}
									variant="Secondary"
								>
									<Dropdown.Item eventKey="Tiếng Việt">
										Tiếng Việt
									</Dropdown.Item>
									<Dropdown.Item eventKey="Tiếng Anh">Tiếng Anh</Dropdown.Item>
									<Dropdown.Item eventKey="Tiếng Pháp">
										Tiếng Pháp
									</Dropdown.Item>
									<Dropdown.Item eventKey="Tiếng Đức">Tiếng Đức</Dropdown.Item>
									<Dropdown.Item eventKey="Tiếng Nhật">
										Tiếng Nhật
									</Dropdown.Item>
								</DropdownButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
