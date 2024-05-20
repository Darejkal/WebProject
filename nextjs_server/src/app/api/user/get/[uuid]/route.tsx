import { cookies } from 'next/headers';
import joi from 'joi';
import {auth} from '@/app/_helpers/server/auth'
import { apiHandler } from '@/app/_helpers/server/middleware';
import { userController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
import { JsonWebTokenError } from 'jsonwebtoken';

module.exports = apiHandler({
    GET: getUser
});

async function getUser(req: Request,{params}:{params:{uuid:string}}) {
    const userid=params.uuid
    if(!userid){
        throw new JsonWebTokenError("userid is null");
    }
    try{
        const {name,email,position,uuid,createdat} = await userController.getByUUID(userid)
        return {
            name,email,position,uuid,createdat
        }
    } catch (e:any){
        throw new JsonWebTokenError(e?.message||"error");
    }
}
getUser.position="admin"