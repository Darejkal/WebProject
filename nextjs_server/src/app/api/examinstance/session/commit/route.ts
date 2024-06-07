import { cookies } from "next/headers";
import joi from "joi";

import { apiHandler } from "@/app/_helpers/server/middleware";
import { examController } from "@/app/_helpers/server/controller/examController";
import { NextResponse } from "next/server";
import { ExamAnswer, IExamAnswer } from "@/app/_helpers/server/model/exam";

module.exports = apiHandler({
	POST: commitExamChoice,
});

async function commitExamChoice(req: Request) {
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
    if(examAnswer.closed||
		(examAnswer.endtime&&Date.now()>(new Date(examAnswer.endtime)).getTime())){
        throw "session closed"
    }
    Object.assign(examAnswer,{choices:options.reduce((pre,cur)=>{
        if(cur.ischosen){
            pre.push({
                questionid,
                optionid:cur.uuid
            })
        }
        return pre;
    },[] as IExamAnswer["choices"])})
    await examAnswer.save()
    return 
}
commitExamChoice.schema = joi.object({
	examinstanceid: joi.string().required(),
	questionid: joi.string().required(),
	options: joi.array().items(joi.object({
		ischosen:joi.boolean(),
		text:joi.string().required()
	})),
});
