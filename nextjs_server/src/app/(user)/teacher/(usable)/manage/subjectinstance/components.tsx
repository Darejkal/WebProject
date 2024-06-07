import { IServiceSubjectInstance, IServiceUserSubjectViewInstance } from "@/app/_services/useSubjectInstanceService";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, ReactNode } from "react";
import { Button, Card, Placeholder } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import {formatDateString} from "@/app/_helpers/clientutils"
import { useFetch } from "@/app/_helpers/client/useFetch";
import { IServiceSubject } from "@/app/_services/useSubjectService";
export function UserSubjectDataCard({ data }: { data?:IServiceUserSubjectViewInstance }) {
	const router=useRouter()
	const [imgURL,setImgURL]=useState<string>();
	const fetch=useFetch();
	useEffect(()=>{
		if(data?.subjectabbrev){
			fetch.get(`/api/subject/getabbrev/${data.subjectabbrev}`).then((v:IServiceSubject)=>{
				if(v.imgurl){
					setImgURL(v.imgurl)
				}
			})
		}
	},[data?.subjectabbrev])
	if(!data){
		return <Card
		style={{
			width: "100%",
			display: "flex",
			flexDirection: "row",
			maxHeight: "10rem",
			margin:"0.3rem 0"
			// padding:"0"
		}}
	>
		<div
				style={{
					objectFit: "cover",
					width: "40%",
					borderBottomRightRadius: 0,
					borderTopRightRadius: 0,
				}}
			/>
		<Card.Body>
			<Placeholder xs={4}></Placeholder>
			<div className="text-muted">
			<p>
			<Placeholder xs={6}></Placeholder>
			<br/>
			<Placeholder xs={6}></Placeholder>
			</p>
			</div>
			<Placeholder.Button xs={3}></Placeholder.Button>
		</Card.Body>
	</Card>
	}
    return (
		<Card
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "row",
				maxHeight: "10rem",
				margin:"0.3rem 0"
                // padding:"0"
			}}
		>
			<Card.Img
				src={imgURL??"https://upload.wikimedia.org/wikipedia/commons/a/a1/Logo_Hust.png"}
				style={{
					objectFit: "cover",
					maxWidth: "40%",
					borderBottomRightRadius: 0,
					borderTopRightRadius: 0,
				}}
			/>
			<Card.Body>
				<h5>{data.subjectinstancename}</h5>
				<div className="text-muted">
					<p>
						<span>{data.subjectabbrev}</span>
						<br />
						<span>{formatDateString(data.createdat)}</span>
					</p>
				</div>
				<Button   
				href={"/teacher/manage/subjectinstance/"+data.subjectinstanceid}
				// onClick={()=>{
				// 	router.push("/teacher/manage/subjectinstance/"+data.uuid)
				// }}
				>Xem khoá học</Button>
			</Card.Body>
		</Card>
	);
}

