'use client'
import { PaginatedTable } from "@/app/_components/PaginatedTable"
import { useUserService } from "@/app/_services"
import { useRouter } from "next/navigation";

export default function AdminUserManagePage(){
    const router=useRouter();
    const userService=useUserService()
    return (
        <div style={{ margin: "3rem 10rem 0 10rem" }}>
			<h4 style={{ display: "block", paddingBottom: "1rem" }}>
				Quản lý người dùng
			</h4>
            <PaginatedTable
                tableProps={{
                    columns:[
                        { accessorKey: "name", header: "Tên" },
                        { accessorKey: "email", header: "Email" },
                        { accessorKey: "position", header: "Vị trí quản trị" },
                    ],
					muiTableBodyRowProps:({row})=>({
						// onClick:(e)=>{
						// 	router.push(`/admin/manage/subjectinstance/${row.original.uuid}`)
						// },
						// sx:{cursor: "pointer"}
					})
                }}
                pagination={{
                    getPaginated:userService.getPaginated,
                    data:userService.users
                }}
            />
        </div>
    )
}