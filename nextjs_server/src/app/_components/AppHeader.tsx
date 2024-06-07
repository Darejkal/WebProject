"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	useUserService,
} from "@/app/_services";
import { useRouter } from "next/navigation";
import {} from "@heroicons/react/16/solid";
import { QrCodeIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

export default function AppHeader({ redirect }: { redirect?: Boolean }) {
	const [warning, setWarning] = useState(<></>);
	const userService = useUserService();
	const router = useRouter();
	useLayoutEffect(() => {
		console.log(redirect);
		userService.getCurrent(redirect);
	}, []);
	useEffect(() => {
		if(userService.currentUser&&typeof userService.currentUser.isTeacher ==="undefined"){
			userService.currentHasTeacherRole()
		}
	}, [userService.currentUser]);
	const logoutWarning = (
		<Alert variant="warning">
			<Alert.Heading>Xác nhận</Alert.Heading>
			<p>Bạn muốn đăng xuất?</p>
			<hr />
			<div className="d-flex justify-content-end">
				<Button
					onClick={() => setWarning(<></>)}
					variant="outline-danger"
					className="m-1"
				>
					Hủy
				</Button>
				<Button
					onClick={() => {
						setWarning(<></>);
						userService.logout();
					}}
					variant="outline-success"
					className="m-1"
				>
					Đồng ý
				</Button>
			</div>
		</Alert>
	);
	const qrCodeWarning = (
		<Alert variant="warning">
			<Alert.Heading>Lựa chọn</Alert.Heading>
			<p>Bạn muốn quét hay tạo mã QR?</p>
			<hr />
			<div className="d-flex justify-content-end">
				<Button
					onClick={() => {
						setWarning(<></>);
						router.push("/qr/scan");
					}}
					variant="outline-danger"
					className="m-1"
				>
					Quét QR
				</Button>
				<Button
					onClick={() => {
						setWarning(<></>);
						router.push("/qr/create");
					}}
					variant="outline-success"
					className="m-1"
				>
					Tạo QR
				</Button>
			</div>
		</Alert>
	);
	return (
		<div>
			{warning}
			<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
				<Container>
					<Navbar.Brand href="/landing">HustServe</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/explore">Khám phá khóa học</Nav.Link>
							{userService.currentUser?.name && (
								<>
									<Nav.Link href="/dashboard">Khóa học của tôi</Nav.Link>
									<Nav.Link href="/chat">
										<div style={{ display: "flex", flexDirection: "row" }}>
											ChitChat <ChatBubbleLeftIcon style={{ width: "1rem" }} />
										</div>
									</Nav.Link>
									{userService.currentUser?.isTeacher===true && (
										<>
											<NavDropdown title="Giáo viên" id="basic-nav-dropdown">
												{/* <NavDropdown.Item href="/teacher/dashboard">
													Thống kê
												</NavDropdown.Item>
												<NavDropdown.Divider /> */}
												<NavDropdown.Item href="/teacher/manage/subjectinstance">
													Quản lý lớp học
												</NavDropdown.Item>
												<NavDropdown.Item href="/teacher/manage/exam">
													Ngân hàng đề
												</NavDropdown.Item>
											</NavDropdown>
										</>
									)}
									{userService.currentUser?.position === "admin" && (
										<>
											<NavDropdown title="Quản lý" id="basic-nav-dropdown">
												{/* <NavDropdown.Item href="/admin">
													Thống kê
												</NavDropdown.Item>
												<NavDropdown.Divider /> */}
												<NavDropdown.Item href="/admin/manage/user">
													Quản lý người dùng
												</NavDropdown.Item>
												<NavDropdown.Item href="/admin/manage/subject">
													Quản lý môn học
												</NavDropdown.Item>
												<NavDropdown.Item href="/admin/manage/subjectinstance">
													Quản lý lớp học
												</NavDropdown.Item>
											</NavDropdown>
										</>
									)}
								</>
							)}
						</Nav>
						{userService.currentUser?.name ? (
							<Nav>
								<Nav.Link href="#qr" onClick={() => setWarning(qrCodeWarning)}>
									<div style={{ display: "flex", flexDirection: "row" }}>
										Điểm danh QR
										<QrCodeIcon title="QR" style={{ width: "1rem" }} />
									</div>
								</Nav.Link>
								<Nav.Link href="/profile">
									{userService.currentUser.name}
								</Nav.Link>
								<Nav.Link
									href="#logout"
									onClick={() => setWarning(logoutWarning)}
								>
									Đăng xuất
								</Nav.Link>
							</Nav>
						) : (
							<Nav>
								<Nav.Link href="/login">Đăng nhập</Nav.Link>
								<Nav.Link href="/signup">Đăng ký</Nav.Link>
							</Nav>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}
