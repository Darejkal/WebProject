import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '@/app/_helpers/server/middleware';
import {subjectInstanceController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';

module.exports = apiHandler({
    POST: addmember
});
async function addmember(req: Request) {
    const body=await req.json()
    // const author=userController.getById(req.headers.get("userId")!)
    return await subjectInstanceController.addMember(
        body.studentid,
        body.subjectid,
        body.role
    )

}
addmember.position="admin"
addmember.schema = joi.object({
    subjectid: joi.string().required(),
    studentid:joi.string().required(),
    role:joi.string().required(),
});