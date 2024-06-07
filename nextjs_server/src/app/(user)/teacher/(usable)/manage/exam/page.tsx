"use client";
import { CustomInfiniteScroll } from "@/app/_components/CustomInfiniteScroll";
import SearchableInput from "@/app/_components/SearchableInput";
import { useFetch } from "@/app/_helpers/client";
import { formatDateString } from "@/app/_helpers/clientutils";
import { IServiceExam } from "@/app/_services/useExamService";
import { Create, SearchOutlined } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ClassAssignModal } from "./components";
import { debounce } from "lodash";

export default function ExamPage() {
	const { getValues, register, setValue, handleSubmit } = useForm();
	const [currentQuery,setCurrentQuery]=useState<string>();
	const [examData, setExamData] = useState<IServiceExam[]>([]);
	const [examDataNext, setExamDataNext] = useState<string>("");
	const fields = {
		examid: register("examid", { required: "Mã bài kiểm tra là bắt buộc" }),
		name: register("name", { required: "Tên kiểm tra là bắt buộc" }),
	};
	const fetch = useFetch();
	const onSubmit = (props: any) => {};
	const fetchData=(props:{limit:number,query?:string, next?:string}) => {
		return fetch
			.post("/api/exam/getpaginatedbycurrent", {next:examDataNext,query:currentQuery,...props})
			.then((v) => {
				if (v) {
					setExamDataNext(v?.next);
					return v.results;
				}
				return [];
			})
			.catch((e) => {
				return [];
			});
	}
	return (
		<div style={{ margin: "3rem 10rem" }}>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					height: "100%",
				}}
			>
				<div style={{ marginRight: "auto" }}>
					<h3>Quản lý ngân hàng đề của bạn</h3>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button href="/teacher/manage/exam/create">
						<Create />
						Tạo bài kiểm tra mới
					</Button>
				</div>
			</div>
			<div style={{ marginTop: "3rem", width: "100%" }}>
				<Form
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
					}}
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						fullWidth
						label={
							(
								<>
									<span>{"Tìm kiếm mẫu đề đã tạo"}</span>
									<SearchOutlined />
								</>
							)
						}
						onChange={debounce((e)=>{
							setCurrentQuery(e.target.value===""?undefined:e.target.value);
							fetchData({limit:20,query:currentQuery,next:""}).then((v)=>{
								console.log(v);
								setExamData(v);
							})
						})}
					>

					</TextField>
				</Form>
			</div>
			{currentQuery&&(<p>Đang hiện kết quả truy vấn cho <span style={{fontWeight:"bold"}}>"{currentQuery}"</span></p>)}
			<CustomInfiniteScroll
				pagination={{
					getPaginated: fetchData,
					data: examData,
				}}
				renderItem={({ data, index }) => {
					return (
						<Card style={{marginTop:"1rem",width:"100%"}} key={data.uuid}>
							<Card.Header>Bài kiểm tra: {data.name}</Card.Header>
							<Card.Body>
								{data.category?("Kiểu loại: "+data.category+" - "):""} Tạo ngày: {formatDateString(data.createdat)}
								<br/>
								<div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"end"}}>
									<ClassAssignModal exam={data}/>
								</div>	
							</Card.Body>
						</Card>
					);
				}}
			/>
		</div>
	);
}
