"use client";
import { useFetch } from "@/app/_helpers/client";
import { ChatBubbleLeftIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Keyboard, VideoCall, VideoCallOutlined } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
function hasAudio(video: HTMLVideoElement | HTMLAudioElement) {
	if (
		("mozHasAudio" in video &&
			typeof video.mozHasAudio !== "undefined" &&
			video.mozHasAudio) ||
		("webkitAudioDecodedByteCount" in video &&
			typeof video.webkitAudioDecodedByteCount ==="number" &&
			video.webkitAudioDecodedByteCount > 0) ||
		("audioTracks" in video &&typeof video.audioTracks === "object"&&video.audioTracks&&"length" in video.audioTracks && Boolean(video.audioTracks.length))
	) {
		return true;
	} else {
		return false;
	}
}
function getChatWindows(stream: MediaStream) {
	const frag = document.createDocumentFragment();
	for (const track of stream.getTracks()) {
		if (track.kind == "audio") {
			continue;
		}

		let el = document.createElement(track.kind) as
			| HTMLVideoElement
			| HTMLAudioElement;
		el.setAttribute("id", track.id);
		el.style.height = "100%";
		el.srcObject = stream;
		el.autoplay = true;
		el.controls = false;
		let wrapper = document.createElement("div");
		wrapper.style.borderRadius = "10px";
		wrapper.style.overflow = "hidden";
		wrapper.style.margin = "1rem";
		wrapper.style.position = "relative";
		wrapper.appendChild(el);
		let mutedIcon=document.createElement("div");
		mutedIcon.style.position="absolute"
		mutedIcon.style.bottom="0"
		mutedIcon.style.right="0"
		mutedIcon.style.margin="1rem"
		mutedIcon.style.width="3rem"
		mutedIcon.style.height="3rem"
		mutedIcon.style.color="white"
		mutedIcon.innerHTML=`
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1.95863 8.57679C2.24482 8.04563 2.79239 7.53042 3.33997 7.27707C3.9393 6.99979 4.62626 6.99979 6.00018 6.99979C6.51225 6.99979 6.76828 6.99979 7.01629 6.95791C7.26147 6.9165 7.50056 6.84478 7.72804 6.74438C7.95815 6.64283 8.1719 6.50189 8.59941 6.22002L8.81835 6.07566C11.3613 4.39898 12.6328 3.56063 13.7001 3.92487C13.9048 3.9947 14.1029 4.09551 14.2798 4.21984C15.2025 4.86829 15.2726 6.37699 15.4128 9.3944C15.4647 10.5117 15.5001 11.4679 15.5001 11.9998C15.5001 12.5317 15.4647 13.4879 15.4128 14.6052C15.2726 17.6226 15.2025 19.1313 14.2798 19.7797C14.1029 19.9041 13.9048 20.0049 13.7001 20.0747C12.6328 20.4389 11.3613 19.6006 8.81834 17.9239L8.59941 17.7796C8.1719 17.4977 7.95815 17.3567 7.72804 17.2552C7.50056 17.1548 7.26147 17.0831 7.01629 17.0417C6.76828 16.9998 6.51225 16.9998 6.00018 16.9998C4.62626 16.9998 3.9393 16.9998 3.33997 16.7225C2.79239 16.4692 2.24482 15.9539 1.95863 15.4228C1.6454 14.8414 1.60856 14.237 1.53488 13.0282C1.52396 12.849 1.51525 12.6722 1.50928 12.4998" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 10L18 14M18 10L22 14" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
		`
		mutedIcon.style.display="none"
		wrapper.appendChild(mutedIcon);
		track.onmute = function (event) {
			console.log("muted");
			mutedIcon.style.display=hasAudio(el)?"block":"none";
		};
		track.onunmute = function (event) {
			console.log("unmuted");
			mutedIcon.style.display=hasAudio(el)?"block":"none";
		};

		// let actionBar=document.createElement("div");
		// actionBar.style.position="absolute"
		// actionBar.style.bottom="0"
		// actionBar.style.left="0"
		// actionBar.style.right="0"
		// actionBar.style.margin="0 auto"
		// actionBar.style.width="50%"
		// actionBar.style.display="flex"
		// actionBar.style.flexDirection="row"
		// actionBar.style.justifyContent="space-around"
		// actionBar.style.alignItems="center"
		// actionBar.style.padding="0.5rem 0"
		// wrapper.appendChild(actionBar)
		stream.onremovetrack = ({ track }) => {
			if (wrapper.parentNode) {
				wrapper.parentNode.removeChild(wrapper);
			}
		};
		track.onended=()=>{
			if (wrapper.parentNode) {
				wrapper.parentNode.removeChild(wrapper);
			}
		}

		frag.appendChild(wrapper);
	}
	return frag;
}
export default function ChatPage() {
	const { roomid } = useParams()
	const videoContainerRef = useRef<HTMLDivElement>(null);
	const localVideoStream = useRef<MediaStream | null>(null);
	// const localAudio=useRef(null)
	function handleStream(stream: MediaStream) {
		if(localVideoStream.current){
			return;
			// localVideoStream.current.getTracks().map((v)=>{
			// 	v.stop();
			// 	localVideoStream.current!.removeTrack(v)
			// });
		}
		localVideoStream.current = stream;
		// if (videoContainerRef.current) {
		// 	videoContainerRef.current.innerHTML = "";
		// }
		console.log("handleStream called");
		let pc = new RTCPeerConnection({
			iceServers: [],
		});
		pc.ontrack = function (event) {
			console.log("Track added. Track event is dispatching..");
			console.log(event);
			if (event.track.kind === "audio") {
				return;
			}
			for (const s of event.streams) {
				videoContainerRef.current?.appendChild(getChatWindows(s));
			}
		};
		pc.onicecandidate = (e) => {
			if (e.candidate != null) {
				ws.send(
					JSON.stringify({
						event: "candidate",
						data: JSON.stringify(e.candidate),
					})
				);
			}
		};
		videoContainerRef.current?.appendChild(getChatWindows(stream));
		stream.getTracks().forEach((track) => {
			console.log(`Adding 1 ${track.kind} track to rtcpeerconnection`);
			pc.addTrack(track, stream);
			console.log(`Added 1 ${track.kind} track to rtcpeerconnection`);
		});
		let ws = new WebSocket(`ws://localhost:6060/call/websocket/${roomid}`);

		ws.onclose = function (evt) {
			window.alert("Websocket has closed");
		};

		ws.onmessage = function (evt) {
			let msg = JSON.parse(evt.data);
			console.log(msg);
			if (!msg) {
				return console.log("failed to parse msg");
			}

			switch (msg.event) {
				case "offer":
					let offer = JSON.parse(msg.data);
					if (!offer) {
						return console.log("failed to parse answer");
					}
					pc.setRemoteDescription(offer)
						.then(() => pc.createAnswer())
						.then(async (answer) => {
							console.log("setlocaldone");
							await pc.setLocalDescription(answer);
							return answer;
						})
						.then((answer) => {
							ws.send(
								JSON.stringify({
									event: "answer",
									data: JSON.stringify(answer),
								})
							);
						})
						.catch((e) => {
							window.alert(e);
						});
					return;

				case "candidate":
					let candidate = JSON.parse(msg.data);
					if (!candidate) {
						return console.log("failed to parse candidate");
					}
					try {
						pc.addIceCandidate(candidate);
					} catch (e) {
						console.log(e);
					}
					return;
			}
		};

		ws.onerror = function (evt) {
			console.log("ERROR: " + evt);
		};
	}
	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({
				video: true,
				audio: true,
			})
			.then((stream) => {
				handleStream(stream);
			})
			.catch((e) => {
				console.log("usermedia exception");
				window.alert(e)
			});
	}, []);
	return (
		<div>
			<div
				ref={videoContainerRef}
				id="videoContainer"
				style={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
				}}
			></div>
			<div
				style={{
					position: "absolute",
					bottom: "0",
					left: "0",
					right: "0",
					margin: "0 auto 2rem auto",
					padding: "1.5rem 2rem",
					borderRadius: "20px",
					backgroundColor: "rgba(0, 0, 0, 0.05);",
					width: "30%",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Link href="/chat">End Call</Link>
				<Button
					onClick={() => {
						if (localVideoStream.current) {
							localVideoStream.current.getAudioTracks().map((v) => {
								v.enabled = !v.enabled;
							});
						}
					}}
				>
					Mute
				</Button>
				<Button
					onClick={() => {
						if (localVideoStream.current) {
							localVideoStream.current.getVideoTracks().map((v) => {
								v.enabled = !v.enabled;
							});
						}
					}}
				>
					Disable cam
				</Button>
			</div>
		</div>
	);
}
