import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '@/app/_helpers/server/middleware';
import { subjectInstanceController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';

module.exports = apiHandler({
    POST: update
});

async function update(req: Request) {
    const {members}:{members:[{userid:string}]}=await req.json()
    
}
update.position="admin"
update.schema = joi.object({
    subjectabbrev: joi.string().required(),
});