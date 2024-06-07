"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserService } from "@/app/_services";
import "bootstrap/dist/css/bootstrap.min.css";
import { QuestionItem, QuestionList, Question } from "./components";
import { useFetch } from "@/app/_helpers/client";
import { toast } from "react-toastify";
import { formatDateString } from "@/app/_helpers/clientutils";
import { Button } from "react-bootstrap";

export default function ExamPage() {
	const { examinstanceid } = useParams();
	const [questions, setQuestions] = useState<Question[]>([]);
	const [timeLeft, setTimeLeft] = useState<number>(100);
	const [timerOn, setTimerOn] = useState<boolean>(false);
	const [timeOut, setTimeOut] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(true);
	const [endtime, setEndTime] = useState<string>("");
    const router=useRouter();
	const fetch = useFetch();
	useEffect(() => {
		fetch
			.get("/api/examinstance/session/getcurrent/" + examinstanceid)
			.then((v) => {
				setQuestions(v.questions);
				if (v.endtime) {
					setEndTime(v.endtime);
					try {
						setTimeLeft(
							Math.abs(new Date(v.endtime).getTime() - new Date().getTime()) /
								1000
						);
                        setTimerOn(true)
					} catch (e) {}
				} else {
					setTimerOn(false);
				}
				setLoading(false);
			}).catch((e)=>{
                toast.warning("Lỗi kết nối. Đang điều hướng...")
                router.push("/dashboard")
            });
	}, []);
	useEffect(() => {
		const timer = setInterval(() => {
			if (timerOn) {
				if (timeLeft > 0) {
					setTimeLeft((prevTime) => prevTime - 1);
				} else {
					setTimeOut(true);
				}
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [timeLeft, timerOn, timeOut]);

	const handleAnswerChange = (questionId: string, answerid: string) => {
		setQuestions((prevQuestions) =>
			prevQuestions.map((question) => {
				if (question.uuid === questionId) {
					let updatedstate = {
						...question,
						options: question.options.map((v) => {
							if (v.uuid == answerid) {
								v.ischosen = true;
							}
							return v;
						}),
					};
					return updatedstate;
				}
				return question;
			})
		);
	};

	const isAnswerSelected = (questionId: string) => {
		const question = questions.find((q) => q.uuid === questionId);
		return question &&
			question.options.reduce(
				(pre, cur) => (pre || cur?.ischosen ? true : false),
				false as boolean
			)
			? true
			: false;
	};

	const handleSubmit = async (questionId: string) => {
		let cur = await Promise.all(
			questions.map(async (question) => {
				if (question.uuid === questionId) {
					return fetch
						.post("/api/examinstance/session/commit", {
							questionid: question.uuid,
							options: question.options,
							examinstanceid,
						})
						.then(() => {
							return { ...question, submitted: true };
						})
						.catch((e) => {
							toast.dismiss();
							toast.warning("Lưu kết quả thất bại. Vui lòng thử lại.");
                            throw e
						});
				}
				return question;
			})
		);
		setQuestions(cur);
	};

	return (
		<div style={{ margin: "50px 20px 0 20px" }}>
			<div
				style={{
					flex: 1,
					justifyContent: "flex-start",
					marginRight: "32px",
					borderBottom: "1px solid #D4D4D4",
				}}
			>
				<button
					style={{
						backgroundColor: "#3738E2",
						padding: 0,
						height: "42px",
						borderRadius: "8px 8px 0 0 !important",
						border: 0,
					}}
				>
					<span style={{ color: "white", padding: "0 20px" }}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-book-half"
							viewBox="0 0 16 16"
						>
							<path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
						</svg>
					</span>
				</button>
			</div>
			<div
				style={{ display: "flex", width: "100%", marginTop: "32px" }}
				className="divcontain"
			>
				<div style={{ flex: "0 0 20%" }} className="div1">
					<a href={"/examinstance/submit/" + examinstanceid}>
                    <h6
						style={{
							position: "sticky",
							top: "25px",
							overflowY: "auto",
						}}
					>
						Kết thúc bài thi của tôi{" "}
						{timerOn && (
							<b>
								{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
								{timeLeft % 60}
							</b>
						)}
					</h6>
                    </a>
					<QuestionList questions={questions} />
				</div>
				<div style={{ flex: "0 0 80%", paddingLeft: "25px" }} className="div2">
					<h2
						style={{
							fontWeight: 600,
							textTransform: "initial",
							fontSize: "1.5em",
							lineHeight: "1.4em",
						}}
					>
						Tên bài thi
					</h2>
					<div style={{ color: "#686b73", display: "flex", fontSize: "16px" }}>
						<div style={{ maxWidth: "80%" }}>
							Bài kiểm tra hạn {formatDateString(endtime)}
						</div>
					</div>
					<div style={{ marginTop: "32px" }}>
						{questions.map((question, index) => (
							<QuestionItem
								key={question.uuid}
								question={question}
								index={index}
								timerOn={timerOn?(!timeOut):true}
								handleAnswerChange={handleAnswerChange}
								handleSubmit={handleSubmit}
								isAnswerSelected={isAnswerSelected}
							/>
						))}
					</div>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "end",
					marginTop: "2rem",
				}}
			>
				<Button href={"/examinstance/submit/" + examinstanceid}>
					Kết thúc bài làm
				</Button>
			</div>
		</div>
	);
}
