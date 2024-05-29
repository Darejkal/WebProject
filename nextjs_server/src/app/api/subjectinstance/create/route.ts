import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '@/app/_helpers/server/middleware';
import { subjectInstanceController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';

module.exports = apiHandler({
    POST: createSubjectInstance
});

async function createSubjectInstance(req: Request) {
    const body = await req.json();
    let userid=req.headers.get("userId")
    if(!userid){
        throw "userid not found in headers"
    }
    await subjectInstanceController.create(body.subjectabbrev,body.name,userid)
}
createSubjectInstance.position="admin"
createSubjectInstance.schema = joi.object({
    subjectabbrev: joi.string().required(),
    name: joi.string().required(),
});