import { cookies } from 'next/headers';
import joi from 'joi';
import {auth} from '@/app/_helpers/server/auth'
import { apiHandler } from '@/app/_helpers/server/middleware';
import { userController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
import { JsonWebTokenError } from 'jsonwebtoken';

module.exports = apiHandler({
    GET: getCurrent
});

async function getCurrent(req: Request) {
    const userid=req.headers.get('userId')
    console.log(userid)
    if(!userid){
        throw new JsonWebTokenError("userid is null");
    }
    const {position}=auth.verifyToken()
    try{
        const user = await userController.getByUUID(userid)
        if(position!=user.position){
            auth.setToken({uuid:user.uuid,position:user.position})
        }
        return {...user.toObject(),_id:undefined,password:undefined,"__v":undefined}
    } catch (e:any){
        throw new JsonWebTokenError(e?.message||"error");
    }
}
