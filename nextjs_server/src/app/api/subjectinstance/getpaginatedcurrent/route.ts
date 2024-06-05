import { cookies } from "next/headers";
import joi from "joi";
import { auth } from "@/app/_helpers/server/auth";
import { apiHandler } from "@/app/_helpers/server/middleware";
import { subjectInstanceController } from "@/app/_helpers/server";
import { NextResponse } from "next/server";
import { JsonWebTokenError } from "jsonwebtoken";

module.exports = apiHandler({
	GET: getPaginatedCurrent,
});
const MAX_RANGE = 30;
async function getPaginatedCurrent(req: Request) {
	const userid = req.headers.get("userId");
	let { limit, next }: { limit: number; next?: string } = await req.json();
	limit = Math.min(Math.floor(limit), MAX_RANGE);
	if (!userid) {
		throw "userid not found";
	}
	let subjectinstances = await subjectInstanceController.getNextOfUser({
		userid,
		next,
		limit,
	});
	return {
		results: subjectinstances.results.map(
			({
				subjectinstanceid,
				role,
				createdat,
				subjectinstancename,
				subjectabbrev,
			}) => ({
				subjectinstanceid,
				role,
				createdat,
				subjectinstancename,
				subjectabbrev,
			})
		),
		next: subjectinstances.next,
	};
}
getPaginatedCurrent.schema = joi.object({
	limit: joi.number().required(),
	next: joi.string(),
});
