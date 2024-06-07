import { cookies } from "next/headers";
import joi from "joi";

import { apiHandler } from "@/app/_helpers/server/middleware";
import { examController } from "@/app/_helpers/server/controller/examController";
import { NextResponse } from "next/server";
import { ExamAnswer, IExamAnswer } from "@/app/_helpers/server/model/exam";

module.exports = apiHandler({
	POST: closeExamAnswer,
});

async function closeExamAnswer(req: Request) {
    const userid = req.headers.get("userId");
    let {examinstanceid,questionid,options}:{
        options:{
            uuid: string;
            ischosen?: boolean | undefined;
        }[],
        questionid:string,
        examinstanceid:string
    }=await req.json()
    let examAnswer= await ExamAnswer.findOne({userid,examinstanceid}).exec()
    if(!examAnswer){
        throw "session not found"
    }
    examAnswer.closed=true;
    await examAnswer.save()
    return 
}
closeExamAnswer.schema = joi.object({
	examinstanceid: joi.string().required(),
});
