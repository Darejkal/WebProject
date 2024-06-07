import { cookies } from "next/headers";
import joi from "joi";

import { apiHandler } from "@/app/_helpers/server/middleware";
import { examController } from "@/app/_helpers/server/controller/examController";
import { NextResponse } from "next/server";

module.exports = apiHandler({
	POST: createQuestion,
});

async function createQuestion(req: Request) {
	let {
		authorid,
		question,
		options,
		category,
	}: {
		authorid?: string;
		question: string;
		options?: {
			uuid: string;
			text: string;
			score: string;
		}[];
		category?: string;
	} = await req.json();
    if(!authorid){
        let userid=req.headers.get('userId')
        if(userid){
            authorid=userid 
        } else {
            throw "no author exists for question"
        }
    }
	await examController.createQuestion({
		authorid,
		question,
		options: options ?? [],
		category,
	});
}
createQuestion.schema = joi.object({
	authorid: joi.string(),
	category: joi.string(),
	question: joi.string().required(),
	options: joi.array().items(joi.object({
		score:joi.number().required(),
		text:joi.string().required()
	})),
});
