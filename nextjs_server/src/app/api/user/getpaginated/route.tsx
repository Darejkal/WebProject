import { cookies } from 'next/headers';
import joi from 'joi';
import {auth} from '@/app/_helpers/server/auth'
import { apiHandler } from '@/app/_helpers/server/middleware';
import { userController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
import { JsonWebTokenError } from 'jsonwebtoken';
import { result } from 'lodash';

module.exports = apiHandler({
    POST: getUserPaginated
});
const MAX_RANGE=20
async function getUserPaginated(req: Request):Promise<any> {
    let {limit,next,query}:{limit:number,next?:string,query?:string}=await req.json()
    limit=Math.min(Math.floor(limit),MAX_RANGE)
    let users= await userController.getNext({limit,next,query})
    return {
        ...users,
        results:users.results.map((v)=>{
            let {name,email,position,uuid,createdat}=v
            return {name,email,position,uuid,createdat};
        })
    }
}
getUserPaginated.position="admin"
getUserPaginated.schema=joi.object({
    limit:joi.number().required(),
    next:joi.string().allow(""),
    query:joi.string(),
})