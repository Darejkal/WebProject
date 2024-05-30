"use client";

import React, { type UIEvent, useCallback, useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Form, Modal } from "react-bootstrap";
import { IServiceSubject, useSubjectService } from "@/app/_services";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Autocomplete, TextField } from "@mui/material";
import { useFetch } from "@/app/_helpers/client";
import { toast } from "react-toastify";

const SubjectInstancesPage = () => {
	const router = useRouter();
	const subjectService = useSubjectService();
	const { register, handleSubmit, formState, control } = useForm();
	const { errors } = formState;
	const [subjectOptions, setSubjectOptions] = useState<string[]>([]);
	const [subjectInputValue, setSubjectInputValue] = useState<string | null>("");
	const [subjectValue, setSubjectValue] = useState<string | null>("");
	const fetch = useFetch();
	useEffect(() => {
		if (!subjectInputValue) {
			return;
		}
		let queryParam = new URLSearchParams();
		queryParam.set("query", subjectInputValue);
		console.log(`search?${queryParam.toString()}`);
		fetch.get(`/api/subject/search?${queryParam.toString()}`).then((v:any) => {
			setSubjectOptions(v.map(({ name }: any) => name));
		});
	}, [subjectInputValue, subjectValue]);
	const fields = {
		name: register("name", { required: "name is required" }),
		abbrev: register("abbrev", { required: "abbrev is required" }),
		schoolabbrev: register("schoolabbrev", {
			required: "schoolabbrev is required",
			value: "HUST",
		}),
	};
	const [showModal, setShowModal] = useState(false);
	async function onSubmit({ name, abbrev, schoolabbrev }: any) {
		try{
			console.log({ name, abbrev, schoolabbrev });
			const res = await subjectService.create({ name, abbrev, schoolabbrev });
			console.log(res);
			await subjectService.clearPage();
			await subjectService.getPaginated(20);
			setShowModal(false);
			toast.success("Tạo môn học mới thành công!",{delay:300})

		} catch(e){
			toast.warning("Tạo môn học mới thất bại!",{delay:300})
		}
		
	}
	const [isFetching, setIsFetching] = useState(false);
	const fetchNextPage = useCallback(
		(containerRefElement?: HTMLDivElement | null) => {
			if (containerRefElement) {
				const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

				//once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
				if (
					scrollHeight - scrollTop - clientHeight < 400 &&
					!subjectService.paginationEnded &&
					!isFetching
				) {
					setIsFetching(true);
					subjectService.getPaginated(20).then(() => {
						setIsFetching(false);
						console.log(subjectService.subjects);
					});
				}
			}
		},
		[
			isFetching,
			subjectService.subjects,
			subjectService.getPaginated,
			subjectService.paginationEnded,
		]
	);
	useEffect(() => {
		subjectService.getPaginated(20);
	}, []);
	return (
		<div style={{ margin: "3rem 10rem 0 10rem" }}>
			<h4 style={{ display: "block", paddingBottom: "1rem" }}>
				Quản lý môn học
			</h4>
			<MaterialReactTable
				initialState={{
					sorting:[
						{
							id:"createdat",
							desc:true
						}
					]
				}}
				columns={[
					{ accessorKey: "name", header: "Tên" },
					{ accessorKey: "abbrev", header: "Mã" },
					// { accessorKey: "uuid", header: "UUID" },
					{ accessorKey: "authorName", header: "Tên tác giả" },
					{ accessorKey: "createdat", header: "Tạo lúc" },
					// { accessorKey: "authorid", header: "ID tác giả" },
					{ accessorKey: "schoolabbrev", header: "ID trường" },
				]}
				data={subjectService.subjects ?? []}
				enablePagination={false}
				enableRowNumbers={true}
				state={{
					showProgressBars: isFetching,
				}}
				muiTableContainerProps={{
					sx: {
						maxHeight: "20rem",
					},
					onScroll: (event: UIEvent<HTMLDivElement>) =>
						fetchNextPage(event.target as HTMLDivElement),
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
							{/* <Form.Control type="text" {...fields.name} /> */}

							<Autocomplete
								options={subjectOptions}
								filterOptions={(x) => x}
								// getOptionLabel={{}}
								// renderOption={{}}

								onInputChange={(e, value) => setSubjectInputValue(value)}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Nhập tên môn học"
										fullWidth
										{...fields.name}
									/>
								)}
								value={subjectInputValue}
								onChange={(e, value, ...args) => {
									setSubjectOptions(
										value ? [value, ...subjectOptions] : subjectOptions
									);
									setSubjectValue(value);
								}}
							/>
						</Form.Group>
						<Form.Group controlId="abbrev">
							<Form.Label>Mã</Form.Label>
							<Form.Control type="text" {...fields.abbrev} />
						</Form.Group>
						<Form.Group controlId="schoolabbrev">
							<Form.Label>Mã trường</Form.Label>
							<Form.Control type="text" {...fields.schoolabbrev} disabled />
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
