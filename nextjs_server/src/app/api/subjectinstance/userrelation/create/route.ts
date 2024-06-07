import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '@/app/_helpers/server/middleware';
import { subjectInstanceController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';

module.exports = apiHandler({
    POST: createSubjectInstanceUserRelation
});

async function createSubjectInstanceUserRelation(req: Request) {
    const {userid,useremail,subjectinstanceid,role} = await req.json();
    if(!userid&&!useremail){
        throw "no user provided"
    }
    return await subjectInstanceController.createSubjectInstanceUserRelation({
        userid,useremail,subjectinstanceid,role
    })
}
createSubjectInstanceUserRelation.position="admin"
createSubjectInstanceUserRelation.schema = joi.object({
    userid: joi.string(),
    useremail: joi.string(),
    subjectinstanceid: joi.string().required(),
    role: joi.string().required(),
});