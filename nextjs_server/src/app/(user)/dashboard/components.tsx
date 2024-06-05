'use client'
import { IServiceSubjectInstance } from "@/app/_services/useSubjectInstanceService";
import { useRouter } from "next/navigation";
import {
	Card,
	CardBody,
	CardHeader,
	CardImg,
	Image,
	Button,
} from "react-bootstrap";

export const SubjectInstanceCard = ({subjectName,subjectAbbrev,name,createdat,uuid}:IServiceSubjectInstance) => {
	const router=useRouter();
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
				as={Image}
				src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Logo_Hust.png"
				style={{
					objectFit: "cover",
					maxWidth: "40%",
					borderBottomRightRadius: 0,
					borderTopRightRadius: 0,
				}}
			/>
			<CardBody>
				<h5>{name}</h5>
				<div className="text-muted">
					<p>
						<span>{subjectName}</span>-<span>{subjectAbbrev}</span>
						<br />
						<span>{createdat}</span>
					</p>
				</div>
				<Button onClick={()=>{
					router.push("/subjectinstance/"+uuid)
				}}>Xem khoá học</Button>
			</CardBody>
		</Card>
	);
};
