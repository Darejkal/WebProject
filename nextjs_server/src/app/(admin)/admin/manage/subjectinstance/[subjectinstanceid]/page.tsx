"use server"

import { subjectInstanceController } from "@/app/_helpers/server";
import { notFound } from "next/navigation";

// import { useParams } from "next/navigation"

export default async function SubjectInstancesSinglePage({params}:{params:{subjectinstanceid:string}}){
    const {subjectinstanceid}=params;
    try{
        console.log(`/api/subjectinstance/get/${subjectinstanceid}`)
        let subjectinstance=await subjectInstanceController.getByUUID(subjectinstanceid)
        return (
            <div style={{padding:"0 5rem"}}>
                <div>
                {JSON.stringify(subjectinstance)}
                </div>
                <div>
                    {}
                </div>
            </div>
        )
    } catch(e){
        return notFound()
    }
}