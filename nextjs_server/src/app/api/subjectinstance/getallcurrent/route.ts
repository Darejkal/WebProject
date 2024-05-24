import { cookies } from 'next/headers';
import joi from 'joi';
import {auth} from '@/app/_helpers/server/auth'
import { apiHandler } from '@/app/_helpers/server/middleware';
import { subjectInstanceController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
import { JsonWebTokenError } from 'jsonwebtoken';

module.exports = apiHandler({
    GET: getAllCurrent
});
async function getAllCurrent(req: Request) {
    const userid=req.headers.get("userId")
    if(!userid){
        throw "userid not found"
    }
    let subjectinstances=await subjectInstanceController.getall(userid)
    console.log(subjectinstances)
    return subjectinstances
}