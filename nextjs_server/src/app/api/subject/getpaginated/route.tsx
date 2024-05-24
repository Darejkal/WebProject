import { cookies } from 'next/headers';
import joi from 'joi';
import {auth} from '@/app/_helpers/server/auth'
import { apiHandler } from '@/app/_helpers/server/middleware';
import { subjectController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
import { JsonWebTokenError } from 'jsonwebtoken';

module.exports = apiHandler({
    POST: getSubjectPaginated
});
const MAX_RANGE=20
async function getSubjectPaginated(req: Request) {
    let {limit,next}:{limit:number,next:string}=await req.json()
    limit=Math.min(Math.floor(limit),MAX_RANGE)
    console.log(limit)
    return await subjectController.getNext(limit,next)
}
getSubjectPaginated.position="admin"
getSubjectPaginated.schema=joi.object({
    limit:joi.number().required(),
    next:joi.string(),
})