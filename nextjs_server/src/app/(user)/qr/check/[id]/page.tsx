"use server";

import {
	attendanceController,
	auth,
	subjectInstanceController,
	userController,
} from "@/app/_helpers/server";

export default async function QRCheckPage({ params }: { params: { id: string } }) {
	const userClaim = auth.verifyToken();

	const { id } = params;
	try {
		if (id) {
			await attendanceController.checkin({
				userid: userClaim.id,
				attendanceid: id,
			});
		} else {
			throw "qr id not found";
		}
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<h3>Điểm danh QR thành công!</h3>
                </div>
		);
	} catch (e) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height:"100%"
				}}
			>
				<h3>Điểm danh QR không thành công! Lỗi: {JSON.stringify(e)}</h3>
			</div>
		);
	}
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<h3>Failed</h3>
		</div>
	);
}
