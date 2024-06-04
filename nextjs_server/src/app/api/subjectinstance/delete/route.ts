import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '@/app/_helpers/server/middleware';
import { subjectInstanceController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';

module.exports = apiHandler({
    POST: createSubjectInstance
});

async function createSubjectInstance(req: Request) {
    const {uuid}:{uuid:string} = await req.json();
    return await subjectInstanceController.deleteByUUID(uuid)
}
createSubjectInstance.position="admin"
createSubjectInstance.schema = joi.object({
    uuid: joi.string().required(),
});