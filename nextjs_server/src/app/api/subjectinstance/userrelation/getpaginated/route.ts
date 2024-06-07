import { cookies } from 'next/headers';
import joi from 'joi';
import {auth} from '@/app/_helpers/server/auth'
import { apiHandler } from '@/app/_helpers/server/middleware';
import { subjectInstanceController,userController,subjectController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
import { JsonWebTokenError } from 'jsonwebtoken';

module.exports = apiHandler({
    POST: getSubjectPaginated
});
const MAX_RANGE=20
async function getSubjectPaginated(req: Request) {
    let {limit,next,query,role,subjectinstanceid}:{limit:number,next?:string,role?:string,query?:string,subjectinstanceid?:string}=await req.json()
    limit=Math.min(Math.floor(limit),MAX_RANGE)

    return await subjectInstanceController.getUserSubjectInstanceRelationNext({limit,next,query,role,subjectinstanceid})
}
getSubjectPaginated.position="admin"
getSubjectPaginated.schema=joi.object({
    limit:joi.number().required(),
    role:joi.string(),
    next:joi.string().allow(""),
    query:joi.string(),
    subjectinstanceid:joi.string(),
})