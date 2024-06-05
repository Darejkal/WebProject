"use client";

import { sign } from "crypto";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUserService } from "../../_services";
import { useEffect, useState } from "react";
import { SubjectInstanceCard } from "./components";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { IServiceSubjectInstance, useSubjectInstanceService } from "@/app/_services/useSubjectInstanceService";
import InfiniteScroll from "react-infinite-scroll-component";
import { json } from "stream/consumers";

export default function IndexPage() {
	const router = useRouter();
	const userService = useUserService();
	const subjectInstanceService = useSubjectInstanceService();
	const [subjectInstances, setSubjectInstances] = useState<IServiceSubjectInstance[]>([]);
	useEffect(() => {
		// subjectInstanceService.getallCurrent().then((vals) => {
		// 	setSubjectInstances(vals);
		// 	console.log("vals");
		// 	console.log(vals);
		// });
		subjectInstanceService.getPaginated({limit:30})
	}, []);
	useEffect(()=>{
		console.log("subjectInstanceService.paginationEnded===true")
		console.log(subjectInstanceService.paginationEnded===true)
	},[subjectInstanceService.paginationEnded])
	return (
		<div style={{ margin: "0 10rem" }}>
			<div style={{ display: "flex", flexDirection: "column", }}>
				<div style={{ padding: "2rem 0" }}>
					<h3 style={{ fontWeight: "bold" }}>Lớp học của tôi</h3>
				</div>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<div style={{ flex:3 }}>
						{/* {subjectInstances.length == 0
							? "No class found!"
							: subjectInstances.map((val) => {
									return <SubjectInstanceCard />;
						})} */}
						<InfiniteScroll
							dataLength={subjectInstanceService.subjectinstances?.length??0}
							next={()=>{
								console.log("ok")
								subjectInstanceService.getPaginated({limit:30})}}
							hasMore={subjectInstanceService.paginationEnded!==true}
							loader={<h4>Loading...</h4>}
						>
							{subjectInstanceService.subjectinstances?.map((val, index) => (
								<div key={index} style={{marginBottom:"1rem"}}>
									<SubjectInstanceCard {...val}/>
								</div>
							))}
						</InfiniteScroll>
					</div>
					<div style={{ maxWidth: "30rem", paddingLeft: "5rem", flex:1 }}>
						<Form
							style={{ display: "flex", flexDirection: "row", width: "100%" }}
						>
							<Form.Control placeholder="Tìm kiếm" style={{ width: "100%" }} />
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
