"use client";

import { sign } from "crypto";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUserService } from "../../_services";
import { useEffect, useState } from "react";
import { SubjectInstanceCard } from "./components";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSubjectInstanceService } from "@/app/_services/useSubjectInstanceService";

export default function IndexPage() {
	const router = useRouter();
	const userService = useUserService();
	const subjectInstanceService = useSubjectInstanceService();
	const [subjectInstances, setSubjectInstances] = useState([]);
	useEffect(() => {
		subjectInstanceService.getallCurrent().then((vals) => {
			setSubjectInstances(vals);
			console.log("vals");
			console.log(vals);
		});
	}, []);

	return (
		<div style={{ display: "flex", flexDirection: "row", margin: "0 10rem" }}>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div style={{ padding: "2rem 0" }}>
					<h3 style={{ fontWeight: "bold" }}>Lớp học của tôi</h3>
				</div>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<div style={{ minWidth: "50rem" }}>
						{subjectInstances.length == 0
							? "No class found!"
							: subjectInstances.map((val) => {
									return <SubjectInstanceCard />;
							  })}
					</div>
					<div style={{ maxWidth: "30rem", paddingLeft: "5rem" }}>
						<Form
							style={{ display: "flex", flexDirection: "row", width: "100%" }}
						>
							<Form.Control placeholder="Tìm kiếm" style={{ width: "100%" }} />
							<Button type="submit" style={{ marginLeft: "0.2rem" }}>
								Tìm
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
}
