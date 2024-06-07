"use client";
import SearchableMultiInput from "@/app/_components/SearchableMultiInput";
import { useFetch } from "@/app/_helpers/client/useFetch";
import {
	IServiceExam,
	IServiceQuestion,
	useExamService,
} from "@/app/_services/useExamService";
import { Create } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddQuestionModal, ExamPreview } from "./components";
export default function CreateExamPage() {
	const { register, handleSubmit, formState, setValue, setError } =
		useForm<IServiceExam>();
	const { errors } = formState;
	const examService = useExamService();
	const router = useRouter();
	const fetch = useFetch();
	const fields = {
		questionids: register("questionids"),
		name: register("name", { required: "Tên bài kiểm tra là bắt buộc" }),
		category: register("category"),
	};
	const questionIDsSelected = useRef<any>();
	const [selectedQuestions, setSelectedQuestions] = useState<
		IServiceQuestion[]
	>([]);
	const onSubmit = (data: any) => {
		if(!selectedQuestions||selectedQuestions.length==0){
			setError(fields.questionids.name,{message:"Phần câu hỏi là bắt buộc"})
			return 
		}
		let {name,category} = data;
		toast.info("Đang gửi yêu cầu ....");
		examService
			.addExam({name,category,questionids:selectedQuestions.map(({uuid})=>uuid)})
			.then(() => {
				toast.dismiss();
				toast.success("Tạo bài kiểm tra thành công! Đang điều hướng...");
				router.push("/teacher/manage/exam");
			})
			.catch((e) => {
				toast.dismiss();
				toast.warning("Tạo bài kiểm tra thất bại!");
			});
	};

	return (
		<div
			style={{
				flex: 1,
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "100%",
			}}
		>
			<div
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					height: "100%",
				}}
			>
				<h3>Tạo bài kiểm tra mới</h3>
				<Form onSubmit={handleSubmit(onSubmit)} style={{ width: "40%" }}>
					<Form.Group controlId="name">
						<Form.Label>Tên bài kiểm tra</Form.Label>
						<FormControl
							type="text"
							{...fields.name}
							isInvalid={!!errors.name}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.name?.message}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId="category">
						<Form.Label>Loại</Form.Label>
						<FormControl
							type="text"
							{...fields.category}
							isInvalid={!!errors.category}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.category?.message}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId="questionids">
						<Form.Label>ID các câu hỏi</Form.Label>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								width: "100%",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<SearchableMultiInput
								autocompleteProps={{
									sx: { flex: 1 },
									multiple: true,
									freeSolo: false,
									renderOption: (props, option, state, ownerState) => (
										<Box
											component="li"
											{...props}
											key={typeof option === "string" ? option : option.uuid}
										>
											{typeof option === "string"
												? option
												: `Câu hỏi: ${option["question"]} | ID: ${option["uuid"]}`}
										</Box>
									),
								}}
								fetchData={async (input: string) => {
									return await fetch
										.post(`/api/question/getpaginatedbycurrent`, {
											next: "",
											limit: 5,
											query: input,
										})
										.then((v: { next: string; results: any[] }) => {
											if (v) {
												return v.results;
											} else {
												return [];
											}
										});
								}}
								props={{
									optionLabel: "question",
								}}
								afterOnChange={({ value }) => {
									// @ts-ignore
									setSelectedQuestions(value);
									questionIDsSelected.current = value;
								}}
								formRegister={fields.questionids}
								textFieldProps={{
									label: "Danh sách câu hỏi",
									inputRef: fields.questionids.ref,
									error: !!errors[fields.questionids.name],
									helperText:
										(errors[fields.questionids.name]?.message as string) ?? "",
								}}
							/>
						</div>
					</Form.Group>

					<Button
						variant="primary"
						type="submit"
						style={{ margin: "1rem auto 0", display: "block" }}
					>
						Submit
					</Button>
				</Form>
				<div
					style={{
						marginTop: "2rem",
						display: "flex",
						justifyContent: "end",
						alignItems: "center",
						width: "40%",
					}}
				>
					<div>
						<AddQuestionModal />
					</div>
				</div>
			</div>
			<div
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					height: "100%",
				}}
			>
				<ExamPreview data={selectedQuestions} />
			</div>
		</div>
	);
}
