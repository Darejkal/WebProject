import { cookies } from "next/headers";
import joi from "joi";

import { apiHandler } from "@/app/_helpers/server/middleware";
import { examController } from "@/app/_helpers/server/controller/examController";
import { NextResponse } from "next/server";

module.exports = apiHandler({
	POST: createExam,
});

async function createExam(req: Request) {
	let {
		name,
		questionids,
		category,
		authorid,
	}: {
		name: string;
		questionids: string[];
		category?: string;
		authorid: string;
	} = await req.json();
	if(!authorid){
        let userid=req.headers.get('userId')
        if(userid){
            authorid=userid 
        } else {
            throw "no author exists for question"
        }
    }
	if (!name) {
		throw "no name provided";
	}
	await examController.createExam({
		name,
		authorid,
		questionids: questionids ?? [],
		category: category,
	});
}
createExam.schema = joi.object({
	name: joi.string().required(),
	authorid: joi.string(),
	questionids: joi.array().items(joi.string()),
	category: joi.string().allow(""),
});
