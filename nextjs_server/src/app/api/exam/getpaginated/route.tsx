import { cookies } from 'next/headers';
import joi from 'joi';
import {auth} from '@/app/_helpers/server/auth'
import { apiHandler } from '@/app/_helpers/server/middleware';
import { examController, userController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
import { JsonWebTokenError } from 'jsonwebtoken';

module.exports = apiHandler({
    POST: getExamPaginated
});
const MAX_RANGE=20
async function getExamPaginated(req: Request) {
    let {limit,next,query}:{limit:number,next?:string,query?:string}=await req.json()
    limit=Math.min(Math.floor(limit),MAX_RANGE)
    console.log(limit)
    let exams=await examController.getNext({limit,next,query})
    let authorids=exams.results.map((v)=>v.authorid)
    let authors=await userController.getByUUIDs(authorids)
    let authorsMap=authors.reduce((pre:any,cur)=>{
        pre[cur.uuid]=cur.name
        return pre
    },{})
    return {...exams,results:exams.results.map((v)=>{
        // @ts-ignore
        return {...v.toObject(),authorName:authorsMap[v.authorid]}
    })}
}
getExamPaginated.position="admin"
getExamPaginated.schema=joi.object({
    limit:joi.number().required(),
    next:joi.string().allow(""),
    query:joi.string()
})