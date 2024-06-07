"use client";
import { CustomInfiniteScroll } from "@/app/_components/CustomInfiniteScroll";
import SearchableInput from "@/app/_components/SearchableInput";
import { useFetch } from "@/app/_helpers/client";
import { formatDateString } from "@/app/_helpers/clientutils";
import { IServiceExam } from "@/app/_services/useExamService";
import { Create, SearchOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ClassAssignModal } from "./components";

export default function ExamPage() {
	const { getValues, register, setValue, handleSubmit } = useForm();
	const [examData, setExamData] = useState<IServiceExam[]>([]);
	const [examDataNext, setExamDataNext] = useState<string>("");
	const fields = {
		examid: register("examid", { required: "Mã bài kiểm tra là bắt buộc" }),
		name: register("name", { required: "Tên kiểm tra là bắt buộc" }),
	};
	const fetch = useFetch();
	const onSubmit = (props: any) => {};
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
					<h3>Quản lý thư viện bài kiểm tra</h3>
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
					<SearchableInput
						autocompleteProps={{
							sx: {
								width: "100%",
							},
							freeSolo: false,
							renderOption: (props, option, state, ownerState) => (
								<Box
									component="li"
									{...props}
									key={typeof option === "string" ? option : option.uuid}
								>
									{typeof option === "string"
										? option
										: `${option["name"]} | ${option["uuid"]}`}
								</Box>
							),
						}}
						fetchData={(input: string) => {
							return fetch
								.post("/api/exam/getpaginated", {
									limit: 5,
									next: "",
									query: input,
								})
								.then((v) => {
									if (v) {
										return v.results;
									} else {
										throw "empty response";
									}
								})
								.catch((e: any) => {
									return [];
								}) as Promise<IServiceExam[]>;
						}}
						props={{
							optionLabel: "name",
						}}
						formRegister={fields.name}
						textFieldProps={{
							label: (
								<>
									<span>{"Tìm kiếm form bài kiểm tra  "}</span>
									<SearchOutlined />
								</>
							),
							fullWidth: true,
						}}
						afterOnChange={({ value }) => {
							if (!value) {
								setValue(fields.examid.name, undefined);
							} else if (typeof value === "string") {
								setValue(fields.examid.name, value);
							} else {
								setValue(fields.examid.name, value.uuid);
							}
						}}
					/>
				</Form>
			</div>
			<CustomInfiniteScroll
				pagination={{
					getPaginated: (props) => {
						return fetch
							.post("/api/exam/getpaginatedbycurrent", {...props,next:examDataNext})
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
					},
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
