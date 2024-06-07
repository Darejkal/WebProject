import { cookies } from "next/headers";
import joi from "joi";
import { auth } from "@/app/_helpers/server/auth";
import { apiHandler } from "@/app/_helpers/server/middleware";
import {
	examController,
	subjectController,
	subjectInstanceController,
	userController,
} from "@/app/_helpers/server";
import { NextResponse } from "next/server";
import { JsonWebTokenError } from "jsonwebtoken";

module.exports = apiHandler({
	POST: getExamInstancePaginatedOfSubjectInstance,
});
const MAX_RANGE = 20;
async function getExamInstancePaginatedOfSubjectInstance(req: Request) {
	const userid = req.headers.get("userId");
	if (!userid) {
		throw new JsonWebTokenError("userid is null");
	}
	let {
		subjectinstanceid,
		limit,
		next,
		query,
	}: {
		subjectinstanceid: string;
		limit: number;
		next?: string;
		query?: string;
	} = await req.json();
	let rel = await subjectInstanceController.getUserSubjectInstanceRelation(
		userid,
		subjectinstanceid
	);
	if (!rel) {
		throw "forbidden";
	}
	limit = Math.min(Math.floor(limit), MAX_RANGE);
	let exams = await examController.getNextExamInstanceBySubjectInstance({
		limit,
		next,
		query,
		subjectinstanceid,
	});
	let authorids=exams.results.map((v)=>v.authorid)
    let authors=await userController.getByUUIDs(authorids)
    let authorsMap=authors.reduce((pre:any,cur)=>{
        pre[cur.uuid]=cur.name
        return pre
    },{})
	console.log(exams)
	return {
		...exams,
		results: exams.results.map((v) => {
			// @ts-ignore
			return {...v.toObject(),authorName:authorsMap[v.authorid]}
		}),
	};
}
getExamInstancePaginatedOfSubjectInstance.schema = joi.object({
	limit: joi.number().required(),
	next: joi.string().allow(""),
	query: joi.string(),
	subjectinstanceid: joi.string().required(),
});
