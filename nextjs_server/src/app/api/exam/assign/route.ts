import { cookies } from "next/headers";
import joi from "joi";

import { apiHandler } from "@/app/_helpers/server/middleware";
import { examController } from "@/app/_helpers/server/controller/examController";
import { NextResponse } from "next/server";
import { JsonWebTokenError } from "jsonwebtoken";

module.exports = apiHandler({
	POST: createExamInstance,
});

async function createExamInstance(req: Request) {
    const userid=req.headers.get('userId')
    if(!userid){
        throw new JsonWebTokenError("userid is null");
    }
	let {
		subjectinstanceid,
		examid,
		name,
		description,
		endtime,
	}: {
		subjectinstanceid: string;
		examid: string;
		name?:string;
		description?:string;
		endtime?:string;
	} = await req.json();
    await examController.createExamInstance({
        subjectinstanceid,
        examid,
		name,
		description,
		endtime,
		authorid:userid
    })
}
createExamInstance.schema = joi.object({
	examid: joi.string().required(),
	subjectinstanceid:joi.string().required(),
	name:joi.string(),
	description:joi.string(),
	endtime:joi.string(),
});
