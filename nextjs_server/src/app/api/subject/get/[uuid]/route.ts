import { cookies } from 'next/headers';
import joi from 'joi';
import {auth} from '@/app/_helpers/server/auth'
import { apiHandler } from '@/app/_helpers/server/middleware';
import { subjectController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
import { JsonWebTokenError } from 'jsonwebtoken';

module.exports = apiHandler({
    GET: getOne
});
async function getOne(req: Request,{params}:{params:{uuid:string}}) {
    const {uuid}=params
    let subjectinstance=await subjectController.getByUUID(uuid)
    return subjectinstance.toObject()
}