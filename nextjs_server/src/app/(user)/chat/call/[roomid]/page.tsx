"use client";
import { useFetch } from "@/app/_helpers/client";
import { ChatBubbleLeftIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Keyboard, VideoCall, VideoCallOutlined } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
	const { roomid } = useParams();
	const videoContainerRef = useRef<HTMLDivElement>(null);
	const [stream,setStream]=useState<MediaStream|null>(null);
	function handleStream(stream:MediaStream) {
		console.log("handleStream called")
		let pc = new RTCPeerConnection({
			iceServers: [],
		});
		pc.ontrack = function (event) {
			console.log("Track added. Track event is dispatching..");
			console.log(event)
			if (event.track.kind === "audio") {
				return;
			}
			// @ts-ignore
			let el:HTMLVideoElement|HTMLAudioElement = document.createElement(event.track.kind);
			el.setAttribute("id", event.track.id);
			el.srcObject = event.streams[0];
			el.autoplay = true;
			el.controls = true;
			videoContainerRef.current?.appendChild(el);

			// Verify this?
			event.track.onmute = function (event) {
				el.pause();
			};
			event.track.onunmute = function(event) {
			  el.play()
			}

			event.streams[0].onremovetrack = ({ track }) => {
				if (el.parentNode) {
					el.parentNode.removeChild(el);
				}
			};
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
		if(videoContainerRef.current){
			for(const track of stream.getVideoTracks()){
				// @ts-ignore
				let el:HTMLVideoElement|HTMLAudioElement = document.createElement(track.kind);
				el.setAttribute("id", "localstream");
				el.srcObject = stream;
				el.autoplay = true;
				el.controls = true;
				videoContainerRef.current?.appendChild(el);
			}
		}
		stream.getTracks().forEach((track) => {
			console.log(`Adding 1 ${track.kind} track to rtcpeerconnection`);
			pc.addTrack(track, stream);
			console.log(`Added 1 ${track.kind} track to rtcpeerconnection`);
		});
		let ws = new WebSocket(
			`ws://localhost:6060/call/websocket/${roomid}`
		);

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
					pc.addIceCandidate(candidate);
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
				window.alert(e);
			});
	}, []);
	return (
		<div>
			{/* <video
				ref={localVideoRef}
				id="localVideo"
				width="160"
				height="120"
				autoPlay
				muted
			></video> */}
			<br />
			<div ref={videoContainerRef} id="remoteVideos"></div> <br />
		</div>
	);
}
