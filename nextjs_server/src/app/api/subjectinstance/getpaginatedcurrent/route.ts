import { cookies } from "next/headers";
import joi from "joi";
import { auth } from "@/app/_helpers/server/auth";
import { apiHandler } from "@/app/_helpers/server/middleware";
import { subjectInstanceController } from "@/app/_helpers/server";
import { NextResponse } from "next/server";
import { JsonWebTokenError } from "jsonwebtoken";

module.exports = apiHandler({
	POST: getPaginatedCurrent,
});
const MAX_RANGE = 30;
async function getPaginatedCurrent(req: Request) {
	const userid = req.headers.get("userId");
	let { limit, next,role,query }: { limit: number; next?: string,role?:string,query?:string } = await req.json();
	limit = Math.min(Math.floor(limit), MAX_RANGE);
	if (!userid) {
		throw "userid not found";
	}
	let subjectinstances = await subjectInstanceController.getNextOfUser({
		userid,
		next,
		limit,
		role,
		query
	});
	return subjectinstances
}
getPaginatedCurrent.schema = joi.object({
	limit: joi.number().required(),
	next: joi.string().allow(""),
	role: joi.string(),
	query: joi.string().allow(""),
});
