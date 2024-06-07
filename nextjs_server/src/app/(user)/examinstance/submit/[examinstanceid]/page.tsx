"use client";
import { useFetch } from "@/app/_helpers/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ExamSubmitPage() {
	const { examinstanceid } = useParams();
	const fetch=useFetch();
	const router=useRouter();
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				justifyContent: "center",
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<h3>Bạn có xác nhận muốn nộp bài trước hạn?</h3>
			<br />
			<div
				style={{
					width: "20%",
					justifyContent: "space-around",
					alignItems: "center",
					display: "flex",
					flexDirection: "row",
					marginTop:"1rem"
				}}
			>
				<Button variant="outline-danger" onClick={()=>{
					fetch.post("/api/examinstance/session/close",{
						examinstanceid
					}).then(()=>{
						router.push("/dashboard")
					}).catch((e)=>{
						toast.warning("Lỗi không rõ nguyên nhân. Xin thử lại.")
					})
				}}>Nộp bài</Button>
				<Button
					variant="outline-success"
					href={"/examinstance/begin/" + examinstanceid}
				>
					Quay trở lại
				</Button>
			</div>
		</div>
	);
}
