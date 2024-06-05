import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '@/app/_helpers/server/middleware';
import { subjectInstanceController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';

module.exports = apiHandler({
    POST: update
});

async function update(req: Request) {
    const props:{
        name:string,uuid:string,subjectAbbrev:string
    }=await req.json()
    await subjectInstanceController.updateOne(props)
}
update.position="admin"
update.schema = joi.object({
    name:joi.string(),
    uuid:joi.string().required(),
    subjectAbbrev:joi.string(),
});