import { cookies } from 'next/headers';
import joi from 'joi';
import {auth} from '@/app/_helpers/server/auth'
import { apiHandler } from '@/app/_helpers/server/middleware';
import { examController, userController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
import { JsonWebTokenError } from 'jsonwebtoken';

module.exports = apiHandler({
    POST: getQuestionPaginated
});
const MAX_RANGE=20
async function getQuestionPaginated(req: Request) {
    const userid=req.headers.get('userId')
    if(!userid){
        throw new JsonWebTokenError("userid is null");
    }
    let {limit,next,query}:{limit:number,next?:string,query?:string}=await req.json()
    limit=Math.min(Math.floor(limit),MAX_RANGE)
    console.log(limit)
    let subjects=await examController.getNextQuestionsByAuthor({limit,next,query,authorid:userid})
    let author=await userController.getByUUID(userid)
    return {...subjects,results:subjects.results.map((v)=>{
        // @ts-ignore
        return {...v.toObject(),authorName:author.name}
    })}
}
getQuestionPaginated.schema=joi.object({
    limit:joi.number().required(),
    next:joi.string().allow(""),
    query:joi.string()
})