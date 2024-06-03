import { cookies } from 'next/headers';
import joi from 'joi';

import { apiHandler } from '@/app/_helpers/server/middleware';
import { subjectInstanceController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';

module.exports = apiHandler({
    POST: addMembers
});

async function addMembers(req: Request) {
    const {members}:{members:[{userid:string}]}=await req.json()
    
}
addMembers.position="admin"
addMembers.schema = joi.object({
    members: joi.array().items({
        userid:joi.string().required()
    })
});