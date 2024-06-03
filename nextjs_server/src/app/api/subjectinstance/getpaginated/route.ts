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
    let {limit,next,query}:{limit:number,next?:string,query?:string}=await req.json()
    limit=Math.min(Math.floor(limit),MAX_RANGE)
    console.log(limit)
    let subjectInstances=await subjectInstanceController.getNext({limit,next,query})
    let authorids=subjectInstances.results.map((v)=>v.authorid)
    let authors=await userController.getByUUIDs(authorids)
    let authorsMap=authors.reduce((pre:any,cur)=>{
        pre[cur.uuid]=cur.name
        return pre
    },{})
    let subjectabbrevs=subjectInstances.results.map((v)=>v.subjectabbrev)
    let subjects=await subjectController.getByAbbrevs(subjectabbrevs)
    console.log(subjects)
    let subjectsMap=subjects.reduce((pre:any,cur)=>{
        pre[cur.abbrev]={
            abbrev:cur.abbrev,
            name:cur.name
        }
        return pre
    },{})
    return {...subjectInstances,results:subjectInstances.results.map((v)=>{
        // @ts-ignore
        return {...v.toObject(),
            authorName:authorsMap[v.authorid],
            subjectName:subjectsMap[v.subjectabbrev].name,
            subjectAbbrev:subjectsMap[v.subjectabbrev].abbrev,
        }
    })}
}
getSubjectPaginated.position="admin"
getSubjectPaginated.schema=joi.object({
    limit:joi.number().required(),
    next:joi.string().allow(""),
    query:joi.string(),
})