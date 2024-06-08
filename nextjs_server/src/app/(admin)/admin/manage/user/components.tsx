'use client'
import { DeleteOutline, EditNote } from "@mui/icons-material"
import { IconButton, TextField } from "@mui/material";
import { useState,useEffect, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import {IServiceUser, useUserService} from "@/app/_services/useUserService"
import { useFetch } from "@/app/_helpers/client";
import { toast } from "react-toastify";
import SearchableInput from "@/app/_components/SearchableInput";
import { renderToPipeableStream } from "react-dom/server";
export function UpdateUserModal({show,user,afterSubmit}:{show?:boolean,user:IServiceUser,afterSubmit?:()=>any}){
    const [showModal,setShowModal]=useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		setError,
	} = useForm();
	const fields={
		name:register("name",{required:"Tên người dùng là bắt buộc"}),
		email:register("email",{required:"Email người dùng là bắt buộc"}),
		uuid:register("uuid",{required:"Mã id người dùng là bắt buộc"}),
		position:register("position",{required:"Quyền hạn người dùng là bắt buộc"})
	}
	useEffect(()=>{
		if(user.name){
			setValue(fields.name.name,user.name)
		}
	},[user.name])
	useEffect(()=>{
		if(user.email){
			setValue(fields.email.name,user.email)
		}
	},[user.email])
	useEffect(()=>{
		if(user.uuid){
			setValue(fields.uuid.name,user.uuid)
		}
	},[user.uuid])
	useEffect(()=>{
		if(user.position){
			setValue(fields.position.name,user.position)
		}
	},[user.position])
	const router = useRouter();
	useEffect(() => {
		setShowModal(show ? show : false);
	}, [show]);
	const fetch=useFetch()
    const onSubmit=(props:any)=>{
		toast.info("Đang cập nhật thông tin người dùng!")
        fetch.post("/api/user/admin/update",props).then(()=>{
			toast.dismiss()
			toast.success("Cập nhật thông tin người dùng thành công!")
			setShowModal(false)
			afterSubmit && afterSubmit();
		}).catch(()=>{
			toast.dismiss()
			toast.warning("Cập nhật thông tin người dùng thất bại!")
		})
    }
    return <>
    <IconButton onClick={()=>setShowModal(true)}>
        <EditNote sx={{color:"grey"}}/>
    </IconButton>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Chỉnh sửa thông tin người dùng</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
							<Form.Label>
									Chỉnh sửa thông tin người dùng bằng cách thay đổi các thông tin sau:
							</Form.Label>
							<TextField
								sx={{marginTop:"0.5rem"}}
								fullWidth
								autoComplete="off"
								inputRef={fields.name.ref}
								{...fields.name}
								label={"Tên người dùng"}
								error={!!errors[fields.name.name]}
								helperText={
									(errors[fields.name.name]?.message as string) ?? ""
								}
							/>
							<TextField
								sx={{marginTop:"0.5rem"}}
								fullWidth
								autoComplete="off"
								inputRef={fields.email.ref}
								{...fields.email}
								label={"Email"}
								error={!!errors[fields.email.name]}
								helperText={
									(errors[fields.email.name]?.message as string) ?? ""
								}
							/>
							<SearchableInput
								fetchData={async ()=>["admin","user"]}
								formRegister={fields.position}
								textFieldProps={{
									fullWidth:true,
									sx:{marginTop:"0.5rem"},
									label:"Vai trò",
									error:!!errors[fields.position.name],
									helperText:(errors[fields.position.name]?.message as string) ?? ""
								}}
							/>
							<TextField
								sx={{marginTop:"0.5rem"}}
								fullWidth
								autoComplete="off"
								inputRef={fields.uuid.ref}
								{...fields.uuid}
								label={"ID người dùng"}
								error={!!errors[fields.uuid.name]}
								helperText={
									(errors[fields.uuid.name]?.message as string) ?? ""
								}
								disabled
							/>
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
}
export function DeleteUserModal({show,user,afterSubmit}:{show?:boolean,user:IServiceUser,afterSubmit?:()=>any}){
    const [showModal,setShowModal]=useState<boolean>(false);
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
	const fetch=useFetch()
    const onSubmit=()=>{
		toast.info("Đang truy vấn")
		fetch.post("/api/user/delete",{uuid:user.uuid}).then(()=>{
			toast.success("Xóa người dùng thành công!")
			setShowModal(false)
			afterSubmit && afterSubmit();
		}).catch((e)=>{
			toast.warning("Xóa người dùng thất bại!")
		})
    }
    return <>
    <IconButton onClick={()=>{
        setShowModal(true)
    }}>
    <DeleteOutline sx={{color:"grey"}}/>
    </IconButton>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Xóa người dùng</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
							<Form.Label>
								<span className="text-danger">
									Cảnh báo hành động nguy hiểm:
								</span>
								<br /> 
								Hãy xác nhận hành động xóa người dùng {" "}
								<span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                                    {`${user.name}`}
								</span>
							</Form.Label>
						<Button
							variant="primary"
							type="submit"
							style={{ margin: "1rem auto 0", display: "block" }}
						>
							Xác nhận 
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
    </>
}
export function AddUserModal({show,afterSubmit}:{show?:boolean,afterSubmit?:()=>any}){
    const [showModal,setShowModal]=useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		setError,
		clearErrors,
		getValues
	} = useForm();
	const router = useRouter();
	useEffect(() => {
		setShowModal(show ? show : false);
	}, [show]);
	const emailExisted=useRef<boolean>(false);
	const fields={
		name:register("name",{required:"Tên người dùng là bắt buộc"}),
		email:register("email",{required:"Email người dùng là bắt buộc"}),
		position:register("position",{required:"Quyền hạn người dùng là bắt buộc"}),
		password:register("password",{required:"Mật khẩu là bắt buộc"})
	}
	const fetch=useFetch();
    const onSubmit=(props:any)=>{
		if(emailExisted.current){
			setError(fields.email.name, {
				message: "Email người dùng đã tồn tại!",
				type: "submit",
			});
			return
		}
		toast.info("Đang tạo người dùng!")
        fetch.post("/api/user/admin/create",props).then(()=>{
			toast.dismiss()
			toast.success("Thêm người dùng thành công!")
			setShowModal(false)
			afterSubmit && afterSubmit();
		}).catch(()=>{
			toast.dismiss()
			toast.warning("Thêm người dùng thất bại!")
		})
    }
    return <>
	<Button variant="outline-primary" onClick={()=>setShowModal(true)}>
		Thêm người dùng
	</Button>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Xóa người dùng</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Label>
								Thêm người dùng mới bằng cách điền các thông tin sau
							</Form.Label>
							<TextField
								sx={{marginTop:"0.5rem"}}
								fullWidth
								autoComplete="off"
								inputRef={fields.name.ref}
								{...fields.name}
								label={"Tên người dùng"}
								error={!!errors[fields.name.name]}
								helperText={
									(errors[fields.name.name]?.message as string) ?? ""
								}
							/>
							<SearchableInput
								defaultValue={getValues(fields.email.name) as string}
								fetchData={(input: string) => {
									return fetch.post(
										`/api/user/getpaginated`,
										{query:input,limit:5}
									).then((v)=>{
										if(v.results){
											return v.results;
										} else{
											throw "empty results"
										}
									}).catch((e:any)=>{
										return []
									}) as Promise<IServiceUser[]>;
								}}
								formRegister={fields.email}
								textFieldProps={{
									label: "Email",
									error: !!errors[fields.email.name],
									helperText:
										(errors[fields.email.name]?.message as string) ??
										"",
									sx:{marginTop:"0.5rem"}
								}}
								autocompleteProps={{ freeSolo: true }}
								props={{
									optionLabel: "email",
								}}
								afterGetOptions={({ inputValue, options }) => {
									console.log("afterget");
									console.log(inputValue);
									console.log(options);
									if (inputValue) {
										let target = options.find((v) =>
											typeof v === "string"
												? v == inputValue
												: v.email == inputValue
										);
										let flag = target ? true : false;
										emailExisted.current = flag;
										if (flag) {
											setError(fields.email.name, {
												message: "Email người dùng đã tồn tại!",
												type: "submit",
											});
											console.log(errors[fields.email.name]?.message);
										} else {
											clearErrors(fields.email.name);
										}
									}
								}}
								afterOnChange={({ value, options }) => {
									let valueText: string | undefined;
									if (typeof value !== "string") {
										valueText = value?.name;
									} else {
										valueText = value;
									}
									if (valueText) {
										let flag = options.find((v) =>
											typeof v === "string"
												? v == valueText
												: v.name == valueText
										)
											? true
											: false;
										emailExisted.current = flag;
										if (flag) {
											setError(fields.email.name, {
												message: "Email đã tồn tại!",
											});
											console.log(errors[fields.email.name]?.message);
										} else {
											clearErrors(fields.email.name);
										}
									}
								}}
							/>
							<TextField
								sx={{marginTop:"0.5rem"}}
								fullWidth
								autoComplete="off"
								type="password"
								inputRef={fields.password.ref}
								{...fields.password}
								label={"Pasword"}
								error={!!errors[fields.password.name]}
								helperText={
									(errors[fields.password.name]?.message as string) ?? ""
								}
							/>
							<SearchableInput
								fetchData={async ()=>["admin","user"]}
								formRegister={fields.position}
								textFieldProps={{
									fullWidth:true,
									sx:{marginTop:"0.5rem"},
									label:"Vai trò",
									error:!!errors[fields.position.name],
									helperText:(errors[fields.position.name]?.message as string) ?? ""
								}}
							/>
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
}