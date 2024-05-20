// import CardMedia from "@mui/material/CardMedia";
import {
	Card,
	CardBody,
	CardHeader,
	CardImg,
	Image,
	Button,
} from "react-bootstrap";

export const SubjectInstanceCard = () => {
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
				<h5>SubjectInstanceName</h5>
				<div className="text-muted">
					<p>
						<span>School</span>-<span>SubjectID</span>
						<br />
						<span>Createdat</span>
					</p>
				</div>
				<Button>Xem khoá học</Button>
			</CardBody>
		</Card>
	);
};
