"use client";

import React, { type UIEvent, useCallback, useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Form, Modal } from "react-bootstrap";
import { IServiceSubjectInstance, useSubjectInstanceService } from "@/app/_services";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useFetch } from "@/app/_helpers/client";
import { Autocomplete,TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { PaginatedTable } from "@/app/_components/PaginatedTable";
import debounce from "lodash/debounce";
import SearchableInput from "@/app/_components/SearchableInput";
const SubjectInstancesPage = () => {
	const router=useRouter();
	const subjectInstanceService = useSubjectInstanceService();
	const { register, handleSubmit, formState,setValue } = useForm();
	const { errors } = formState;
	const [subjectInstanceOptions, setSubjectInstanceOptions] = useState<string[]>([]);
	const [subjectInstanceInputValue, setSubjectInstanceInputValue] = useState<string | null>("");
	const [subjectInstanceValue, setSubjectInstanceValue] = useState<string | null>("");
	const [subjectTableInstanceData, setSubjectInstanceTableData]=useState<IServiceSubjectInstance[]>([])
	const [subjectOptions, setSubjectOptions] = useState<{name:string,abbrev:string,uuid:string,schoolabbrev:string}[]>([]);
	const [subjectInputValue, setSubjectInputValue] = useState<string | null>("");
	const [subjectValue, setSubjectValue] = useState<{name:string,abbrev:string,uuid:string,schoolabbrev:string} | null>(null);
	const fields = {
		name: register("name", { required: "name is required" }),
		subjectname: register("subjectname",{disabled:true}),
		subjectschool: register("subjectschool",{disabled:true}),
		subjectabbrev: register("subjectabbrev", {
			required: "subjectabbrev is required",
		}),
	};
	const getSubjectOptionsDelayed=useCallback(
		debounce((input:string|null,callback:(v:any)=>any)=>{
			if (!input) {
				return;
			}
			let queryParam = new URLSearchParams();
			queryParam.set("query", input);
			console.log(`search?${queryParam.toString()}`);
			fetch.get(`/api/subject/search?${queryParam.toString()}`).then(callback)
		},200),[]
	)
	const getSubjectOptionsInstanceDelayed=useCallback(
		debounce((input:string|null,callback:(v:any)=>any)=>{
			if (!input) {
				return;
			}
			let queryParam = new URLSearchParams();
			queryParam.set("query", input);
			console.log(`search?${queryParam.toString()}`);
			fetch.get(`/api/subjectinstance/search?${queryParam.toString()}`).then(callback);
		},200),[]
	)
	useEffect(() => {
		getSubjectOptionsDelayed(subjectInputValue,(v:any) => {
			console.log(v)
			setSubjectOptions(v);
		});
	}, [subjectInputValue, subjectValue]);
	const fetch = useFetch();
	useEffect(() => {
		getSubjectOptionsInstanceDelayed(subjectInstanceInputValue,(v:any) => {
			setSubjectInstanceOptions(v.map(({ name }: any) => name));
		})
	}, [subjectInstanceInputValue, subjectInstanceValue]);
	const [showModal, setShowModal] = useState(false);
	async function onSubmit({ subjectabbrev,name }: any) {
		try{
			console.log({ name, subjectabbrev });
			const res = await subjectInstanceService.create( subjectabbrev,name);
			console.log(res);
			await subjectInstanceService.clearPage();
			await subjectInstanceService.getPaginated({limit:20,next:""});
			setShowModal(false);
			toast.success("Tạo môn học mới thành công!",{delay:300})
		} catch(e){
			toast.warning("Tạo môn học mới thất bại!",{delay:300})
		}
	}
	return (
		<div style={{ margin: "3rem 10rem 0 10rem" }}>
			<h4 style={{ display: "block", paddingBottom: "1rem" }}>
				Quản lý lớp học
			</h4>
            <PaginatedTable
                tableProps={{
                    columns:[
                        { accessorKey: "name", header: "Tên" },
                        // { accessorKey: "subjectabbrev", header: "Mã môn" },
                        { accessorKey: "subjectName", header: "Tên môn" },
                        { accessorKey: "subjectAbbrev", header: "Mã môn" },
                        // { accessorKey: "uuid", header: "UUID" },
                        { accessorKey: "createdat", header: "Tạo lúc" },
                        // { accessorKey: "authorid", header: "ID tác giả" },
                        { accessorKey: "authorName", header: "Tên tác giả" },
                    ],
					muiTableBodyRowProps:({row})=>({
						onClick:(e)=>{
							router.push(`/admin/manage/subjectinstance/${row.original.uuid}`)
						},
						sx:{cursor: "pointer"}
					})
                }}
                pagination={{
                    getPaginated:subjectInstanceService.getPaginated,
                    data:subjectInstanceService.subjectinstances
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
					Thêm lớp học
				</Button>
			</div>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Thêm lớp học</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group controlId="name">
							<Form.Label>Tên</Form.Label>
							<SearchableInput
								autocompleteProps={{
									freeSolo:true,
									filterOptions:(x)=>x
								}}
								fetchData={
									(input:string)=>{
										let queryParam = new URLSearchParams();
										queryParam.set("query", input);
										console.log(`search?${queryParam.toString()}`);
										return fetch.get(`/api/subjectinstance/search?${queryParam.toString()}`)
									}
								}
								formRegister={fields.name}
								textFieldProps={{label:"Nhập tên lớp học"}}
							/>
						</Form.Group>
						<Form.Group controlId="subjectabbrev">
							<Form.Label>Mã môn </Form.Label>
							<SearchableInput
								fetchData={
									(input:string)=>{
										let queryParam = new URLSearchParams();
										queryParam.set("query", input);
										console.log(`search?${queryParam.toString()}`);
										return fetch.get(`/api/subject/search?${queryParam.toString()}`) as Promise<{name:string,abbrev:string,uuid:string,schoolabbrev:string}[]>
									}
								}
								formRegister={fields.subjectabbrev}
								textFieldProps={{label:"Nhập mã môn học của lớp"}}
								props={{
									optionLabel:"abbrev"
								}}
								afterOnChange={({value}) => {
									if(typeof value !=="string"){
										setValue("subjectname",(value?.name)??"")
										setValue("subjectschool",value?.schoolabbrev??"")
									}
								}}
							/>
						</Form.Group>
						<Form.Group controlId="subjectname">
							<Form.Label>Tên môn học </Form.Label>
							<Form.Control type="text" {...fields.subjectname} />
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
		</div>
	);
};

export default SubjectInstancesPage;
