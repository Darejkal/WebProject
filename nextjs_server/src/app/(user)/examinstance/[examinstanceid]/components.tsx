import { IServiceQuestion } from "@/app/_services/useExamService";
import {useState} from "react"
export function ExamComponent(props: { data: IServiceQuestion[] }) {
	const [timesUp, setTimesUp] = useState<boolean>(false);
	const handleAnswerChange = (props: any) => {};
	const handleSubmit = (props: any) => {};

	return (
		<div style={{ width:"100%",height:"100%"}}>
			{props.data.map((question, index) => (
				<div key={question.uuid} style={{marginBottom:"1rem"}}>
					<h3
						style={{
							marginBottom: "12px",
							color: "#fff",
							fontSize: "18px",
							fontWeight: 600,
							backgroundColor: "#2F58CD",
							borderRadius: "16px",
							textAlign: "center",
							display: "inline-block",
							padding: "2px 10px",
						}}
					>
						Câu hỏi {index + 1}
					</h3>
					<p style={{ marginBottom: "12px" }}>
						Câu {index + 1}. {question.question}
					</p>
					{(!question?.options || question.options.length == 0) && (
						<p className="text-muted">Câu hỏi không có đáp án</p>
					)}
					{question.options &&
						question.options.map((option) => (
							<div
								key={option.uuid}
								style={{
									minWidth: "100px",
									width: "auto !important",
									marginBottom: "1rem",
								}}
							>
								<label>
									<input
										type="radio"
										// name={`question_${question.id}`}
										value={option.uuid}
										onChange={() =>
											handleAnswerChange({
												questionid: question.uuid,
												optionid: option.uuid,
											})
										}
										disabled={timesUp}
										style={{ top: "1rem", left: 0, width: "1rem", margin: 0 }}
									/>
									<span
										style={{
											padding: "1rem !important",
											border: "0 !important",
											color: "#212121 !important",
											marginBottom: 0,
											marginLeft: "0",
										}}
									>
										{option.text}
									</span>
								</label>
							</div>
						))}
					<div style={{ marginTop: "1rem" }}>
						<button
							onClick={() => handleSubmit(question.uuid)}
							disabled={timesUp}
							style={{
								color: "#fff",
								background: "#3738E2",
								borderRadius: "10px",
								border: "none",
								padding: "0.8rem 1.4rem",
							}}
						>
							Gửi
						</button>
					</div>
					<div>
						{/* {question.submitted && <p style={{ float: 'left', marginTop: '10px', padding: '8px 10px 4px 10px', lineHeight: '1.5em' }}>Câu trả lời đã được gửi đi</p>} */}
					</div>
				</div>
			))}
		</div>
	);
}
