import { cookies } from "next/headers";
import joi from "joi";

import { apiHandler } from "@/app/_helpers/server/middleware";
import { subjectController } from "@/app/_helpers/server";
import { NextResponse } from "next/server";

module.exports = apiHandler({
	POST: createSubjectInstance,
});

async function createSubjectInstance(req: Request) {
	// const userid=req.headers.get("userId")
	// if(!userid){
	// 	throw "userid not found"
	// }
	const userid="ok"
	const {
		schoolid,
		abbrev,
		name,
	}: {
		schoolid: string;
		abbrev: string;
		name: string;
	} = await req.json();
    let subject=await subjectController.create(name, abbrev, schoolid,userid)
	return {...subject.toObject(),_id:undefined,__v:undefined};
}
createSubjectInstance.ispublic = true;
createSubjectInstance.position = "admin";
createSubjectInstance.schema = joi.object({
	schoolid: joi.string().required(),
	abbrev: joi.string().required(),
	name: joi.string().required(),
});
