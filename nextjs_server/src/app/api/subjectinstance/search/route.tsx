import { cookies } from "next/headers";
import joi from "joi";

import { apiHandler } from "@/app/_helpers/server/middleware";
import { subjectInstanceController } from "@/app/_helpers/server";
import { NextRequest, NextResponse } from "next/server";

module.exports = apiHandler({
	GET: searchSubject,
});

async function searchSubject(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams
	const query=searchParams.get('query')
	if(!query){
		throw "no query provided"
	}
	let results= await subjectInstanceController.search(query,5);
	console.log(results)
	return results.map(({name,subjectabbrev,uuid})=>({name,subjectabbrev,uuid}));
}
