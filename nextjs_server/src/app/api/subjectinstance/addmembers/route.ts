import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '@/app/_helpers/server/middleware';
import { subjectInstanceController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';

module.exports = apiHandler({
    POST: addMembers
});

async function addMembers(req: Request) {
    const {userids,subjectinstanceid,role}:{userids:string[],subjectinstanceid:string,role:string}=await req.json()
    if(!userids|| userids.length==0){
        throw "invalid arguments"
    }
    await subjectInstanceController.createSubjectInstanceUserRelationBatch({
        userids,subjectinstanceid,role
    })
}
addMembers.position="admin"
addMembers.schema = joi.object({
    subjectinstanceid: joi.string().required(),
    role: joi.string().required(),
    userids: joi.array().items(joi.string()).required()
});