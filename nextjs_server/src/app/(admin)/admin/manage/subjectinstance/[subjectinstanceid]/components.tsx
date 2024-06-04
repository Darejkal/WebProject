"use client";
import SearchableInput from "@/app/_components/SearchableInput";
import { useFetch } from "@/app/_helpers/client";
import {
	IServiceSubjectInstance,
	useSubjectInstanceService,
} from "@/app/_services/useSubjectInstanceService";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function DeleteSubjectInstanceModalButton({
	show,
	subjectinstance,
}: {
	show?: boolean;
	subjectinstance: IServiceSubjectInstance;
}) {
	const [showModal, setShowModal] = useState<boolean>(false);
	const subjectInstanceService = useSubjectInstanceService();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		setError,
	} = useForm();
	const router = useRouter();
	useEffect(() => {
		setShowModal(show ? show : false);
	}, [show]);
	const fields = {
		confirmation: register("confirmation", {
			required: "Điền xác nhận là bắt buộc",
		}),
	};
	const onSubmit = (params: any) => {
		const { confirmation } = params;
		if (confirmation != subjectinstance.name) {
			setError(fields.confirmation.name, {
				message: "Điền xác nhận chưa đúng!",
			});
			return;
		}
		toast.info("Đang xóa lớp...");
		subjectInstanceService
			.deleteByUUID(subjectinstance.uuid)
			.then(() => {
				toast.dismiss();
				toast.success("Xóa lớp học thành công! Đang điều hướng...", {
					delay: 200,
				});
				setShowModal(false);
				router.push("/admin/manage/subjectinstance");
			})
			.catch((e) => {
				toast.dismiss();
				toast.warning("Lỗi khi xóa lớp học!", { delay: 200 });
			});
	};
	return (
		<>
			<Button
				onClick={() => setShowModal(true)}
				variant="outline-danger"
				className="m-1"
			>
				Xóa lớp học
			</Button>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Xóa lớp học</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group controlId="confirmation">
							<Form.Label>
								<span className="text-danger">
									Cảnh báo hành động nguy hiểm:
								</span>
								<br /> Xác nhận xóa lớp học bằng cách điền{" "}
								<span style={{ fontWeight: "bold", fontStyle: "italic" }}>
									{subjectinstance.name}
								</span>
							</Form.Label>
							<TextField
								fullWidth
								autoComplete="off"
								inputRef={fields.confirmation.ref}
								{...fields.confirmation}
								label={"Mã xác nhận"}
								error={!!errors[fields.confirmation.name]}
								helperText={
									(errors[fields.confirmation.name]?.message as string) ?? ""
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
export function ModifySubjectInstanceModalButton({
	show,
	subjectinstance,
}: {
	show?: boolean;
	subjectinstance: IServiceSubjectInstance;
}) {
	const [showModal, setShowModal] = useState<boolean>(false);
	const subjectInstanceService = useSubjectInstanceService();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		setError,
		clearErrors,
		getValues,
	} = useForm();
	const router = useRouter();
	const fetch = useFetch();
	useEffect(() => {
		setShowModal(show ? show : false);
	}, [show]);
	const abbrevExisted = useRef<boolean>(false);
	const fields = {
		uuid: register("uuid", {
			required: "mã id là bắt buộc",
			disabled: true,
		}),
		name: register("name", {
			required: "tên người dùng là bắt buộc",
		}),
		subjectAbbrev: register("subjectAbbrev", {
			required: "mã môn học là bắt buộc",
		}),
		subjectName: register("subjectName", {
			required: "tên môn học là bắt buộc",
			disabled: true,
		}),
	};
	useEffect(() => {
		abbrevExisted.current = true;
	}, [showModal]);
	useEffect(() => {
		console.log(subjectinstance);
		setValue(fields.uuid.name, subjectinstance.uuid);
	}, [subjectinstance.uuid, showModal]);
	useEffect(() => {
		setValue(fields.name.name, subjectinstance.name);
	}, [subjectinstance.name, showModal]);
	useEffect(() => {
		setValue(fields.subjectAbbrev.name, subjectinstance.subjectAbbrev);
	}, [subjectinstance.subjectAbbrev, showModal]);
	useEffect(() => {
		setValue(fields.subjectName.name, subjectinstance.subjectName);
	}, [subjectinstance.subjectName, showModal]);
	const onSubmit = (params: any) => {
		const { subjectAbbrev } = params;
		if (!abbrevExisted.current) {
			setError(fields.subjectAbbrev.name, {
				message: "mã môn học chưa tồn tại",
			});
			return;
		}
	};
	return (
		<>
			<Button
				onClick={() => setShowModal(true)}
				variant="outline-success"
				className="m-1"
			>
				Sửa thông tin
			</Button>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Sửa thông tin lớp học</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group controlId="name">
							<Form.Label>Tên</Form.Label>
							<TextField
								fullWidth
								autoComplete="off"
								inputRef={fields.name.ref}
								label={"Điền tên lớp"}
								{...fields.name}
								error={!!errors[fields.name.name]}
								helperText={(errors[fields.name.name]?.message as string) ?? ""}
							/>
						</Form.Group>
						<Form.Group controlId="subjectAbbrev">
							<Form.Label>Mã môn học</Form.Label>
							<SearchableInput
								defaultValue={getValues(fields.subjectAbbrev.name)}
								fetchData={(input: string) => {
									let queryParam = new URLSearchParams();
									queryParam.set("query", input);
									console.log(`search?${queryParam.toString()}`);
									return fetch.get(
										`/api/subject/search?${queryParam.toString()}`
									) as Promise<
										{
											name: string;
											abbrev: string;
											uuid: string;
											schoolabbrev: string;
										}[]
									>;
								}}
								formRegister={fields.subjectAbbrev}
								textFieldProps={{
									label: "Nhập mã môn học của lớp",
									error: !!errors[fields.subjectAbbrev.name],
									helperText:
										(errors[fields.subjectAbbrev.name]?.message as string) ??
										"",
								}}
								autocompleteProps={{ freeSolo: true }}
								props={{
									optionLabel: "abbrev",
								}}
								afterGetOptions={({ inputValue, options }) => {
									console.log("afterget");
									console.log(inputValue);
									console.log(options);
									if (inputValue) {
										let flag = options.find((v) =>
											typeof v === "string"
												? v == inputValue
												: v.abbrev == inputValue
										)
											? true
											: false;
										abbrevExisted.current = flag;
										if (!flag) {
											setError(fields.subjectAbbrev.name, {
												message: "Mã môn học chưa tồn tại!",
												type: "submit",
											});
											console.log(errors[fields.subjectAbbrev.name]?.message);
										} else {
											clearErrors(fields.subjectAbbrev.name);
										}
									}
								}}
								afterOnChange={({ value, options }) => {
									let valueText: string | undefined;
									if (typeof value !== "string") {
										valueText = value?.abbrev;
									} else {
										valueText = value;
									}
									if (valueText) {
										let flag = options.find((v) =>
											typeof v === "string"
												? v == valueText
												: v.abbrev == valueText
										)
											? true
											: false;
										abbrevExisted.current = flag;
										if (!flag) {
											setError(fields.subjectAbbrev.name, {
												message: "Mã môn học chưa tồn tại!",
											});
											console.log(errors[fields.subjectAbbrev.name]?.message);
										} else {
											clearErrors(fields.subjectAbbrev.name);
										}
									}
								}}
							/>
							{/* <FormControl
								fullWidth
								autoComplete="off"
								inputRef={fields.subjectAbbrev.ref}
								{...fields.subjectAbbrev}
								label={"Điền mã môn học"}
								error={!!errors[fields.subjectAbbrev.name]}
								helperText={
									(errors[fields.subjectAbbrev.name]?.message as string) ?? ""
								}
							/> */}
						</Form.Group>
						<Form.Group controlId="subjectName">
							<Form.Label>Tên môn học</Form.Label>
							<FormControl
								// fullWidth
								// autoComplete="off"
								// inputRef={fields.subjectName.ref}
								{...fields.subjectName}
								// label={"Điền tên môn học"}
								// error={!!errors[fields.subjectName.name]}
								// helperText={
								// 	(errors[fields.subjectName.name]?.message as string) ?? ""
								// }
							/>
							<Form.Group controlId="uuid">
								<Form.Label>ID lớp học</Form.Label>
								<FormControl
									// fullWidth
									// autoComplete="off"
									// inputRef={fields.uuid.ref}
									// label={"Điền ID lớp"}
									{...fields.uuid}
									// error={!!errors[fields.uuid.name]}
									// helperText={(errors[fields.uuid.name]?.message as string) ?? ""}
								/>
							</Form.Group>
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
export function AddUserSubjectInstanceRelationModal({}: {
	// show:boolean
}) {
	const [showModal, setShowModal] = useState<boolean>(false);
	const { register, handleSubmit, formState, setValue } = useForm();
	const fetch = useFetch();
	const fields = {
		name: register("name", { required: "name is required" }),
		subjectname: register("subjectname", { disabled: true }),
		subjectschool: register("subjectschool", { disabled: true }),
		subjectabbrev: register("subjectabbrev", {
			required: "subjectabbrev is required",
		}),
	};
	const onSubmit = () => {};
	return (
		<Modal show={showModal} onHide={() => setShowModal(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Thêm lớp học</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group controlId="name">
						<Form.Label>Tên</Form.Label>
						<SearchableInput
							fetchData={(input: string) => {
								let queryParam = new URLSearchParams();
								queryParam.set("query", input);
								console.log(`search?${queryParam.toString()}`);
								return fetch.get(
									`/api/subjectinstance/search?${queryParam.toString()}`
								);
							}}
							formRegister={fields.name}
							textFieldProps={{ label: "Nhập tên lớp học" }}
						/>
					</Form.Group>
					<Form.Group controlId="subjectabbrev">
						<Form.Label>Mã môn </Form.Label>
						<SearchableInput
							fetchData={(input: string) => {
								let queryParam = new URLSearchParams();
								queryParam.set("query", input);
								console.log(`search?${queryParam.toString()}`);
								return fetch.get(
									`/api/subject/search?${queryParam.toString()}`
								) as Promise<
									{
										name: string;
										abbrev: string;
										uuid: string;
										schoolabbrev: string;
									}[]
								>;
							}}
							formRegister={fields.subjectabbrev}
							textFieldProps={{ label: "Nhập mã môn học của lớp" }}
							props={{
								optionLabel: "abbrev",
							}}
							afterOnChange={({ value }) => {
								if (typeof value !== "string") {
									setValue("subjectname", value?.name ?? "");
									setValue("subjectschool", value?.schoolabbrev ?? "");
								}
							}}
						/>
					</Form.Group>
					<Form.Group controlId="subjectschool">
						<Form.Label>Mã trường </Form.Label>
						<Form.Control type="text" {...fields.subjectschool} />
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
	);
}
