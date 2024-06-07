import { cookies } from 'next/headers';
import joi from 'joi';
import {auth} from '@/app/_helpers/server/auth'
import { apiHandler } from '@/app/_helpers/server/middleware';
import { examController, subjectInstanceController, userController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
import { JsonWebTokenError } from 'jsonwebtoken';

module.exports = apiHandler({
    GET: getCurrent
});

async function getCurrent(req: Request,{params:{examinstanceid}}:{params:{examinstanceid:string}}) {
    const userid=req.headers.get('userId')
    console.log(userid)
    if(!userid){
        throw new JsonWebTokenError("userid is null");
    }
    const examinstance=await examController.getExamInstance(examinstanceid);
    const rel= await subjectInstanceController.getUserSubjectInstanceRelation(userid,examinstance.subjectinstanceid)
    if(!rel){
        throw "forbidden"
    }
    return examinstance.toObject()
}
