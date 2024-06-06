'use client'
import { PaginatedTable } from "@/app/_components/PaginatedTable"
import { useUserService } from "@/app/_services"
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";
import { AddUserModal, DeleteUserModal, UpdateUserModal } from "./components";
import { useEffect } from "react";
import { Button } from "react-bootstrap";

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
                    displayColumnDefOptions: {
                        'mrt-row-actions': {
                          header: 'Hành động', 
                        },
                    },
                    enableRowActions: true,
                    renderRowActions:({row}) =>(
                        userService?.currentUser?.uuid!==row.original.uuid?
                        (<Box>
                            <UpdateUserModal user={row.original} afterSubmit={()=>userService.getPaginated({limit:20,next:""})}/>
                            <DeleteUserModal user={row.original} afterSubmit={()=>userService.getPaginated({limit:20,next:""})}/>
                        </Box>):<span>{"Người dùng hiện tại"}</span>
                    ),
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
            <div style={{display:"flex",flexDirection:"row",justifyContent:"end",marginTop:"1rem"}}>
                <AddUserModal afterSubmit={()=>{
                    userService.getPaginated({limit:20,next:""})
                }}/>
            </div>
        </div>
    )
}