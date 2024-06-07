"use client";
import SearchableInput from "@/app/_components/SearchableInput";
import { useFetch } from "@/app/_helpers/client";
import { IServiceQuestion } from "@/app/_services/useExamService";
import { Create } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function AddQuestionModal() {
	const [showModal, setShowModal] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState,
		setValue,
		getValues,
		control,
		watch,
		setFocus,
		setError,
		clearErrors,
	} = useForm();
	const { errors } = formState;
	const fetch = useFetch();
	const optionFields = useFieldArray({
		control,
		name: "choices",
	});
	const optionScoreFields = useFieldArray({
		control,
		name: "choicescores",
	});
	const fields = {
		question: register("question", {
			required: "Nội dung câu hỏi là bắt buộc!",
		}),
		category: register("category"),
		numchoice: register("numchoice", {
			required: "Số câu hỏi là bắt buộc!",
		}),
	};
	const numChoice = watch("numchoice");

	useEffect(() => {
		const curChoice = optionFields.fields.length;
		let value = parseInt(numChoice, 10);
		if (value < 0) {
			value = 0;
			setError(fields.numchoice.name, {
				message: "Số câu hỏi phải là số không âm!",
			});
		} else if (value > 10) {
			value = 10;
			setError(fields.numchoice.name, {
				message: "Số câu hỏi bị giới hạn bởi 10!",
			});
		} else if (Number.isNaN(value)) {
			value = 0;
			setError(fields.numchoice.name, {
				message: "Số câu phải là số nguyên.",
			});
		} else {
			clearErrors(fields.numchoice.name);
		}
		if (value > curChoice) {
			for (let i = curChoice; i < value; i++) {
				optionFields.append({ value: "" });
				optionScoreFields.append({ value: "0" });
			}
		} else if (value < curChoice) {
			for (let i = curChoice; i > value; i--) {
				optionFields.remove(i - 1);
				optionScoreFields.remove(i - 1);
			}
		}
		setFocus(fields.numchoice.name);
	}, [
		numChoice,
		optionFields.append,
		optionFields.remove,
		optionFields.fields.length,
	]);
	const onSubmit = (props: any) => {
		const {
			question,
			category,
			choices,
			choicescores,
		}: {
			question: string;
			category: string;
			choices: { value: string }[];
			choicescores: { value: string }[];
		} = props;
		// @ts-ignore
		let errorIndex = choicescores.findIndex((v) => isNaN(v.value));
		if (errorIndex > -1) {
			setError(`choicescores.${errorIndex}.value`, { message: "" });
			return;
		}
		let choicePackage = choices.map((v, i) => ({
			score: Number(choicescores[i].value),
			text: v.value,
		}));
		toast.info("Đang thực hiện truy vấn....");
		fetch
			.post("/api/question/create", {
				question,
				category,
				options: choicePackage,
			})
			.then(() => {
				toast.dismiss();
				toast.success("Thêm câu hỏi thành công!", { delay: 200 });
				setShowModal(false);
				setValue(fields.numchoice.name, "");
				setValue(fields.category.name, "");
				setValue(fields.question.name, "");
			})
			.catch((e: any) => {
				toast.dismiss();
				toast.warning("Thêm câu hỏi thất bại!", { delay: 200 });
			});
	};
	return (
		<>
			<Button
				variant="outline-primary"
				style={{ minWidth: "3rem" }}
				onClick={() => {
					setShowModal(true);
				}}
			>
				Thêm câu hỏi mới <Create />
			</Button>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Tạo câu hỏi</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Label>
						Tạo mẫu câu hỏi mới bằng cách điền các thông tin sau:
					</Form.Label>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group controlId="question">
							<Form.Label>Câu hỏi</Form.Label>
							<TextField
								fullWidth
								label="Nhập câu hỏi"
								{...fields.question}
								ref={fields.question.ref}
								error={!!errors[fields.question.name]}
								helperText={
									(errors[fields.question.name]?.message as string) ?? ""
								}
							/>
						</Form.Group>
						<Form.Group controlId="category" style={{ marginTop: "1rem" }}>
							<Form.Label>Phân loại câu hỏi</Form.Label>
							<TextField
								label={"Phân loại"}
								fullWidth
								{...fields.category}
								inputRef={fields.category.ref}
								error={!!errors[fields.category.name]}
								helperText={
									(errors[fields.category.name]?.message as string) ?? ""
								}
							/>
						</Form.Group>
						<Form.Group controlId="category" style={{ marginTop: "1rem" }}>
							<Form.Label>Số lựa chọn trả lời</Form.Label>
							<TextField
								label={"Số câu trả lời"}
								fullWidth
								{...fields.numchoice}
								inputRef={fields.numchoice.ref}
								error={!!errors[fields.numchoice.name]}
								helperText={
									(errors[fields.numchoice.name]?.message as string) ?? ""
								}
							/>
						</Form.Group>
						{numChoice > 0 && (
							<Form.Group style={{ marginTop: "1rem" }}>
								<Form.Label>Các đáp án</Form.Label>
								{optionFields.fields.map((v, index) => {
									let choiceField = register(`choices.${index}.value`);
									let scoreField = register(`choicescores.${index}.value`);
									return (
										<div
											style={{
												...(index != 0 ? { marginTop: "1rem" } : {}),
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
											}}
											key={v.id + optionScoreFields.fields[index].id}
										>
											<TextField
												key={v.id}
												label={`Đáp án ${index + 1}`}
												sx={{ width: "75%" }}
												{...choiceField}
												inputRef={choiceField.ref}
												error={
													!!errors?.choices &&
													(errors?.choices as any).length > index &&
													(errors?.choices as any)[index]?.value
												}
												helperText={
													(errors?.choices &&
														(errors?.choices as any).length > index &&
														((errors?.choices as any)[index]?.value
															?.message as string)) ??
													""
												}
											/>
											<TextField
												key={optionScoreFields.fields[index].id}
												label={`Điểm số`}
												sx={{ width: "20%" }}
												{...scoreField}
												inputRef={scoreField.ref}
												error={
													!!!!errors?.choicescores &&
													(errors?.choicescores as any).length > index &&
													(errors?.choicescores as any)[index]?.value
												}
												helperText={
													(errors?.choicescores &&
														(errors?.choicescores as any).length > index &&
														((errors?.choicescores as any)[index]?.value
															?.message as string)) ??
													""
												}
											/>
										</div>
									);
								})}
							</Form.Group>
						)}
						<Button
							variant="primary"
							type="submit"
							style={{ margin: "1rem auto 0", display: "block" }}
						>
							Submit
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}
export function ExamPreview(props: { data: IServiceQuestion[] }) {
	const [timesUp, setTimesUp] = useState<boolean>(false);
	const handleAnswerChange = (props: any) => {};
	const handleSubmit = (props: any) => {};

	return (
		<div style={{ width: "90%",height:"70%", padding: "1rem 2rem",overflowY:"scroll" ,maxHeight:"60vh",border:"0.2rem solid",borderRadius:"10px"}}>
			{props.data.map((question, index) => (
				<div key={question.uuid} style={{marginBottom:"1rem"}}>
					<h3
						style={{
							marginBottom: "12px",
							color: "#fff",
							fontSize: "18px",
							fontWeight: 600,
							backgroundColor: "#2F58CD",
							borderRadius: "16px",
							textAlign: "center",
							display: "inline-block",
							padding: "2px 10px",
						}}
					>
						Câu hỏi {index + 1}
					</h3>
					<p style={{ marginBottom: "12px" }}>
						Câu {index + 1}. {question.question}
					</p>
					{(!question?.options || question.options.length == 0) && (
						<p className="text-muted">Câu hỏi không có đáp án</p>
					)}
					{question.options &&
						question.options.map((option) => (
							<div
								key={option.uuid}
								style={{
									minWidth: "100px",
									width: "auto !important",
									marginBottom: "1rem",
								}}
							>
								<label>
									<input
										type="radio"
										// name={`question_${question.id}`}
										value={option.uuid}
										onChange={() =>
											handleAnswerChange({
												questionid: question.uuid,
												optionid: option.uuid,
											})
										}
										disabled={timesUp}
										style={{ top: "1rem", left: 0, width: "1rem", margin: 0 }}
									/>
									<span
										style={{
											padding: "1rem !important",
											border: "0 !important",
											color: "#212121 !important",
											marginBottom: 0,
											marginLeft: "0",
										}}
									>
										{option.text}
									</span>
								</label>
							</div>
						))}
					<div style={{ marginTop: "1rem" }}>
						<button
							onClick={() => handleSubmit(question.uuid)}
							disabled={timesUp}
							style={{
								color: "#fff",
								background: "#3738E2",
								borderRadius: "10px",
								border: "none",
								padding: "0.8rem 1.4rem",
							}}
						>
							Gửi
						</button>
					</div>
					<div>
						{/* {question.submitted && <p style={{ float: 'left', marginTop: '10px', padding: '8px 10px 4px 10px', lineHeight: '1.5em' }}>Câu trả lời đã được gửi đi</p>} */}
					</div>
				</div>
			))}
		</div>
	);
}
