import { cookies } from 'next/headers';
import joi from 'joi';
import {auth} from '@/app/_helpers/server/auth'
import { apiHandler } from '@/app/_helpers/server/middleware';
import { userController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
import { JsonWebTokenError } from 'jsonwebtoken';

module.exports = apiHandler({
    POST: getUserPaginated
});
const MAX_RANGE=20
async function getUserPaginated(req: Request):Promise<any> {
    let {limit,next}:{limit:number,next:string}=await req.json()
    limit=Math.min(Math.floor(limit),MAX_RANGE)
    console.log(limit)
    return await userController.getNext(limit,next)
}
getUserPaginated.position="admin"
getUserPaginated.schema=joi.object({
    limit:joi.number().required(),
    next:joi.string(),
})