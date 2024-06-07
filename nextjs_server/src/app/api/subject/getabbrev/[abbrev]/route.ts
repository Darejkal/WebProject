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
async function getOne(req: Request,{params}:{params:{abbrev:string}}) {
    const {abbrev}=params
    let subjectinstance=await subjectController.getByAbbrev(abbrev)
    return subjectinstance.toObject()
}