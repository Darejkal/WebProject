import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '@/app/_helpers/server/middleware';
import {userController,subjectController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';

module.exports = apiHandler({
    POST: createSubject
});
async function createSubject(req: Request) {
    const body=await req.json()
    // const author=userController.getById(req.headers.get("userId")!)
    await subjectController.create(
        body.name,
        body.abbrev,
        body.schoolid
    )

}
createSubject.position="admin"
createSubject.schema = joi.object({
    name: joi.string().required(),
    abbrev: joi.string().required(),
    schoolid: joi.string().required(),
});