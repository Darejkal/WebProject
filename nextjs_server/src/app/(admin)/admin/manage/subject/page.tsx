"use client";

import React, { type UIEvent, useCallback, useEffect, useState, useRef } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Form, Modal } from "react-bootstrap";
import { IServiceSubject, useSubjectService } from "@/app/_services";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Autocomplete, TextField } from "@mui/material";
import { useFetch } from "@/app/_helpers/client";
import { toast } from "react-toastify";
import SearchableInput from "@/app/_components/SearchableInput";
import { PaginatedTable } from "@/app/_components/PaginatedTable";
import { formatDateString } from "@/app/_helpers/clientutils";

const SubjectsPage = () => {
	const router = useRouter();
	const subjectService = useSubjectService();
	const { register, handleSubmit,setError,clearErrors,formState:{errors} } = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		criteriaMode: 'firstError',
		shouldFocusError: true,
	});
	const fetch = useFetch();
	const abbrevExisted=useRef<Boolean>();
	const fields = {
		name: register("name", { required: "name is required" }),
		abbrev: register("abbrev", { 
			required: "abbrev is required",
			validate:(field)=>(abbrevExisted.current==false||"Mã môn học đã tồn tại!")
		}),
		description: register("description", { 
		}),
		imgurl: register("imgurl", { 
		}),
		schoolabbrev: register("schoolabbrev", {
			required: "schoolabbrev is required",
			value: "HUST",
		}),
	};
	const [showModal, setShowModal] = useState(false);
	useEffect(()=>{
		if(!showModal){
			abbrevExisted.current=false;
		}
	},[showModal])
	async function onSubmit({ name, abbrev, schoolabbrev,imgurl,description }: any) {
		for(const name of Object.keys(fields)){
			console.log(name)
			// @ts-ignore
			if(errors[fields[name].name]){
				console.log("error before submit")
			}
		}
		try{
			console.log({ name, abbrev, schoolabbrev,imgurl,description });
			const res = await subjectService.create({ name, abbrev, schoolabbrev,imgurl,description });
			console.log(res);
			await subjectService.clearPage();
			await subjectService.getPaginated({limit:20,next:""});
			setShowModal(false);
			toast.success("Tạo môn học mới thành công!",{delay:300})

		} catch(e){
			toast.warning("Tạo môn học mới thất bại!",{delay:300})
		}
		
	}
	return (
		<div style={{ margin: "3rem 10rem 0 10rem" }}>
			<h4 style={{ display: "block", paddingBottom: "1rem" }}>
				Quản lý môn học
			</h4>
            <PaginatedTable
                tableProps={{
                    columns:[
						{ accessorKey: "name", header: "Tên" },
						{ accessorKey: "abbrev", header: "Mã" },
						// { accessorKey: "uuid", header: "UUID" },
						{ accessorKey: "authorName", header: "Tên tác giả" },
						{ accessorKey: "createdat",Cell:({cell})=>(formatDateString(cell.getValue<string>())), header: "Tạo lúc" },
						// { accessorKey: "authorid", header: "ID tác giả" },
						{ accessorKey: "schoolabbrev", header: "ID trường" },
                    ],
					muiTableBodyRowProps:({row})=>({
						onClick:(e)=>{
							router.push(`/admin/manage/subjects/${row.original.uuid}`)
						},
						sx:{cursor: "pointer"}
					})
                }}
                pagination={{
                    getPaginated:subjectService.getPaginated,
                    data:subjectService.subjects
                }}
            />
			<div
				style={{
					margin: "1rem 0 0 0",
					width: "100%",
					display: "flex",
					flexDirection: "row-reverse",
				}}
			>
				<Button variant="outline-primary" onClick={() => setShowModal(true)}>
					Thêm môn học
				</Button>
			</div>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Thêm môn học</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group controlId="name">
							<Form.Label>Tên</Form.Label>
							<SearchableInput
								autocompleteProps={{freeSolo:true}}
								fetchData={
									(input:string)=>{
										let queryParam = new URLSearchParams();
										queryParam.set("query", input);
										console.log(`search?${queryParam.toString()}`);
										return fetch.get(`/api/subject/search?${queryParam.toString()}`)
									}
								}
								props={{
									optionLabel:"name"
								}}
								formRegister={fields.name}
								textFieldProps={{label:"Nhập tên lớp học"}}
							/>
						</Form.Group>
						<Form.Group controlId="abbrev">
							<Form.Label>Mã môn học mới</Form.Label>
							<SearchableInput
								fetchData={
									(input:string)=>{
										let queryParam = new URLSearchParams();
										queryParam.set("query", input);
										console.log(`search?${queryParam.toString()}`);
										return fetch.get(`/api/subject/search?${queryParam.toString()}`) as Promise<{name:string,abbrev:string,uuid:string,schoolabbrev:string}[]>
									}
								}
								formRegister={fields.abbrev}
								textFieldProps={{
									label:"Nhập mã môn học của lớp",
									error:!!errors[fields.abbrev.name],
									helperText:((errors[fields.abbrev.name]?.message as string)??"")
								}}
								autocompleteProps={{freeSolo:true}}
								props={{
									optionLabel:"abbrev"
								}}
								afterGetOptions={({inputValue,options})=>{
									console.log("afterget")
									console.log(inputValue)
									console.log(options)
									if(inputValue){
										let flag=options.find((v)=> (typeof v==="string"?v==inputValue:(v.abbrev==inputValue)))
										if(flag){
											setError(fields.abbrev.name,{message:"Mã môn học đã tồn tại!",type:"submit"})
											abbrevExisted.current=true
											console.log(errors[fields.abbrev.name]?.message)
										} else{
											clearErrors(fields.abbrev.name)
											abbrevExisted.current=false
										}
									}
								}}
								afterOnChange={({value,options})=>{
									let valueText:string|undefined;
									if(typeof value!=="string"){
										valueText=value?.abbrev
									} else{
										valueText=value;
									}
									if(valueText){
										let flag=options.find((v)=> (typeof v==="string"?v==valueText:(v.abbrev==valueText)))
										if(flag){
											setError(fields.abbrev.name,{message:"Mã môn học đã tồn tại!"})
											abbrevExisted.current=true
											console.log(errors[fields.abbrev.name]?.message)
										} else{
											clearErrors(fields.abbrev.name)
											abbrevExisted.current=false
										}
									}
								}}
							/>
						</Form.Group>
						<Form.Group controlId="schoolabbrev">
							<Form.Label>Mã trường</Form.Label>
							<Form.Control type="text" {...fields.schoolabbrev} disabled />
						</Form.Group>
						<Form.Group controlId="imgurl">
							<Form.Label>Link ảnh</Form.Label>
							<TextField
								label="Link ảnh"
								fullWidth
								{...fields.imgurl}
								error={!!errors[fields.imgurl.name]}
								helperText={((errors[fields.imgurl.name]?.message as string)??"")}
								inputRef={fields.imgurl.ref}
							/>
						</Form.Group>
						<Form.Group controlId="imgurl">
							<Form.Label>Mô tả về môn học</Form.Label>
							<TextField
								label="Mô tả"
								multiline
								fullWidth
								rows={5}
								{...fields.description}
								error={!!errors[fields.description.name]}
								helperText={((errors[fields.description.name]?.message as string)??"")}
								inputRef={fields.description.ref}
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
		</div>
	);
};

export default SubjectsPage;
