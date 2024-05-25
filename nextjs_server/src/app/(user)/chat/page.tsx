"use client";
import { useFetch } from "@/app/_helpers/client";
import { ChatBubbleLeftIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Keyboard, VideoCall, VideoCallOutlined } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardImg,
	Form,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ChatPage() {
	const fetch = useFetch();
	const router = useRouter();
	const {register, handleSubmit, formState}=useForm();
	const fields={
		'roomid': register('roomid', { required: 'Roomid is required' }),
	}
	const createRoomUUID = async () => {
		let { uuid } = await fetch.get(
			"http://localhost:6060/call/api/getroom/",
			undefined,
			undefined,
			{ mode: "cors" }
		);
		if (uuid) {
			return uuid;
		} else {
			throw "id is null";
		}
	};
	const startCall = async () => {
		let uuid = await createRoomUUID();
		console.log("startcall");
		console.log(uuid);
		if (uuid) {
			router.push(`/chat/call/${uuid}`);
		}
	};
	const onSubmit=async({roomid}:any)=>{
		if(roomid){
			router.push(`/chat/call/${roomid}`);
		}
	}
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				height: "100%",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div>
				<h1>Bắt đầu cuộc gọi với Huster</h1>
				<div style={{ padding: "1rem 0", height: "3rem", display: "flex" }}>
					<Button
						style={{ height: "3rem", margin: "0", border: "0" }}
						onClick={() => {
							startCall();
						}}
					>
						<VideoCallOutlined /> Cuộc gọi mới
					</Button>
					<form style={{display:"flex",flexDirection:'row'}} onSubmit={handleSubmit(onSubmit)}>
						<div>
							<input
								placeholder="Điền mã room"
								style={{
									marginLeft: "1rem",
									height: "3rem",
									padding: "0.2rem 1rem",
									boxSizing: "border-box",
								}}
								{...fields.roomid}
							/>
						</div>
						<button
							style={{
								height: "3rem",
								marginLeft: "1.2rem",
								border: "0",
								backgroundColor: "transparent",
							}}
							className="text-primary"
							type="submit"
						>
							Join
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
