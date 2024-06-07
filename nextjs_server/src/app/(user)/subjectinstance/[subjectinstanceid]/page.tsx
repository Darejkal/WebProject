"use client";

import {
	IServiceExamInstance,
	IServiceSubject,
	IServiceSubjectInstance,
	useSubjectInstanceService,
	useSubjectService,
} from "@/app/_services";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Tab,
	Tabs,
	ThemeProvider,
	createTheme,
} from "@mui/material";
import { Be_Vietnam_Pro } from "next/font/google";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useFetch } from "@/app/_helpers/client";
import { CustomInfiniteScroll } from "@/app/_components/CustomInfiniteScroll";
import { formatDateString } from "@/app/_helpers/clientutils";
import { Button, Card } from "react-bootstrap";
const inter = Be_Vietnam_Pro({ weight: ["400", "700"], subsets: ["latin"] });

const theme = createTheme({
	typography: {
		fontFamily: inter.style.fontFamily,
		fontWeightMedium: "400",
		fontWeightBold: "700",
	},
});
export default function SubjectInstancePage() {
	const router = useRouter();
	const { subjectinstanceid }: { subjectinstanceid: string } = useParams();
	const subjectInstanceService = useSubjectInstanceService();
	const [subjectinstance, setSubjectInstance] =
		useState<IServiceSubjectInstance>();
	const [isLoading, setIsLoading] = useState<boolean>();
	const getSubjectInstance = useCallback(() => {
		console.log(subjectinstanceid);
		subjectInstanceService
			.getOne(subjectinstanceid)
			.then((v) => {
				setSubjectInstance(v);
			})
			.catch((e) => {
				toast.info("Không tìm thấy lớp học được chỉ định. Đang điều hướng...");
				router.push("/dashboard");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [subjectinstanceid, subjectInstanceService]);
	useEffect(() => {
		getSubjectInstance();
	}, []);
	const [tab, setTab] = useState(0);
	return (
		<div style={{ padding: "1rem 10rem" }}>
			<ThemeProvider theme={theme}>
				<Tabs
					value={tab}
					onChange={(event, value) => {
						setTab(value);
					}}
					aria-label="basic tabs example"
				>
					<Tab
						label="Khóa học"
						sx={{ textTransform: "capitalize", fontSize: "1.1rem" }}
						value={0}
					/>
					<Tab
						label="Tiến độ học tập"
						sx={{ textTransform: "capitalize", fontSize: "1.1rem" }}
						value={1}
					/>
					<Tab
						label="Thảo luận"
						sx={{ textTransform: "capitalize", fontSize: "1.1rem" }}
						value={2}
					/>
					<Tab
						label="Wiki"
						sx={{ textTransform: "capitalize", fontSize: "1.1rem" }}
						value={3}
					/>
					<Tab
						label="Tài liệu"
						sx={{ textTransform: "capitalize", fontSize: "1.1rem" }}
						value={4}
					/>
				</Tabs>
			</ThemeProvider>
			<div style={{ padding: "2rem 0 0 0" }}>
				{tab == 0 && subjectinstance && (
					<CourseTab subjectinstance={subjectinstance} />
				)}
			</div>
		</div>
	);
}
function CourseTab({
	subjectinstance,
}: {
	subjectinstance: IServiceSubjectInstance;
}) {
	const [subject, setSubject] = useState<IServiceSubject>();
	const [examDataNext,setExamDataNext]=useState<string>();
	const [examInstances,setExamInstances]=useState<IServiceExamInstance[]>([]);
	const fetch = useFetch();
	const fetchExamInstance=useCallback(({limit,next,query}:
		{limit:number,next?:string,query?:string}
	)=>{
		return fetch.post("/api/examinstance/getpaginatedsubjectinstance/", {
			subjectinstanceid: subjectinstance.uuid,
			limit: limit,
			next: next,
			query:query
		})
		.then((v) => {
			if(v){
				setExamInstances(v.results)
				setExamDataNext(v.next);
				return v.results
			} else{
				return []
			}
		}).catch((e)=>{
			return []
		});
	},[])
	useEffect(() => {
		fetch
			.get("/api/subject/getabbrev/" + subjectinstance.subjectAbbrev)
			.then((v) => {
				if (v) {
					setSubject(v);
				}
			});

	}, []);
	return (
		<div>
			<h3 style={{ fontWeight: "500" }}>{subjectinstance.name}</h3>
			{subjectinstance.name && (
				<>
					<h3 style={{ fontWeight: "500" }}>Thông tin chi tiết</h3>
					<div>
						<div>{subject?.description}</div>
					</div>
				</>
			)}
			<CustomInfiniteScroll
				pagination={{
					getPaginated: (props) => {
						return fetchExamInstance({next:examDataNext,...props})
					},
					data: examInstances,
				}}
				renderItem={({ data, index }) => {
					return (
						<Card style={{ marginTop: "1rem", width: "100%" }} key={data.uuid}>
							<Card.Header>Bài kiểm tra: {data.name??""}</Card.Header>
							<Card.Body>
								 Tạo ngày: {formatDateString(data.createdat)}
								<br />
								<div
									style={{
										width: "100%",
										display: "flex",
										flexDirection: "row",
										justifyContent: "end",
									}}
								>
									{data.description??""}
								</div>
								<div style={{display:"flex",flexDirection:"row",justifyContent:"end"}}>
									<Button href={"/examinstance/"+data.uuid}>Xem chi tiết</Button>
								</div>
							</Card.Body>
						</Card>
					);
				}}
			/>
		</div>
	);
}
