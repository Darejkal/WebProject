"use client";
import { useState, useEffect, useRef } from "react";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Create } from "@mui/icons-material";
import { IServiceExam, useExamService } from "@/app/_services/useExamService";
import { useSubjectService } from "@/app/_services/useSubjectService";
import { useFetch } from "@/app/_helpers/client/useFetch";
import SearchableInput from "@/app/_components/SearchableInput";
import {
	IServiceSubjectInstance,
	IServiceUserSubjectViewInstance,
} from "@/app/_services";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import moment from "moment";

export function ClassAssignModal(props: { exam: IServiceExam }) {
	const [showModal, setShowModal] = useState<boolean>(false);
	const subjectService = useSubjectService();
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
		setValue,
	} = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
		criteriaMode: "firstError",
		shouldFocusError: true,
	});
	const fetch = useFetch();
	const abbrevExisted = useRef<Boolean>();
	const fields = {
		name: register("name", { required: "Tên lớp học là bắt buộc" }),
		subjectabbrev: register("subjectabbrev", {
			required: "Mã môn học là bắt buộc",
			validate: (field) =>
				abbrevExisted.current == true || "Mã môn học chưa tồn tại!",
		}),
		subjectinstanceid: register("subjectinstanceid", {
			required: "Mã id lớp là bắt buộc",
			value: "HUST",
		}),
		testname: register("testname", {}),
		description: register("description", {}),
		endtime: register("endtime", {
		}),
	};
	useEffect(() => {
		if (!showModal) {
			abbrevExisted.current = true;
			clearErrors();
		}
	}, [showModal]);
	async function onSubmit({
		subjectinstanceid,
		testname,
		description,
		endtime,
	}: {
		subjectinstanceid: string;
		testname?: string;
		description?: string;
		endtime?: string;
	}) {
        if(!endtime){
            console.log("true")
            endtime=undefined
        }
        console.log({
            subjectinstanceid,
            testname,
            description,
            endtime,
        })
		if (abbrevExisted.current === false) {
			setError(fields.name.name, {
				message: "Lớp học chưa tồn tại!",
				type: "submit",
			});
			return;
		}
		try {
		    toast.info("Đang truy vấn!");
			await fetch.post("/api/exam/assign", {
				subjectinstanceid,
				examid: props.exam.uuid,
				name: testname,
				description,
				endtime: endtime,
			});
			setShowModal(false);
			toast.dismiss();
			toast.success("Giao bài kiểm tra thành công!", { delay: 300 });
			setShowModal(false);
		} catch (e) {
			toast.dismiss();
			toast.warning("Giao bài kiểm tra thất bại!", { delay: 300 });
		}
	}
	return (
		<>
			<Button
				variant="outline-primary"
				onClick={() => {
					setShowModal(true);
				}}
			>
				Giao bài kiểm tra cho lớp
			</Button>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Giao bài kiểm tra</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit as any)}>
						<Form.Label>
							Giao bài kiểm tra{" "}
							<span style={{ fontWeight: "bold" }}>"{props.exam.name}"</span>{" "}
							cho lớp:
						</Form.Label>
						<Form.Group controlId="abbrev">
							<Form.Label>Mã lớp học</Form.Label>
							<SearchableInput
								fetchData={(input: string) => {
									let queryParam = new URLSearchParams();
									queryParam.set("query", input);
									console.log(`search?${queryParam.toString()}`);
									return fetch
										.post("/api/subjectinstance/getpaginatedcurrent", {
											limit: 5,
											next: "",
											query: input,
										})
										.then((v) => {
											if (v) {
												return v.results;
											}
											return [];
										})
										.catch((e) => {
											return [];
										}) as Promise<IServiceUserSubjectViewInstance[]>;
								}}
								formRegister={fields.name}
								textFieldProps={{
									label: "Nhập tên lớp học",
									error: !!errors[fields.name.name],
									helperText:
										(errors[fields.name.name]?.message as string) ?? "",
								}}
								autocompleteProps={{
									freeSolo: false,
									filterOptions: (x) => x,
									renderOption: (props, option, state, ownerState) => (
										<Box
											component="li"
											{...props}
											key={
												typeof option === "string"
													? option
													: option.subjectinstanceid
											}
										>
											{typeof option === "string"
												? option
												: `Lớp: ${option["subjectinstancename"]} | Mã môn: ${option["subjectabbrev"]}`}
										</Box>
									),
								}}
								props={{
									optionLabel: "subjectinstancename",
								}}
								afterGetOptions={({ inputValue, options }) => {
									console.log("afterget");
									console.log(inputValue);
									console.log(options);
									if (inputValue) {
										let flag = options.find((v) =>
											typeof v === "string"
												? v == inputValue
												: v.subjectinstancename == inputValue
										);
										if (flag) {
											clearErrors(fields.name.name);
											abbrevExisted.current = true;
											setValue(
												fields.subjectinstanceid.name,
												typeof flag === "string" ? flag : flag.subjectinstanceid
											);
											setValue(
												fields.subjectabbrev.name,
												typeof flag === "string" ? flag : flag.subjectabbrev
											);
										} else {
											setError(fields.name.name, {
												message: "Lớp học chưa tồn tại!",
												type: "submit",
											});
											abbrevExisted.current = false;
										}
									}
								}}
								afterOnChange={({ value, options }) => {
									let valueText: string | undefined;
									if (typeof value !== "string") {
										valueText = value?.subjectinstancename;
									} else {
										valueText = value;
									}
									if (valueText) {
										let flag = options.find((v) =>
											typeof v === "string"
												? v == valueText
												: v.subjectinstancename == valueText
										);
										if (flag) {
											clearErrors(fields.name.name);
											abbrevExisted.current = true;
											setValue(
												fields.subjectinstanceid.name,
												typeof flag === "string" ? flag : flag.subjectinstanceid
											);
											setValue(
												fields.subjectabbrev.name,
												typeof flag === "string" ? flag : flag.subjectabbrev
											);
										} else {
											setError(fields.name.name, {
												message: "Lớp học chưa tồn tại!",
												type: "submit",
											});
											abbrevExisted.current = false;
										}
									}
								}}
							/>
						</Form.Group>
						<Form.Group controlId="name">
							<Form.Label>Mã lớp</Form.Label>
							<Form.Control
								type="text"
								{...fields.subjectinstanceid}
								disabled
							/>
						</Form.Group>
						<Form.Group controlId="schoolabbrev">
							<Form.Label>Mã môn học</Form.Label>
							<Form.Control type="text" {...fields.subjectabbrev} disabled />
						</Form.Group>
						<Form.Group controlId="uuid">
							<Form.Label>Thời điểm kết thúc</Form.Label>
							<TextField
								type="datetime-local"
								fullWidth
								{...fields.endtime}
								error={!!errors[fields.endtime.name]}
								helperText={
									(errors[fields.endtime.name]?.message as string) ?? ""
								}
							/>
						</Form.Group>
						<Form.Group controlId="uuid">
							<Form.Label>Tên assignment</Form.Label>
							<TextField
								fullWidth
								type="text"
                                label="Tên"
								{...fields.testname}
								error={!!errors[fields.testname.name]}
								helperText={
									(errors[fields.testname.name]?.message as string) ?? ""
								}
							/>
						</Form.Group>
						<Form.Group controlId="uuid">
							<Form.Label>Mô tả</Form.Label>
							<TextField
								type="text"
                                label="Mô tả"
								rows={5}
								fullWidth
								{...fields.description}
								error={!!errors[fields.description.name]}
								helperText={
									(errors[fields.description.name]?.message as string) ?? ""
								}
							/>
						</Form.Group>
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
