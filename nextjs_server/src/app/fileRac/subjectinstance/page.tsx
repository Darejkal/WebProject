"use client";

import React, { type UIEvent, useCallback, useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Form, Modal } from "react-bootstrap";
import { IServiceSubjectInstance, useSubjectInstanceService } from "@/app/_services";
import { useForm } from "react-hook-form";

const SubjectInstancesPage = () => {
	const subjectInstanceService = useSubjectInstanceService();
	const { register, handleSubmit, formState } = useForm();
	const { errors } = formState;
	const fields = {
		name: register("name", { required: "name is required" }),
		subjectid: register("subjectid", {
			required: "subjectid is required",
		}),
	};
	const [showModal, setShowModal] = useState(false);
	async function onSubmit({ subjectid,name }: any) {
		const res = await subjectInstanceService.create(subjectid,name);
		console.log(res);
		setShowModal(false)
		subjectInstanceService.clearPage().then(()=>{
			subjectInstanceService.getPaginated(20)
		})
	}
	const [isFetching, setIsFetching] = useState(false);
	const fetchNextPage = useCallback((containerRefElement?: HTMLDivElement | null) => {
		if (containerRefElement) {
			const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

			//once the user has scrolled within 400px of the bottom of the table, fetch more data if we can

			if (scrollHeight - scrollTop - clientHeight < 400 &&!subjectInstanceService.paginationEnded && !isFetching) {
				setIsFetching(true)
				subjectInstanceService.getPaginated(20).then(
					()=>{
						setIsFetching(false)
						console.log(subjectInstanceService.subjectinstances)
					}
				)
			}
		}
	},[isFetching,subjectInstanceService.subjectinstances,subjectInstanceService.getPaginated,subjectInstanceService.paginationEnded])
	useEffect(()=>{
		subjectInstanceService.getPaginated(20)
		console.log(subjectInstanceService.subjectinstances)
	},[])
	const [subjectTableInstanceData, setSubjectInstanceTableData]=useState<IServiceSubjectInstance[]>([])
	useEffect(()=>{
		console.log("changes")
		console.log(subjectInstanceService.subjectinstances)
		if(subjectInstanceService.subjectinstances){
			console.log(subjectInstanceService.subjectinstances)
			setSubjectInstanceTableData(subjectInstanceService.subjectinstances)
		}
	},[subjectInstanceService.subjectinstances])
	return (
		<div style={{ margin: "3rem 10rem 0 10rem" }}>
			<h4 style={{ display: "block", paddingBottom: "1rem" }}>
				Quản lý môn học
			</h4>
			<MaterialReactTable
				columns={[
					{ accessorKey: "name", header: "Tên" },
					// { accessorKey: "subjectid", header: "Mã môn" },
					{ accessorKey: "subjectName", header: "Tên môn" },
					{ accessorKey: "subjectAbbrev", header: "Mã môn" },
					// { accessorKey: "uuid", header: "UUID" },
					{ accessorKey: "createdat", header: "Tạo lúc" },
					// { accessorKey: "authorid", header: "ID tác giả" },
					{ accessorKey: "authorName", header: "Tên tác giả" },
				]}
				data={subjectTableInstanceData}
				enablePagination={false}
				enableRowNumbers={true}
				state={{
					showProgressBars:isFetching
				}}
				muiTableContainerProps={
					{
						sx:{
							maxHeight:"20rem"
						},
						onScroll:(event: UIEvent<HTMLDivElement>)=>fetchNextPage(event.target as HTMLDivElement)
					}
				}
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
							<Form.Control type="text" {...fields.name} />
						</Form.Group>
						<Form.Group controlId="subjectid">
							<Form.Label>Mã môn</Form.Label>
							<Form.Control type="text" {...fields.subjectid} />
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
