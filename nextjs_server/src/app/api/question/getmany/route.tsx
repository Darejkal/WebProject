import { cookies } from 'next/headers';
import joi from 'joi';
import {auth} from '@/app/_helpers/server/auth'
import { apiHandler } from '@/app/_helpers/server/middleware';
import { examController, userController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
import { JsonWebTokenError } from 'jsonwebtoken';

module.exports = apiHandler({
    POST: getMany
});
async function getMany(req: Request) {
    let {uuids}:{uuids:string[]}=await req.json()
    let subjects=await examController.getQuestionsByUUIDs({uuids})
    let authorids=subjects.map((v)=>v.authorid)
    let authors=await userController.getByUUIDs(authorids)
    let authorsMap=authors.reduce((pre:any,cur)=>{
        pre[cur.uuid]=cur.name
        return pre
    },{})
    return subjects.map((v)=>{
        // @ts-ignore
        return {...v.toObject(),authorName:authorsMap[v.authorid]}
    })
}
getMany.position="admin"
getMany.schema=joi.object({
    uuids: joi.array().items(joi.string()),
});