"use client";

import React, { type UIEvent, useCallback, useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Form, Modal } from "react-bootstrap";
import {
	IServiceSubjectInstance,
	IServiceUserSubjectViewInstance,
	useSubjectInstanceService,
} from "@/app/_services";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useFetch } from "@/app/_helpers/client";
import { Autocomplete, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { PaginatedTable } from "@/app/_components/PaginatedTable";
import debounce from "lodash/debounce";
import SearchableInput from "@/app/_components/SearchableInput";
import { UserSubjectDataCard } from "./components";
import { CustomInfiniteScroll } from "@/app/_components/CustomInfiniteScroll";
export default function TeacherSubjectInstancesPage() {
	const router = useRouter();
	const subjectInstanceService = useSubjectInstanceService();
	const { register, handleSubmit, formState, setValue,getValues } = useForm();
	const { errors } = formState;
	const [nextPage, setNextPage] = useState<string | undefined>();
	const [loading, setLoading] = useState<boolean>(true);
	const [subjectInstanceState,setSubjectInstanceState]=useState<IServiceUserSubjectViewInstance[]>([]);
	const fetch = useFetch();
	const [userSubjectQuery, setUserSubjectQuery] = useState<string>("");
	const fetchData=useCallback(({ limit, next, query }:{ limit: number; next?: string | undefined; query?: string | undefined; }) => {
		if (typeof next === "undefined") {
			next = nextPage;
		}
		return fetch
			.post("/api/subjectinstance/getpaginatedcurrent", {
				limit,
				next,
				query,
				role: "teacher",
			})
			.then((v) => {
				if (v) {
					setNextPage(v.next);
					if(next){
						setSubjectInstanceState(pre=>[...pre,...(v.results ?? [])]);
					} else{
						setSubjectInstanceState(v.results ?? []);
					}
					return v.results as IServiceUserSubjectViewInstance[];
				}
				throw "exception";
			})
			.catch((e) => {
				return [];
			});
	},[userSubjectQuery,subjectInstanceState,nextPage])
	useEffect(()=>{
		setLoading(true)
		fetchData({limit:20,next:"",query:userSubjectQuery}).finally(()=>{
			setLoading(false);
		})
	},[userSubjectQuery])
	const fields={
		usersubjectquery:register("usersubjectquery")
	}
	const onSubmit=(props:any)=>{
		let value=getValues(fields.usersubjectquery.name)
		setUserSubjectQuery(value)
	}
	return (
		<div
			style={{
				margin: "3rem 10rem 0 10rem",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<h4 style={{ display: "block", paddingBottom: "1rem" }}>
				Lớp học thuộc quản lý của bạn
			</h4>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<div style={{ flex: 3 }}>
					<div>
						{
							!loading&&subjectInstanceState.length>0&&<CustomInfiniteScroll
							pagination={{
								getPaginated: fetchData ,
								data: subjectInstanceState,
							}}
							renderItem={({ data, index }) => (
								<div key={index}>
									<UserSubjectDataCard data={data} />
								</div>
							)}
						/>
						}
						{
							!loading&&subjectInstanceState.length==0&&<>
								<p>
									{`Không tìm thấy lớp liên quan đến truy vấn '${userSubjectQuery}'.`}
								</p>
							</>
						}
						{
							loading&&(
								<div>
									<UserSubjectDataCard />
								</div>
							)
						}
					</div>
				</div>
				<div style={{ flex: 1.3, marginLeft: "6rem" }}>
					<div>
						<Form
							style={{ display: "flex", flexDirection: "row", width: "100%" }}
							onSubmit={handleSubmit(onSubmit)}
						>
							<TextField style={{ width: "100%" }} 
								{...fields.usersubjectquery} 
								label={"Tìm kiếm"}
							/>
							<Button type="submit" style={{ marginLeft: "0.5rem" }}>
								Tìm
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
}
