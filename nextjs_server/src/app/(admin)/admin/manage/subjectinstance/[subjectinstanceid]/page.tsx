"use client";

import { PaginatedTable } from "@/app/_components/PaginatedTable";
import {
	IServiceSubjectInstance,
	useSubjectInstanceService,
} from "@/app/_services";
import { useSubjectInstanceUserService } from "@/app/_services/useSubjectInstanceUserService";
import { MaterialReactTable } from "material-react-table";
import { notFound } from "next/navigation";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { DeleteSubjectInstanceModalButton } from "./components";
import { toast } from "react-toastify";

export default function SubjectInstancesSinglePage() {
	const subjectInstanceService = useSubjectInstanceService();
	const subjectInstanceUserService = useSubjectInstanceUserService();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { subjectinstanceid }: { subjectinstanceid: string } = useParams();
	const router = useRouter();
	const [subjectinstance, setSubjectInstance] =
		useState<IServiceSubjectInstance>();
	useEffect(() => {
		console.log(subjectinstanceid);
		subjectInstanceService
			.getOne(subjectinstanceid)
			.then((v) => {
				setSubjectInstance(v);
			})
			.catch((e) => {
				toast.info("Không tìm thấy lớp học được chỉ định. Đang điều hướng...")
				router.push("/admin/manage/subjectinstance");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);
	return (
		<div style={{ margin: "3rem 10rem" }}>
			<div>
				<h4 style={{ margin: "1rem 0" }}>Quản lý lớp</h4>
				<MaterialReactTable
					enableColumnActions={false}
					enableColumnFilters={false}
					enablePagination={false}
					enableSorting={false}
					enableTopToolbar={false}
					enableBottomToolbar={false}
					muiTableBodyRowProps={{ hover: false }}
					columns={[
						{ accessorKey: "subjectAbbrev", header: "Mã môn học" },
						{ accessorKey: "subjectName", header: "Tên môn học" },
						{ accessorKey: "name", header: "Tên" },
						{ accessorKey: "createdat", header: "Ngày tạo" },
						{ accessorKey: "authorName", header: "Tên tác giả" },
					]}
					data={subjectinstance ? [subjectinstance] : []}
					state={{
						isLoading,
					}}
				/>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					width: "100%",
					justifyContent: "end",
					alignItems: "center",
					margin: "1rem 0",
				}}
			>
				{subjectinstance&&<DeleteSubjectInstanceModalButton subjectinstance={subjectinstance}/>}
				<Button onClick={() => {}} variant="outline-success" className="m-1">
					Chỉnh sửa
				</Button>
			</div>
			<div>
				<h4 style={{ margin: "1rem 0" }}>Danh sách giảng viên</h4>

				<PaginatedTable
					tableProps={{
						columns: [
							{ accessorKey: "name", header: "Tên" },
							{ accessorKey: "abbrev", header: "Mã" },
							// { accessorKey: "uuid", header: "UUID" },
							{ accessorKey: "authorName", header: "Tên tác giả" },
							{ accessorKey: "createdat", header: "Tạo lúc" },
							// { accessorKey: "authorid", header: "ID tác giả" },
							{ accessorKey: "schoolabbrev", header: "ID trường" },
						],
					}}
					pagination={{
						getPaginated: (props)=>subjectInstanceUserService.getPaginated({...props,role:"teacher"}),
						data: subjectInstanceUserService.subjectinstanceusers.get("teacher"),
					}}
				/>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					width: "100%",
					justifyContent: "end",
					alignItems: "center",
					margin: "1rem 0",
				}}
			>
				<Button onClick={() => {}} variant="outline-success" className="m-1">
					Thêm giảng viên
				</Button>
			</div>
			<div>
				<h4 style={{ margin: "1rem 0" }}>Danh sách sinh viên</h4>

				<PaginatedTable
					tableProps={{
						columns: [
							{ accessorKey: "name", header: "Tên" },
							{ accessorKey: "abbrev", header: "Mã" },
							// { accessorKey: "uuid", header: "UUID" },
							{ accessorKey: "authorName", header: "Tên tác giả" },
							{ accessorKey: "createdat", header: "Tạo lúc" },
							// { accessorKey: "authorid", header: "ID tác giả" },
							{ accessorKey: "schoolabbrev", header: "ID trường" },
						],
					}}
					pagination={{
						getPaginated: (props)=>subjectInstanceUserService.getPaginated({...props,role:"student"}),
						data: subjectInstanceUserService.subjectinstanceusers.get("student"),
					}}
				/>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					width: "100%",
					justifyContent: "end",
					alignItems: "center",
					margin: "1rem 0",
				}}
			>
				<Button onClick={() => {}} variant="outline-success" className="m-1">
					Thêm sinh viên
				</Button>
			</div>
		</div>
	);
}
