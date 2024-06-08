import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '@/app/_helpers/server/middleware';
import { subjectController, subjectInstanceController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';

module.exports = apiHandler({
    POST: deleteOne
});

async function deleteOne(req: Request) {
    const {uuid}:{uuid:string} = await req.json();
    return await subjectController.deleteByUUID(uuid)
}
deleteOne.position="admin"
deleteOne.schema = joi.object({
    uuid: joi.string().required(),
});