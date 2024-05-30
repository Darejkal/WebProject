import { cookies } from "next/headers";
import joi from "joi";

import { apiHandler } from "@/app/_helpers/server/middleware";
import { subjectController } from "@/app/_helpers/server";
import { NextResponse } from "next/server";

module.exports = apiHandler({
	POST: createSubjectInstance,
});

async function createSubjectInstance(req: Request) {
	const userid=req.headers.get("userId")
	if(!userid){
		throw "userid not found"
	}
	const {
		schoolabbrev,
		abbrev,
		name,
	}: {
		schoolabbrev: string;
		abbrev: string;
		name: string;
	} = await req.json();
    let subject=await subjectController.create(name, abbrev, schoolabbrev,userid)
	return {...subject.toObject(),_id:undefined,__v:undefined};
}
createSubjectInstance.position = "admin";
createSubjectInstance.schema = joi.object({
	schoolabbrev: joi.string().required(),
	abbrev: joi.string().required(),
	name: joi.string().required(),
});
