"use client";
import { CustomInfiniteScroll } from "@/app/_components/CustomInfiniteScroll";
import { useFetch } from "@/app/_helpers/client";
import { IServiceExamInstance } from "@/app/_services";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ExamComponent } from "./components";
import { MaterialReactTable } from "material-react-table";
import { formatDateString } from "@/app/_helpers/clientutils";
import { Button, Table } from "react-bootstrap";

export default function ExamInstancePage() {
	const fetch = useFetch();
	const router = useRouter();
	const { examinstanceid } = useParams();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isCommitted, setIsCommitted] = useState<boolean>(true);
	const [examInstance, setExamInstance] = useState<IServiceExamInstance>();
	useEffect(() => {
		fetch
			.get("/api/examinstance/getcurrent/" + examinstanceid)
			.then((v) => {
				if (v) {
					setExamInstance(v);
					setIsLoading(false);
				} else {
					throw "invalid response";
				}
			})
			.catch((e) => {
				toast.warning("Lỗi kết nối. Đang điều hướng..");
				router.push("/dashboard");
			});
		fetch.post("/api/examinstance/session/getcommitcurrent",{examinstanceid}).then((v)=>{
			setIsCommitted(v.committed)
		})
	}, []);
	return (
		<div style={{ padding: "3rem 10rem" }}>
			<h3>Thông tin bài kiểm tra</h3>
			<MaterialReactTable
				enableColumnActions={false}
				enableColumnFilters={false}
				enablePagination={false}
				enableSorting={false}
				enableTopToolbar={false}
				enableBottomToolbar={false}
				muiTableBodyRowProps={{
					hover: false,
					style: {
						border: "none",
					},
				}}
				muiTableContainerProps={{}}
				columns={[
					{ accessorKey: "name", header: "Tên" },
					{
						accessorKey: "createdat",
						header: "Thời điểm tạo",
						Cell: ({ cell }) => formatDateString(cell.getValue<string>()),
					},
					{
						accessorKey: "endtime",
						header: "Hạn nộp",
						Cell: ({ cell }) => formatDateString(cell.getValue<string>()),
					},
					{ accessorKey: "description", header: "Chi tiết" },
				]}
				data={examInstance ? [examInstance] : []}
				state={{
					isLoading,
				}}
			/>
			{!isLoading && (
				<div style={{display:"flex",flexDirection:"row",justifyContent:"end",width:"100%",marginTop:"1rem"}}>
					<Button disabled={isCommitted} href={isCommitted?undefined:("/examinstance/begin/"+examinstanceid)}>Tham gia bài kiểm tra</Button>
				</div>
			)}
		</div>
	);
}
