import { cookies } from 'next/headers';
import joi from 'joi';
import {auth} from '@/app/_helpers/server/auth'
import { apiHandler } from '@/app/_helpers/server/middleware';
import { subjectController, subjectInstanceController, userController } from '@/app/_helpers/server';
import { NextResponse } from 'next/server';
import { JsonWebTokenError } from 'jsonwebtoken';

module.exports = apiHandler({
    GET: getOne
});
async function getOne(req: Request,{params}:{params:{uuid:string}}) {
    const {uuid}=params
    let subjectinstance=await subjectInstanceController.getByUUID(uuid)
    let authorprom=userController.getByUUID(subjectinstance.authorid)
    let subjectprom=subjectController.getByAbbrev(subjectinstance.subjectabbrev)
    let [author,subject]=await Promise.all([authorprom,subjectprom])

    return  {...subjectinstance.toObject(),
            authorName:author.name,
            subjectName:subject.name,
            subjectAbbrev:subject.abbrev,
        }
}