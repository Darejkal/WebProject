import { CustomInfiniteScroll } from "@/app/_components/CustomInfiniteScroll";
import { useFetch } from "@/app/_helpers/client";
import { IServiceExamInstance } from "@/app/_services";
import { useParams,useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ExamComponent } from "./components";

export default function ExamInstancePage() {
    const fetch=useFetch();
    const router=useRouter();
    const {examinstanceid}=useParams();
    const [examInstance,setExamInstance]=useState<IServiceExamInstance>();
    useEffect(()=>{
        fetch.get("/api/examinstance/get/"+examinstanceid).then((v)=>{
            if(v){
                setExamInstance(v);
            } else{
                throw "invalid response"
            }
        }).catch((e)=>{
            toast.warning("Lỗi kết nối. Đang điều hướng..")
            router.push("/dashboard")
        })
    },[])
	return (
		<div style={{ margin: "1rem 10rem 0 10rem" }}>
            <ExamComponent data={examInstance.}/>
		</div>
	);
}
