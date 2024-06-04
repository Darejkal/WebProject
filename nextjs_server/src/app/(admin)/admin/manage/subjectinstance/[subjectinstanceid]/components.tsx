"use client";
import SearchableInput from "@/app/_components/SearchableInput";
import { useFetch } from "@/app/_helpers/client";
import { IServiceSubjectInstance, useSubjectInstanceService } from "@/app/_services/useSubjectInstanceService";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function DeleteSubjectInstanceModalButton({ show,subjectinstance }: { show?: boolean,subjectinstance:IServiceSubjectInstance }) {
	const [showModal, setShowModal] = useState<boolean>(false);
	const subjectInstanceService=useSubjectInstanceService();
	const { register, handleSubmit, formState:{errors}, setValue,setError } = useForm();
	const router=useRouter();
	useEffect(() => {
		setShowModal(show?show:false);
	}, [show]);
	const fields = {
		confirmation: register("confirmation", {
			required: "Điền xác nhận là bắt buộc",
		}),
	};
	const onSubmit =  (params:any) => {
		const {confirmation}=params;
		if(confirmation!=subjectinstance.name){
			setError(fields.confirmation.name,{message:"Điền xác nhận chưa đúng!"})
			return;
		}
		toast.info("Đang xóa lớp...")
		subjectInstanceService.deleteByUUID(subjectinstance.uuid).then(()=>{
			toast.dismiss()
			toast.success("Xóa lớp học thành công! Đang điều hướng...",{delay:200});
			setShowModal(false);
			router.push("/admin/manage/subjectinstance")
		}).catch((e)=>{
			toast.dismiss()
			toast.warning("Lỗi khi xóa lớp học!",{delay:200});
		});
	};
	return (
		<>
			{" "}
			<Button onClick={() => setShowModal(true)} variant="outline-danger" className="m-1">
				Xóa lớp học
			</Button>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Xóa lớp học</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group controlId="confirmation">
							<Form.Label><span className="text-danger">Cảnh báo hành động nguy hiểm:</span><br/> Xác nhận xóa lớp học bằng cách điền <span style={{fontWeight:"bold",fontStyle:"italic"}}>{subjectinstance.name}</span></Form.Label>
							<TextField
								fullWidth
								autoComplete="off"
								inputRef={fields.confirmation.ref}
								{...fields.confirmation}
								error={!!errors[fields.confirmation.name]}
								helperText={(errors[fields.confirmation.name]?.message as string)??""}
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
export function ModifySubjectInstanceModal({}: {
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
