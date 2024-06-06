"use client";

import {
	IServiceSubjectInstance,
	useSubjectInstanceService,
} from "@/app/_services";
import { Accordion, AccordionDetails, AccordionSummary, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import { Be_Vietnam_Pro } from "next/font/google";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const inter = Be_Vietnam_Pro({ weight: ["400", "700"], subsets: ["latin"] });

const theme = createTheme({
    typography: {
        fontFamily: inter.style.fontFamily,
		fontWeightMedium:"400",
		fontWeightBold:"700"
    }
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
	const [tab,setTab]=useState(0);
	return <div style={{padding:"1rem 10rem"}}>
		<ThemeProvider theme={theme}>
		<Tabs value={tab} onChange={(event,value)=>{setTab(value)}} aria-label="basic tabs example">
			<Tab label="Khóa học" sx={{textTransform :"capitalize",fontSize:"1.1rem"}} value={0} />
			<Tab label="Tiến độ học tập" sx={{textTransform :"capitalize",fontSize:"1.1rem"}} value={1} />
			<Tab label="Thảo luận" sx={{textTransform :"capitalize",fontSize:"1.1rem"}} value={2} />
			<Tab label="Wiki" sx={{textTransform :"capitalize",fontSize:"1.1rem"}} value={3} />
			<Tab label="Tài liệu" sx={{textTransform :"capitalize",fontSize:"1.1rem"}} value={4} />
		</Tabs>
		</ThemeProvider>
		<div style={{padding:"2rem 0 0 0"}}>
			{tab==0&&subjectinstance&&<CourseTab subjectinstance={subjectinstance}/>}
		</div>
	</div>;
}
function CourseTab({subjectinstance}:{subjectinstance:IServiceSubjectInstance}){
	return <div>
		<h3 style={{fontWeight:"500"}}>{subjectinstance.name}</h3>
		<Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <h3>Accordion 1</h3>
        </AccordionSummary>
        <AccordionDetails>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </p>
        </AccordionDetails>
      </Accordion>
	</div>
}