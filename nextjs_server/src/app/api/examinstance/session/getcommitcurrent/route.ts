import { cookies } from "next/headers";
import joi from "joi";

import { apiHandler } from "@/app/_helpers/server/middleware";
import { examController } from "@/app/_helpers/server/controller/examController";
import { NextResponse } from "next/server";
import { ExamAnswer, IExamAnswer } from "@/app/_helpers/server/model/exam";

module.exports = apiHandler({
	POST: getCommitCurrent,
});

async function getCommitCurrent(req: Request) {
    const userid = req.headers.get("userId");
    let {examinstanceid}:{
        examinstanceid:string,
    }=await req.json()
    let examAnswer= await ExamAnswer.findOne({userid,examinstanceid}).exec()
    if(!examAnswer){
        return {committed:false}
    }
    if(examAnswer.closed||
		(examAnswer.endtime&&Date.now()>(new Date(examAnswer.endtime)).getTime())){
        return {committed:true}
    }else{
        return {committed:false}
    }
}
getCommitCurrent.schema = joi.object({
	examinstanceid: joi.string().required(),
});
