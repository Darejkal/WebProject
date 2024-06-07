"use client";
import SearchableInput from "@/app/_components/SearchableInput";
import SearchableMultiInput from "@/app/_components/SearchableMultiInput";
import { useFetch } from "@/app/_helpers/client";
import {
	IServiceSubjectInstance,
	useSubjectInstanceService,
} from "@/app/_services/useSubjectInstanceService";
import { useSubjectInstanceUserService } from "@/app/_services/useSubjectInstanceUserService";
import { Box } from "@mui/material";
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
					<Form onSubmit={onSubmit}>
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
	afterSubmit,
}: {
	show?: boolean;
	subjectinstance: IServiceSubjectInstance;
	afterSubmit?: () => any;
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
			required: "mã id lớp là bắt buộc",
			// disabled: true,
		}),
		name: register("name", {
			required: "tên lớp là bắt buộc",
		}),
		subjectAbbrev: register("subjectAbbrev", {
			required: "mã môn học là bắt buộc",
		}),
		subjectName: register("subjectName", {
			// required: "tên môn học là bắt buộc",
			// disabled: true,
		}),
	};
	useEffect(() => {
		abbrevExisted.current = true;
	}, [showModal]);
	useEffect(() => {
		if (subjectinstance.uuid) {
			setValue(fields.uuid.name, subjectinstance.uuid);
		}
	}, [subjectinstance.uuid, showModal]);
	useEffect(() => {
		if (subjectinstance.name) {
			setValue(fields.name.name, subjectinstance.name);
		}
	}, [subjectinstance.name, showModal]);
	useEffect(() => {
		if (subjectinstance.subjectAbbrev) {
			setValue(fields.subjectAbbrev.name, subjectinstance.subjectAbbrev);
		}
	}, [subjectinstance.subjectAbbrev, showModal]);
	useEffect(() => {
		if (subjectinstance.subjectName) {
			setValue(fields.subjectName.name, subjectinstance.subjectName);
		}
	}, [subjectinstance.subjectName, showModal]);
	const onSubmit = (params: any) => {
		console.log(params);
		const { name, subjectAbbrev, uuid } = params;
		console.log("submit");
		console.log(getValues());
		if (!abbrevExisted.current) {
			setError(fields.subjectAbbrev.name, {
				message: "mã môn học chưa tồn tại",
			});
			return;
		}
		toast.info("Đang gửi yêu cầu....");
		subjectInstanceService
			.updateOne({ name, subjectAbbrev, uuid })
			.then(() => {
				toast.dismiss();
				toast.success("Cập nhật môn học thành công!", { delay: 200 });
				setShowModal(false);
				afterSubmit && afterSubmit();
			})
			.catch((e) => {
				toast.dismiss();
				toast.warning("Cập nhật môn học thất bại!", { delay: 200 });
			});
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
								defaultValue={getValues(fields.subjectAbbrev.name) as string}
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
										let target = options.find((v) =>
											typeof v === "string"
												? v == inputValue
												: v.abbrev == inputValue
										);
										let flag = target ? true : false;
										abbrevExisted.current = flag;
										if (!flag) {
											setError(fields.subjectAbbrev.name, {
												message: "Mã môn học chưa tồn tại!",
												type: "submit",
											});
											console.log(errors[fields.subjectAbbrev.name]?.message);
										} else {
											clearErrors(fields.subjectAbbrev.name);
											setValue(
												fields.subjectName.name,
												typeof target === "string" ? target : target?.name
											);
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
								type="text"
								// fullWidth
								// autoComplete="off"
								// inputRef={fields.subjectName.ref}
								{...fields.subjectName}
								disabled
								// label={"Điền tên môn học"}
								// error={!!errors[fields.subjectName.name]}
								// helperText={
								// 	(errors[fields.subjectName.name]?.message as string) ?? ""
								// }
							/>
						</Form.Group>

							<Form.Group controlId="uuid">
								<Form.Label>ID lớp học</Form.Label>
								<FormControl
									type="text"
									// fullWidth
									// autoComplete="off"
									// inputRef={fields.uuid.ref}
									// label={"Điền ID lớp"}
									{...fields.uuid}
									disabled
									// error={!!errors[fields.uuid.name]}
									// helperText={(errors[fields.uuid.name]?.message as string) ?? ""}
								/>
							</Form.Group>
						<Form.Group controlId="subjectName">
							<Form.Label>Thời gian kết thúc</Form.Label>
							<FormControl
								type="date"
								{...fields.subjectName}
								disabled
							/>
							</Form.Group>
							<Form.Group controlId="subjectName">
							<Form.Label>Mô tả</Form.Label>
							<FormControl
								type="date"
								{...fields.subjectName}
								disabled
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
export function AddUserSubjectInstanceRelationModal({
	show,
	label,
	role,
	subjectinstance,
	afterSubmit,
}: {
	show?: boolean;
	label: string;
	role: string;
	subjectinstance: IServiceSubjectInstance;
	afterSubmit?: () => any;
}) {
	useEffect(() => {
		setShowModal(show ? show : false);
	}, [show]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const { register, handleSubmit, formState, setValue,setError,getValues } = useForm();
	const subjectInstanceUserService=useSubjectInstanceUserService()
	const {errors}=formState;
	const fetch = useFetch();
	const fields = {
		users: register("users", 
		// { required: "users are required" }
	),
		uuid: register("uuid", {
			required: "mã id lớp là bắt buộc",
			// disabled: true,
		}),
		name: register("name", {
			required: "tên lớp là bắt buộc",
		}),
	};
	useEffect(() => {
		if (subjectinstance.uuid) {
			setValue(fields.uuid.name, subjectinstance.uuid);
		}
	}, [subjectinstance.uuid, showModal]);
	useEffect(() => {
		if (subjectinstance.name) {
			setValue(fields.name.name, subjectinstance.name);
		}
	}, [subjectinstance.name, showModal]);
	const usersSelected=useRef<{name: string,email: string,position: string,uuid: string,createdat: string,} |  {name: string,email: string,position: string,uuid: string,createdat: string,}[] | null>();
	const onSubmit = () => {
		if(!usersSelected.current){
			setError(fields.users.name,{message:"vui lòng nhập người muốn thêm"})
			return
		}
		if(!Array.isArray(usersSelected.current!)){
			usersSelected.current=[usersSelected.current]
		}
		toast.info("Đang gửi yêu cầu ....")
		subjectInstanceUserService.addMembers({
			userids:usersSelected.current.map((v)=>(v.uuid)),
			subjectinstanceid:getValues(fields.uuid.name),
			role:role,
		}).then(()=>{
			toast.dismiss()
			toast.success("Thêm thành viên thành công!")
			afterSubmit&&afterSubmit()
			setShowModal(false)
		}).catch((e)=>{
			toast.dismiss()
			toast.warning("Thêm thành viên thất bại!")	
		})
		
	};
	return (
		<>
			<Button
				onClick={() => setShowModal(true)}
				variant="outline-primary"
				className="m-1"
			>
				{label}
			</Button>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>{label}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={(e)=>{
						e.preventDefault();
						onSubmit()
						}}>
						<Form.Group controlId="name">
							<Form.Label>Tên</Form.Label>
							<SearchableMultiInput
								autocompleteProps={{
									multiple:true,
									freeSolo:false,
									renderOption:(props,option,state,ownerState)=>(
										<Box
											component="li"
											{...props}
											key={(typeof option ==="string")?option:option.email}
										>
											{(typeof option==="string")?option:(`Tên: ${option["name"]} | Email: ${option["email"]}`)}
										</Box>
										)
									}}
								
								fetchData={async (input: string) => {
									return await fetch.post(
										`/api/user/getpaginated`,
										{next:"",limit:5,query:input}
									).then((v:{
										next:string,
										results:[{name:string,email:string,position:string,uuid:string,createdat:string}]
									})=>{
										if(v){
											return v.results
										} else{
											return []
										}
									});
								}}
								props={{
									optionLabel:"email"
								}}
								afterOnChange={({value})=>{
									// @ts-ignore
									usersSelected.current=value; 
								}}
								formRegister={fields.users}
								textFieldProps={{ label: "Các thành viên thêm mới" }}
							/>
						</Form.Group>
						<Form.Group controlId="name">
							<Form.Label>Lớp học</Form.Label>
							{/* <TextField
								fullWidth
								autoComplete="off"
								inputRef={fields.name.ref}
								label={"Điền tên lớp"}
								{...fields.name}
								error={!!errors[fields.name.name]}
								helperText={(errors[fields.name.name]?.message as string) ?? ""}
							/> */}
							<FormControl
									type="text"
									// fullWidth
									// autoComplete="off"
									// inputRef={fields.uuid.ref}
									// label={"Điền ID lớp"}
									{...fields.name}
									disabled
									// error={!!errors[fields.uuid.name]}
									// helperText={(errors[fields.uuid.name]?.message as string) ?? ""}
								/>
						</Form.Group>
						<Form.Group controlId="uuid">
								<Form.Label>ID lớp học</Form.Label>
								<FormControl
									type="text"
									// fullWidth
									// autoComplete="off"
									// inputRef={fields.uuid.ref}
									// label={"Điền ID lớp"}
									{...fields.uuid}
									disabled
									// error={!!errors[fields.uuid.name]}
									// helperText={(errors[fields.uuid.name]?.message as string) ?? ""}
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
