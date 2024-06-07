"use client";

import Link from "next/link";
import { Card, CardBody, CardHeader } from "react-bootstrap";

export default function IndexPage() {
	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				height: "100%",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Card>
				<Card.Header>Về chúng mình</Card.Header>
				<Card.Body>
					Xin chào, chúng mình là nhóm 1 môn CN Web do thầy Đỗ Bá Lâm hướng dẫn.
					<br />
					Đề tài của chúng mình là hệ thống <span style={{color:"red",fontWeight:"bold"}}>LMS</span> cho sinh viên kèm tiện ích.
				</Card.Body>
                <Card.Footer>
                    <Link href="/" style={{color:"gray"}}>Nhấn vào đây để quay lại trang chủ</Link>
                </Card.Footer>
			</Card>
		</div>
	);
}
