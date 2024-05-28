import { cookies } from 'next/headers';
import joi from 'joi';
import {auth} from '@/app/_helpers/server/auth'
import { apiHandler } from '@/app/_helpers/server/middleware';
import { subjectController, subjectInstanceController, userController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
import { JsonWebTokenError } from 'jsonwebtoken';

module.exports = apiHandler({
    GET: getUserPaginated
});
const MAX_RANGE=20
async function getUserPaginated(req: Request,{params}:{params:{role:string}}):Promise<Boolean> {
    let userid=req.headers.get("userId");
    if(!userid){
        throw "user not found"
    }
    return await subjectInstanceController.doesUserHaveRole(userid,params.role)
}