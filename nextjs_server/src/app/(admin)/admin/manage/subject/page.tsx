"use client";

import React, { type UIEvent, useCallback, useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Form, Modal } from "react-bootstrap";
import { IServiceSubject, useSubjectService } from "@/app/_services";
import { useForm } from "react-hook-form";

const SubjectInstancesPage = () => {
	const subjectService = useSubjectService();
	const { register, handleSubmit, formState } = useForm();
	const { errors } = formState;
	const fields = {
		name: register("name", { required: "name is required" }),
		abbrev: register("abbrev", { required: "abbrev is required" }),
		schoolid: register("schoolid", {
			required: "schoolid is required",
			value: "HUST",
		}),
	};
	const [showModal, setShowModal] = useState(false);
	async function onSubmit({ name, abbrev, schoolid }: any) {
		console.log({ name, abbrev, schoolid });
		const res = await subjectService.create({ name, abbrev, schoolid });
		console.log(res);
		setShowModal(false)
	}
	const [isFetching, setIsFetching] = useState(false);
	const fetchNextPage = useCallback((containerRefElement?: HTMLDivElement | null) => {
		if (containerRefElement) {
			const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

			//once the user has scrolled within 400px of the bottom of the table, fetch more data if we can

			if (scrollHeight - scrollTop - clientHeight < 400 &&!subjectService.paginationEnded && !isFetching) {
				setIsFetching(true)
				subjectService.getPaginated(20).then(
					()=>{
						setIsFetching(false)
						console.log(subjectService.subjects)
					}
				)
			}
		}
	},[isFetching,subjectService.subjects,subjectService.getPaginated,subjectService.paginationEnded])
	useEffect(()=>{
		subjectService.getPaginated(20)
		console.log(subjectService.subjects)
	},[])
	const [subjectTableData, setSubjectTableData]=useState<IServiceSubject[]>([])
	useEffect(()=>{
		if(subjectService.subjects){
			setSubjectTableData(subjectService.subjects)
		}
	},[subjectService.subjects])
	return (
		<div style={{ margin: "3rem 10rem 0 10rem" }}>
			<h4 style={{ display: "block", paddingBottom: "1rem" }}>
				Quản lý môn học
			</h4>
			<MaterialReactTable
				columns={[
					{ accessorKey: "name", header: "Tên" },
					{ accessorKey: "abbrev", header: "Mã" },
					{ accessorKey: "uuid", header: "UUID" },
					{ accessorKey: "createdat", header: "Tạo lúc" },
					{ accessorKey: "authorid", header: "ID tác giả" },
					{ accessorKey: "schoolid", header: "ID trường" },
				]}
				data={subjectTableData}
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
							<Form.Control type="text" {...fields.name} />
						</Form.Group>
						<Form.Group controlId="abbrev">
							<Form.Label>Mã</Form.Label>
							<Form.Control type="text" {...fields.abbrev} />
						</Form.Group>
						<Form.Group controlId="schoolid">
							<Form.Label>Mã trường</Form.Label>
							<Form.Control type="text" {...fields.schoolid} disabled />
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
